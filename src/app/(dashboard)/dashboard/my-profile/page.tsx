"use client"

import Image from "next/image"
import { type ChangeEvent, type Dispatch, type SetStateAction, useEffect, useRef, useState } from "react"

import { Button, ErrorModal, Input, RadioGroup, RadioGroupItem } from "@/components/core"
import { useQuery, useQueryClient } from "react-query"
import { fetchReferralCode } from "../api/referral/fetchReferralCode"
import { useUser } from "@/app/(auth)/(onboarding)/misc"
import { Label } from "@radix-ui/react-label"
import { Controller, useForm, useWatch } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useClipboard, useErrorModalState } from "@/hooks"
import {
    // fetchHospitalListByLga,
    fetchRegionByState,
    fetchStateList,
} from "@/app/(main)/misc/components/insurance/api/remital/remtalUserDetails"
import {  formatAxiosErrorMessage } from "@/utils"

import Select, { components } from "react-select"
import { SmallSpinner, Spinner } from "@/icons/core"
// import { Input2 } from "@/components/core/Input2"
import { useUpdateUserDetails } from "../api/patchUserDetails"
// import { getUserDetails, useGetUserDetails } from '../api/getUserDetails'
import toast from "react-hot-toast"
import { useUpdateUserImage } from "../api/patchUserImage"
import type { AxiosError } from "axios"
import { CopyIcon4, Delete, Photo, Upload } from "../../comp/icons"
import { useUpdateRemoveUserImage } from "../api/profile/patchRemoveUserImage"
import { deleteFromCloudinary, uploadToCloudinary } from "../../comp/components/plans/util/cloudinery"



const formValues = z.object({
    name: z.string().trim(),
    phone_number: z.string().trim(),
    email: z.string().email({ message: "Invalid email format" }).min(1, { message: "Email is required" }),
    state: z.string().trim().min(1, { message: "Please select a state." }),
    lga: z.string().trim().min(1, { message: "Please select a lga." }),
    address: z.string().trim().min(1, { message: "Please select a address." }),
    // hospitals: z.string().trim().min(1, { message: "Please select a hospital." }),
    selectedOption: z.union([z.literal("nin"), z.literal("bvn")]),
    bvn: z.string().trim().optional(),
    nin: z.string().trim().optional(),
})

export default function Page() {
    const { data: userData, isLoading: isloadingUserdata } = useUser()
    const queryClient = useQueryClient()

    const { copy } = useClipboard()

    const { data } = useQuery({
        queryFn: () => fetchReferralCode(userData?.id as string),
        queryKey: ["generate-referral-code", userData?.id],
        enabled: false,
        onSuccess: () => {
            // Invalidate user details query to refetch data.
            queryClient.invalidateQueries(["user-details", data?.referral_code])
        },
    })

    const { isErrorModalOpen, setErrorModalState, openErrorModalWithMessage, errorModalMessage } = useErrorModalState()

    // const [errorMsg, setErrorMsg] = useState("")
    const [profileImage, setProfileImage] = useState({
        img_id: userData?.profile_image_object?.img_id || "",
        img_url: userData?.profile_image_object?.img_url || "",
    })
    const {
        control,
        handleSubmit,
        register,
        formState: { errors },
        setValue,
    } = useForm<formValues>({
        resolver: zodResolver(formValues),
        defaultValues: {
            email: userData?.email || "",
            address: typeof userData?.address || "",
            lga: "",
            state: userData?.state || "",
            name: `${userData?.first_name || ""} ${userData?.middle_name || ""} ${userData?.last_name || ""}`.trim(),
            phone_number: userData?.phone_number || "",
            selectedOption: userData?.nin ? "nin" : "bvn",
            nin: userData?.nin || "",
            bvn: userData?.bvn || "",
        },
    })

    type formValues = z.infer<typeof formValues>
    useEffect(() => {
        if (!isloadingUserdata && userData) {
            setProfileImage({
                img_id: userData?.profile_image_object?.img_id || "",
                img_url: userData?.profile_image_object?.img_url || "",
            });
            setValue("name", `${userData?.first_name || ""} ${userData?.middle_name || ""} ${userData?.last_name || ""}`.trim());
            setValue("phone_number", userData?.phone_number || "");
            setValue("email", userData?.email || "");
            setValue("state", userData?.state || "");
            setValue("lga", userData?.lga || "");
            setValue("nin", userData?.nin || "");
            setValue("bvn", userData?.bvn || "");
            setValue("address", userData?.address || "");
            // setValue("hospitals", typeof userData?.hospitals === "string" ? userData?.hospitals : "");
        }
    }, [isloadingUserdata, userData, setValue]);
    

    const watchSelectedOption = useWatch({
        control,
        name: "selectedOption",
    })

    const selectedState = useWatch({
        control,
        name: "state",
    })

    const selectedlga = useWatch({
        control,
        name: "lga",
    })

    const { data: stateList } = useQuery({
        queryFn: fetchStateList,
        queryKey: ["fetch-state-list"],
    })

    const { data: lgaList, isLoading: loadinglga } = useQuery({
        queryFn: () => fetchRegionByState(selectedState),
        queryKey: ["fetch-lga-list", selectedState],
    })

    const uniqueStates = Array.from(new Set(stateList))

    // const { data: hospitalList } = useQuery({
    //     queryFn: () => fetchHospitalListByLga(selectedlga),
    //     queryKey: ["fetch-hospital-list", selectedlga],
    // })

    const [isLoading, setIsLoading] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    

    const stateOptions = uniqueStates?.map((state) => ({
        value: state,
        label: state,
    }))
    const lgaOption = lgaList?.map((state) => ({
        value: state,
        label: state,
    }))

    const style = {
        control: (base: any) => ({
            ...base,
            border: 0,
            background: "#F5F9FE",
            height: "2.875rem",
            boxShadow: "none",
            color: "#fff",
        }),
        option: (provided: any) => ({
            ...provided,
            color: "#333",
            background: "#fff",
            "&:hover": {
                background: "#F5F9FE",
            },
        }),
        singleValue: (provided: any) => ({
            ...provided,
            color: "#032282",
            fontSize: "12px",
            textTransform: "capitalize",
        }),
    }

    // const hospitalOptions = hospitalList?.data?.map((hospital) => ({
    //     value: capitalizeFirstLetter(hospital.name),
    //     label: hospital?.name,
    //     name: hospital?.name,
    //     address: hospital?.address,
    // }))

    const { mutate: handleUpdateProfile, isLoading: isHandleUpdateProfile } = useUpdateUserDetails()
    const onSubmit = (data: formValues) => {
        handleUpdateProfile(
            {
                name: data.name,
                email: data.email,
                phone_number: data.phone_number,
                state: data.state,
                lga: data.lga,
                address: data.address,
                bvn: data?.selectedOption === "bvn" ? data?.bvn : "",
                nin: data?.selectedOption === "nin" ? data?.nin : "",
            },
            {
                onSuccess: () => {
                    toast.success("Your details have been updated")
                },
            },
        )
    }

    // interface Prop {
    //     userData: UserDataTypes | undefined;
    // }

    const CustomOption = (props: any) => {
        const { data } = props
        return (
            <components.Option {...props}>
                <div className="w-[20rem]">
                    <h2 className="text-[#1B1687]  text-xs">{data?.name}</h2>
                    <p className="text-[.625rem] text-[#080D27]">{data?.address?.toLowerCase()}</p>
                </div>
            </components.Option>
        )
    }

    const [profilePic, setProfilePic] = useState<string | null>(null)
    const fileInputRef = useRef(null)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)

    const handleClick = () => {
        if (fileInputRef.current) {
            (fileInputRef.current as HTMLInputElement).click()
        }
    }

    const handleProfilePicChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event?.target?.files?.[0]
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0])
        }
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setProfilePic(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
        event.target.value =""
    }

    const { mutate: handleUpload, isLoading: isUploadingImage } = useUpdateUserImage()

    const handleFileUpload = async () => {
        setIsLoading(true)
        if (profileImage?.img_id !== "") {
            await deleteFromCloudinary(profileImage?.img_id as string)
        }
        const { id, secure_url } = await uploadToCloudinary(selectedFile as File)
        if (secure_url) {
            setProfilePic(secure_url)
            setProfileImage({
                img_id: id,
                img_url: secure_url
            })
            setIsLoading(false)
        }
        // console.log(id, secure_url);
        
        handleUpload(
            {
                profile_image: {
                    img_id: String(id),
                    img_url: secure_url
                }
            }
            , {
                onSuccess: () => {
                    //   setBuyPlanModal;
                    queryClient.invalidateQueries({ queryKey: ["user-details"] });
                    setProfilePic('');
                },
                onError: (error) => {
                    const errorMessage = formatAxiosErrorMessage(error as AxiosError);
                    
                    openErrorModalWithMessage(String(errorMessage));
                },
            })
        };
        

    // const { mutate: handleRemove } = useUpdateRemoveUserImage()
    const handleDelete = async (file: string) => {
        setIsDeleting(true)
        
        await deleteFromCloudinary(profileImage?.img_id as string)
        setProfilePic("");
        setProfileImage({ img_id: "", img_url: "" })
        setIsDeleting(false)
        handleUpload(
            {
                profile_image: {
                    img_id: String(""),
                    img_url: ""
                }
            }
            , {
                onSuccess: (data) => {
                    //   setBuyPlanModal;
                    queryClient.invalidateQueries({ queryKey: ["user-details"] });
                    setProfilePic('');
                },
                onError: (error) => {
                    const errorMessage = formatAxiosErrorMessage(error as AxiosError);
                   
                    openErrorModalWithMessage(String(errorMessage));
                },
            })
    };




    return (
        <>
            { isloadingUserdata ? (
                <div className="flex items-center justify-center min-h-[60vh]">
                    <Spinner />
                </div>
            ) : (
                <div className="bg-[#F5F9FE]">
                    <section className=" w-full px-6 md:px-[7.5rem] pb-12 xl:pb-8 relative ">
                        <div className="bg-white w-full h-full lg:h-screen mx-auto pt-[2.625rem] px-6 lg:px-[4.5rem] rounded-[.625rem]">
                            <p className="text-[#032282] font-sans font-bold text-2xl">Personal Information</p>
                            <section className="mt-8 flex flex-col lg:flex-row justify-between">
                                <div className="flex justify-between items-center gap-4">
                                    <div className="flex justify-center">
                                        <div className="relative w-[60px] h-[60px] md:w-[100px] md:h-[100px] rounded-full overflow-hidden">
                                            <Image
                                                alt="profile"
                                                // If profile_image is not a valid URL, fallback to default
                                                src={
                                                    profilePic && (profilePic.startsWith("http://") || profilePic.startsWith("https://"))
                                                        ? profilePic
                                                        : profileImage?.img_url &&
                                                            (profileImage?.img_url.startsWith("http://") ||
                                                                profileImage?.img_url.startsWith("https://"))
                                                            ? profileImage?.img_url
                                                            : "/images/userIcon.png"
                                                }
                                                className="rounded-full"
                                                layout="fill"
                                                objectFit="cover"
                                            />
                                        </div>
                                        <div className="mt-[2rem] md:mt-[3.8rem] cursor-pointer -ml-[1.5rem] z-[2]">
                                            <Photo onClick={handleClick} />
                                        </div>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            accept="image/*"
                                            style={{ display: "none" }}
                                            onChange={handleProfilePicChange}
                                        />

                                    </div>
                                    {(profilePic !== "" && profilePic !== null) && (
<>
                                       {!isDeleting&& <Button
                                            className="bg-[#F5F9FE] gap-1 border-[0.3px] border-[#032282] px-4 py-3"
                                            id="upload"
                                            onClick={handleFileUpload}
                                        >
                                            <Upload />
                                            <p className="text-[#032282] font-medium">Upload</p>
                                            {(isUploadingImage||isLoading) && <SmallSpinner color="#032282" />}
                                        </Button>}
</>

                                    )}
                                    {userData?.profile_image_object?.img_id !== ""  &&
                                    
                                    <Button className="bg-[#F5F9FE] gap-1 px-4 py-3" onClick={() => handleDelete("")}>
                                        <Delete />
                                        <p className="text-[#032282] font-medium">Remove</p>
                                           {(isUploadingImage||isDeleting) && <SmallSpinner color="#032282" />}
                                    </Button>}

                                </div>

                                <div className="flex flex-col md:flex-row gap-4 justify-between items-centereferra lg:mt-0">
                                    <div className="flex items-center gap-2">
                                        <div
                                            className="flex items-center justify-center flex-col gap-x-2 border-[0.3px] border-[#032282] bg-white px-4 rounded-lg cursor-pointer border-opacity-70 py-[.5625rem] "
                                            onClick={() =>
                                                copy(
                                                    ` https://liberty-life.vercel.app/?get-started=true&referral_code=${userData?.referral_code}`,
                                                )
                                            }
                                        >
                                            <p className="text-[#032282] text-xxs">Referral link</p>
                                            <div className="flex">
                                                <p className="text-[#032282] max-w-[6.25rem] text-xxs truncate">
                                                    {` https://liberty-life.vercel.app/?referral_code=${userData?.referral_code}`}
                                                </p>
                                                <Button className=" text-[#032282] px-0  py-[.0625rem]  flex items-start bg-transparent text-xs font-medium">
                                                    <CopyIcon4 height={15} width={15} fill="" />
                                                </Button>
                                            </div>
                                        </div>
                                        <div
                                            className="flex items-center justify-center flex-col gap-x-2 bg-white border-[0.3px] border-[#032282] px-6 rounded-lg cursor-pointer border-opacity-70 py-[.5625rem] "
                                            onClick={() => copy(userData?.referral_code ?? "")}
                                        >
                                            <p className="text-[#032282] text-xxs">Referral Code</p>
                                            <div className="flex">
                                                <p className="text-[black] max-w-[3.25rem] text-xxs truncate">
                                                    {userData?.referral_code ?? ""}
                                                </p>
                                                <Button className=" text-[#032282] px-0  py-[.0625rem] flex items-start bg-transparent text-xs font-medium">
                                                    <CopyIcon4 height={15} width={15} />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <div className="border-b-[0.3px] mt-4"></div>
                            <section>
                                <div className="mt-10">
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="grid grid-rows-1 lg:grid-cols-2 gap-x-10 gap-y-6 font-sans text-sm">
                                            <div>
                                                <Label htmlFor="name" className="text-[#032282]">
                                                    Name
                                                </Label>
                                                <Input
                                                    placeholder="Enter full name"
                                                    type="text"
                                                    id="name"
                                                    className="py-3 bg-[#F5F9FE] mt-2"
                                                    {...register("name", {})}
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="email" className="text-[#032282]">
                                                    Email
                                                </Label>
                                                <Input
                                                    placeholder="Enter email"
                                                    type="text"
                                                    id="email"
                                                    className="py-3 bg-[#F5F9FE]  mt-2"
                                                    {...register("email", {})}
                                                    disabled
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="Phone_number" className="text-[#032282]">
                                                    Phone number
                                                </Label>
                                                <Input
                                                    placeholder="Enter phone number"
                                                    type="number"
                                                    id="phone_number"
                                                    className="py-3 bg-[#F5F9FE]  mt-2"
                                                    {...register("phone_number", {})}
                                                    disabled
                                                />
                                            </div>
                                            <div className="">
                                                <Label className="text-[#032282]" htmlFor="State">
                                                    State
                                                </Label>

                                                <Controller
                                                    control={control}
                                                    name="state"
                                                    render={({ field: { onChange, value, ref } }) => (
                                                        <Select
                                                            value={stateOptions.find((c) => c.value === String(value))}
                                                            options={stateOptions}
                                                            placeholder="Select State"
                                                            ref={ref}
                                                            onChange={(selectedOption) => {
                                                                onChange(selectedOption?.value)
                                                                setValue("lga", "")
                                                            }}
                                                            styles={style}
                                                            components={{
                                                                IndicatorSeparator: () => null,
                                                            }}
                                                        />
                                                    )}
                                                />
                                            </div>
                                            <div className="">
                                                <Label className="text-[#032282]" htmlFor="State">
                                                    Lga
                                                </Label>

                                                <Controller
                                                    control={control}
                                                    name="lga"
                                                    render={({ field: { onChange, value, ref } }) => (
                                                        <Select
                                                            value={lgaOption?.find((c) => c.value === String(value))}
                                                            options={lgaOption}
                                                            placeholder="Select Lga"
                                                            ref={ref}
                                                            onChange={(lgaOption) => {
                                                                onChange(lgaOption?.value)
                                                            }}
                                                            styles={style}
                                                            components={{
                                                                IndicatorSeparator: () => null,
                                                            }}
                                                        />
                                                    )}
                                                />
                                            </div>
                                            <div className="">
                                                <Label className="text-[#032282]" htmlFor="hospital">
                                                  Address
                                                </Label>
                                                <div className="relative mt-[.25rem]">
                                                <Input
                                                    placeholder="Enter Address"
                                                    type="text"
                                                    id="name"
                                                    className="py-3 bg-[#F5F9FE] mt-2"
                                                    {...register("address", {})}
                                                />
                                                    {errors?.address && <p className="text-red-600 text-xs mt-1">{errors.address.message}</p>}
                                                </div>
                                            </div>
                                            <div>
                                                <Label className="text-[#032282]" htmlFor="selectedOption">
                                                    Select the one to enter, BVN or NIN?
                                                </Label>
                                                <Controller
                                                    control={control}
                                                    name="selectedOption"
                                                    render={({ field: { onChange, value, ref } }) => (
                                                        <RadioGroup
                                                            defaultValue="nin"
                                                            id="selectedOption"
                                                            onValueChange={onChange}
                                                            value={value}
                                                            className="px-4 py-3 bg-[#F5F9FE] mt-2"
                                                            ref={ref}
                                                        >
                                                            <div className="flex gap-x-4">
                                                                <div className="flex items-center space-x-2 bg-white py-2 pl-3 text-[#032282] pr-8 rounded-lg">
                                                                    <RadioGroupItem value="bvn" id="r1" />
                                                                    <Label htmlFor="r1" className="text-[#032282]">
                                                                        BVN
                                                                    </Label>
                                                                </div>
                                                                <div className="flex items-center space-x-2 bg-white py-2 pl-3 text-[#032282] pr-8 rounded-lg">
                                                                    <RadioGroupItem value="nin" id="r2" />
                                                                    <Label htmlFor="r2" className="text-[#032282]">
                                                                        NIN
                                                                    </Label>
                                                                </div>
                                                            </div>
                                                        </RadioGroup>
                                                    )}
                                                />
                                            </div>
                                            {watchSelectedOption === "bvn" && (
                                                <div className="w-full mt-[1rem] text-sm font-normal">
                                                    <Label className="mb-1 block text-xs text-[#032282]" htmlFor="bvn">
                                                        BVN
                                                    </Label>
                                                    <div className="relative mt-[.25rem]">
                                                        {/* <Input2
                                                            className={`${errors?.bvn?.message ? "border border-red-700" : ""} text-[#032282] bg-[#F5F9FE] py-6`}
                                                            placeholder="Enter BVN"
                                                            type="text"
                                                            id="bvn"
                                                            {...register("bvn")}
                                                        /> */}



                                                        <Controller
                                                            control={control}
                                                            name={`bvn`}
                                                            render={({ field }) => (
                                                                <input
                                                                    {...field}
                                                                    {...field}
                                                                    className={`${errors?.bvn ? "border border-red-700" : ""
                                                                        }  text-xs outline-none h-[2.4rem] md:h-[2.875rem] rounded-lg w-full px-6 bg-[#F5F9FE]`}
                                                                    id="account_no"
                                                                    placeholder="Enter bvn"
                                                                    type="text"
                                                                    maxLength={11}
                                                                    onChange={(e) => {
                                                                        const target = e.target as HTMLInputElement;  // Casting e.target to HTMLInputElement
                                                                        // Handle input sanitization on change (typing)
                                                                        const validPhoneNumber = target.value.replace(/[^0-9]/g, '');
                                                                        field.onChange(validPhoneNumber);
                                                                    }}




                                                                    onPaste={(e) => {
                                                                        e.target as HTMLInputElement;
                                                                        // Intercept paste event to sanitize pasted content
                                                                        const pastedValue = e.clipboardData.getData('text');
                                                                        // Remove non-numeric characters and limit to 11 digits
                                                                        const sanitizedValue = pastedValue.replace(/[^0-9]/g, '').slice(0, 11); // Only allow first 11 digits
                                                                        e.preventDefault(); // Prevent the default paste behavior
                                                                        field.onChange(sanitizedValue); // Apply sanitized value
                                                                    }}

                                                                    onInput={(e) => {
                                                                        const target = e.target as HTMLInputElement;  // Casting e.target to HTMLInputElement
                                                                        // Handle input sanitization on input changes
                                                                        const validPhoneNumber = target.value.replace(/[^0-9]/g, '');
                                                                        field.onChange(validPhoneNumber);
                                                                    }}
                                                                // onChange={(e) => field.onChange(e.target.value)}
                                                                />
                                                            )}
                                                        />





                                                    </div>
                                                </div>
                                            )}
                                            {watchSelectedOption === "nin" && (
                                                <div className="w-full mt-[1rem] text-sm font-normal">
                                                    <Label className="mb-1 block text-xs text-[#032282]" htmlFor="nin">
                                                        NIN
                                                    </Label>
                                                    <div className="relative mt-[.25rem]">
                                                        {/* <Input2
                                                            className={`${errors?.nin?.message ? "border border-red-700" : ""}  bg-[#F5F9FE] py-6`}
                                                            placeholder="Enter NIN"
                                                            type="text"
                                                            id="nin"
                                                            {...register("nin")}
                                                        /> */}


                                                        <Controller
                                                            control={control}
                                                            name={`nin`}
                                                            render={({ field }) => (
                                                                <input
                                                                    {...field}
                                                                    {...field}
                                                                    className={`${errors?.nin ? "border border-red-700" : ""
                                                                        }  text-xs outline-none h-[2.4rem] md:h-[2.875rem] rounded-lg w-full px-6 bg-[#F5F9FE]`}
                                                                    id="account_no"
                                                                    placeholder="Enter nin"
                                                                    type="text"
                                                                    maxLength={11}
                                                                    onChange={(e) => {
                                                                        const target = e.target as HTMLInputElement;  // Casting e.target to HTMLInputElement
                                                                        // Handle input sanitization on change (typing)
                                                                        const validPhoneNumber = target.value.replace(/[^0-9]/g, '');
                                                                        field.onChange(validPhoneNumber);
                                                                    }}




                                                                    onPaste={(e) => {
                                                                        e.target as HTMLInputElement;
                                                                        // Intercept paste event to sanitize pasted content
                                                                        const pastedValue = e.clipboardData.getData('text');
                                                                        // Remove non-numeric characters and limit to 11 digits
                                                                        const sanitizedValue = pastedValue.replace(/[^0-9]/g, '').slice(0, 11); // Only allow first 11 digits
                                                                        e.preventDefault(); // Prevent the default paste behavior
                                                                        field.onChange(sanitizedValue); // Apply sanitized value
                                                                    }}

                                                                    onInput={(e) => {
                                                                        const target = e.target as HTMLInputElement;  // Casting e.target to HTMLInputElement
                                                                        // Handle input sanitization on input changes
                                                                        const validPhoneNumber = target.value.replace(/[^0-9]/g, '');
                                                                        field.onChange(validPhoneNumber);
                                                                    }}
                                                                // onChange={(e) => field.onChange(e.target.value)}
                                                                />
                                                            )}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <div className="border-b-[0.3px] mt-4"></div>
                                        <div className="mt-6 max-md:pb-10">
                                            <Button
                                                type="submit"
                                                className="bg-[#099976] py-3 px-7 text-xs text-nowrap rounded-10 border-[0.3px] border-[#032282]"
                                            >
                                                Save Changes {isHandleUpdateProfile && <SmallSpinner color="blue" />}{" "}
                                            </Button>
                                        </div>
                                    </form>
                                </div>
                            </section>
                        </div>
                    </section>
                    <ErrorModal
                        isErrorModalOpen={isErrorModalOpen}
                        setErrorModalState={() => {
                            setErrorModalState(false)
                        }}
                        subheading={errorModalMessage || "Please check your inputs and try again."}
                    ></ErrorModal>
                </div>
            )}
        </>
    )
}

