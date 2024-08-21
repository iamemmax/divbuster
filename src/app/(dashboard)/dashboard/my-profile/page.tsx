"use client"


import Image from 'next/image'
import React, { ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'

import { Button, ErrorModal, FormError, Input, RadioGroup, RadioGroupItem, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/core'
import { useQuery, useQueryClient } from 'react-query'
import { fetchReferralCode } from '../api/referral/fetchReferralCode'
import { UserDataTypes, useUser } from '@/app/(auth)/(onboarding)/misc'
import { Label } from '@radix-ui/react-label'
import { Controller, useForm, useWatch } from 'react-hook-form'
import { string, z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useClipboard, useErrorModalState } from '@/hooks'
import { fetchHospitalListByLga, fetchRegionByState, fetchStateList, useUserHospitalChoice } from '@/app/(main)/misc/components/insurance/api/remital/remtalUserDetails'
import { capitalizeFirstLetter, formatAxiosErrorMessage } from '@/utils'

import Select, { components } from "react-select";
import { Spinner } from '@/icons/core'
import { CopyIcon4, Delete, Photo, Upload } from '../../comp/icons'
import { Input2 } from '@/components/core/Input2'
import { useUpdateUserDetails } from '../api/patchUserDetails'
// import { getUserDetails, useGetUserDetails } from '../api/getUserDetails'
import toast from 'react-hot-toast'
import { useUpdateUserImage } from '../api/patchUserImage'
import { AxiosError } from 'axios'


interface Prop {
    setShowPasswordModal: Dispatch<SetStateAction<boolean>>;
    OpenRemitalUserDetail: true;
    userId: string;
    userEmail: string;
    setOpenShowRemitalPlan: Dispatch<SetStateAction<boolean>>;
    verifyResponse: {
        nin: string;
        bvn: string;
        address: string;
        email: string;
        id: string;
    };
}


const formValues = z.object({
    name: z.string().trim(),
    phone_number: z.string().trim(),
    email: z
        .string()
        .email({ message: "Invalid email format" })
        .min(1, { message: "Email is required" }),
    state: z.string().trim().min(1, { message: "Please select a state." }),
    lga: z.string().trim().min(1, { message: "Please select a lga." }),
    hospital: z
        .string()
        .trim()
        .min(1, { message: "Please select a hospital." }),
    selectedOption: z.union([z.literal("nin"), z.literal("bvn")]),
    bvn: z.string().trim(),
    nin: z.string().trim(),

});

const baseSchema = z.object({

});

// Extend the base schema for NIN
const ninSchema = baseSchema.extend({
    nin: z
        .string()
        .trim()
        .min(10, { message: "NIN should be at least 10 digits" }),
});

// Extend the base schema for BVN
const bvnSchema = baseSchema.extend({
    bvn: z
        .string()
        .trim()
        .min(11, { message: "BVN should be at least 11 digits" }),
});

export default function Page() {

    const { data: userData, isLoading: isloadingUserdata } = useUser();
    const queryClient = useQueryClient();

    const { copy } = useClipboard();

    const {
        data
    } = useQuery({
        queryFn: () => fetchReferralCode(userData?.user_id as string),
        queryKey: ["generate-referral-code", userData?.user_id],
        enabled: false,
        onSuccess: () => {
            // Invalidate user details query to refetch data.
            queryClient.invalidateQueries(["user-details", data?.referral_code]);
        },
    });

    const {
        isErrorModalOpen,
        setErrorModalState,
        openErrorModalWithMessage,
        errorModalMessage,
    } = useErrorModalState();

    const [errorMsg, setErrorMsg] = useState("");

    const {
        control,
        handleSubmit,
        register,
        formState: { errors },
        setValue,
    } = useForm<formValues>({
        resolver: zodResolver(formValues),
        defaultValues: {
            email: "",
            hospital: "",
            lga: "",
            state: userData?.state,
            name: userData?.first_name,
            phone_number: userData?.phone_number
        },
    });

    type formValues = z.infer<typeof formValues>;

    useEffect(() => {
        if (!isloadingUserdata && userData) {
            setValue("name", userData?.first_name || "");
            setValue("name", userData?.middle_name || "");
            setValue("name", userData?.last_name || "");
            setValue("phone_number", userData?.phone_number || "");
            setValue("email", userData?.email || "");
            setValue("state", userData.state || "");
            setValue('nin', userData?.nin || "")
            setValue('bvn', userData?.bvn || "")
            // setProfilePic(userData?.profile_image || '/images/userIcon.png')
        }

    }, [isloadingUserdata])


    const watchSelectedOption = useWatch({
        control,
        name: "selectedOption",
    });

    const selectedState = useWatch({
        control,
        name: "state",
    });

    const selectedlga = useWatch({
        control,
        name: "lga",
    });

    const { data: stateList } = useQuery({
        queryFn: fetchStateList,
        queryKey: ["fetch-state-list"],
    });

    const { data: lgaList, isLoading: loadinglga } = useQuery({
        queryFn: () => fetchRegionByState(selectedState),
        queryKey: ["fetch-lga-list", selectedState],
    });

    const uniqueStates = Array.from(new Set(stateList));

    const { data: hospitalList } = useQuery({
        queryFn: () => fetchHospitalListByLga(selectedlga),
        queryKey: ["fetch-hospital-list", selectedlga],
    });

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);
    const { mutate: handleSubmitHospital } =
        useUserHospitalChoice();
    // const router = useRouter();


    const stateOptions = uniqueStates?.map((state) => ({
        value: state,
        label: state,
    }));
    const lgaOption = lgaList?.map((state) => ({
        value: state,
        label: state,
    }));

    console.log("lga", stateOptions);

    console.log("lga", lgaOption);

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
    };

    const hospitalOptions = hospitalList?.data?.map((hospital) => ({
        value: capitalizeFirstLetter(hospital.name),
        label: hospital?.name,
        name: hospital?.name,
        address: hospital?.address,
    }));

    const { mutate: handleUpdateProfile, isLoading: isHandleUpdateProfile } = useUpdateUserDetails();
    const onSubmit = (data: formValues) => {
        handleUpdateProfile(
            {
                name: data.name,
                email: data.email,
                phone_number: data.phone_number,
                state: data.state,
                lga: data.lga,
                hospital: data.hospital,
                bvn: data.bvn,
                nin: data.nin
            },
            {
                onSuccess: () => {
                    toast.success("Your details have been updated")
                },
            }
        )
        console.log(data, "datae")
    };



    interface Prop {
        userData: UserDataTypes | undefined;
    }

    const CustomOption = (props: any) => {
        const { data } = props;
        return (
            <components.Option {...props}>
                <div className="w-[20rem]">
                    <h2 className="text-[#1B1687]  text-xs">{data?.name}</h2>
                    <p className="text-[.625rem] text-[#080D27]">
                        {data?.address?.toLowerCase()}
                    </p>
                </div>
            </components.Option>
        );
    };

    const [profilePic, setProfilePic] = useState<string | null>(null);
    const fileInputRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleClick = () => {
        if (fileInputRef.current) {
            (fileInputRef.current as HTMLInputElement).click();
        }
    };

    const handleProfilePicChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event?.target?.files?.[0];
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        }
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePic(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };
    const { mutate: handleUpload } = useUpdateUserImage()
    const handleFileUpload = () => {
        handleUpload(
            selectedFile
            , {
                onSuccess: (data) => {
                    //   setBuyPlanModal;
                    queryClient.invalidateQueries(["user-details"]);
                    // setshowWithdrawalModal(false);
                },
                onError: (error) => {
                    const errorMessage = formatAxiosErrorMessage(error as AxiosError);
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-expect-error
                    setErrorMsg(error?.response?.data?.error);
                    openErrorModalWithMessage(String(errorMessage));
                },
            })
    };

    const handleDelete = () => {
        setProfilePic(null);
    };

    return (
        <>
            {isLoading ? (
                <Spinner />
            ) : (
                <div className='bg-[#F5F9FE]'>
                    <div className='bg-main min-h-36'></div>
                    <section className="h-full w-full px-6 md:px-[7.5rem] min-h-screen pb-[1.88rem] relative -mt-32">
                        <div className='bg-white w-full h-full lg:h-screen mx-auto pt-[2.625rem] px-[4.5rem] rounded-[.625rem]'>
                            <p className='text-[#032282] font-sans font-bold text-2xl'>Personal Information</p>
                            <section className='mt-8 flex flex-col lg:flex-row justify-between'>
                                <div className='flex justify-between items-center gap-4'>
                                    <div className='hidden md:flex relative'>
                                        <Image
                                            alt="profile"
                                            src={profilePic || userData?.profile_image || '/images/userIcon.png'}
                                            height={100}
                                            width={100}
                                            className="rounded-full"
                                        />
                                        <div className='mt-[3.8rem] -ml-[1.5rem]'>
                                            <Photo onClick={handleClick} />
                                        </div>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            style={{ display: 'none' }}
                                            onChange={handleProfilePicChange}
                                        />
                                    </div>
                                    <div className='flex md:hidden relative '>
                                        <Image
                                            alt="profile"
                                            src={profilePic || userData?.profile_image || '/images/userIcon.png'}
                                            height={100}
                                            width={100}
                                            className="rounded-full"
                                        />
                                        <div className='mt-[3.8rem] -ml-[1.5rem]'>
                                            <Photo onClick={handleClick} />
                                        </div>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            style={{ display: 'none' }}
                                            onChange={handleProfilePicChange}
                                        />
                                    </div>
                                    {
                                        profilePic &&
                                        <>

                                            <Button className='bg-[#F5F9FE] gap-1 border-[0.3px] border-[#032282] px-4 py-3' id='upload' onClick={handleFileUpload}>
                                                <Upload />
                                                <p className='text-[#032282] font-medium'>Upload</p>
                                            </Button>
                                            <Button className='bg-[#F5F9FE] gap-1 px-4 py-3'>
                                                <Delete
                                                    onClick={handleDelete}
                                                />
                                                <p className='text-[#032282] font-medium'>Remove</p>
                                            </Button>
                                        </>
                                    }
                                </div>
                                {/* </form> */}
                                <div className='flex flex-col md:flex-row gap-4 justify-between items-center mt-3 lg:mt-0'>
                                    <div className="flex items-center gap-2">
                                        <div
                                            className="flex items-center justify-center flex-col gap-x-2 border-[0.3px] border-[#032282] bg-white px-4 rounded-lg cursor-pointer border-opacity-70 py-[.5625rem] "
                                            onClick={() =>
                                                copy(
                                                    ` https://liberty-life.vercel.app/?get-started=true&referral_code=${userData?.referral_code}` ??
                                                    ""
                                                )
                                            }
                                        >
                                            <p className="text-[#032282] text-xxs">
                                                Referral link
                                            </p>
                                            <div className="flex">
                                                <p className="text-[#032282] max-w-[6.25rem] text-xxs truncate">
                                                    {` https://liberty-life.vercel.app/?referral_code=${userData?.referral_code}`}
                                                </p>
                                                <Button className=" text-[#032282] px-0  py-[.0625rem]  flex items-start bg-transparent text-xs font-medium">
                                                    <CopyIcon4 height={15} width={15} fill='' />
                                                </Button>
                                            </div>
                                        </div>
                                        <div
                                            className="flex items-center justify-center flex-col gap-x-2 bg-white border-[0.3px] border-[#032282] px-6 rounded-lg cursor-pointer border-opacity-70 py-[.5625rem] "
                                            onClick={() => copy(userData?.referral_code ?? "")}
                                        >
                                            <p className="text-[#032282] text-xxs">
                                                Referral Code
                                            </p>
                                            <div className="flex">
                                                <p className="text-[black] max-w-[3.25rem] text-xxs truncate">
                                                    {userData?.referral_code ?? ""}
                                                </p>
                                                <Button className=" text-[#032282] px-0  py-[.0625rem]  flex items-start bg-transparent text-xs font-medium">
                                                    <CopyIcon4 height={15} width={15} />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <div className='border-b-[0.3px] mt-4'></div>
                            <section >
                                <div className='mt-10'>
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className='grid grid-rows-1 lg:grid-cols-2 gap-x-10 gap-y-6 font-sans text-sm'>
                                            <div >
                                                <Label
                                                    htmlFor='name'
                                                    className='text-[#032282]'
                                                >
                                                    Name
                                                </Label>
                                                <Input
                                                    placeholder='Enter name'
                                                    type='text'
                                                    id='name'
                                                    className='py-3 bg-[#F5F9FE] mt-2'
                                                    {...register("name", {

                                                    })}

                                                />
                                            </div>
                                            <div>
                                                <Label
                                                    htmlFor='email'
                                                    className='text-[#032282]'
                                                >
                                                    Email
                                                </Label>
                                                <Input
                                                    placeholder='Enter email'
                                                    type='text'
                                                    id='email'
                                                    className='py-3 bg-[#F5F9FE]  mt-2'
                                                    {...register("email", {})}
                                                    disabled
                                                />
                                            </div>
                                            <div>
                                                <Label
                                                    htmlFor='Phone_number'
                                                    className='text-[#032282]'
                                                >
                                                    Phone number
                                                </Label>
                                                <Input
                                                    placeholder='Enter phone number'
                                                    type='number'
                                                    id='phone_number'
                                                    className='py-3 bg-[#F5F9FE]  mt-2'
                                                    {...register("phone_number", {})}
                                                    disabled
                                                />
                                            </div>
                                            <div className="">
                                                <Label
                                                    className='text-[#032282]'
                                                    htmlFor="State"
                                                >
                                                    State
                                                </Label>

                                                <Controller
                                                    control={control}
                                                    name="state"
                                                    render={({ field: { onChange, value, ref } }) => (
                                                        <Select
                                                            value={stateOptions.find(
                                                                (c) => c.value === String(value)
                                                            )}
                                                            options={stateOptions}
                                                            placeholder="Select State"
                                                            ref={ref}
                                                            onChange={(selectedOption) => {
                                                                onChange(selectedOption?.value);
                                                                setValue("lga", "");
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
                                                <Label
                                                    className='text-[#032282]'
                                                    htmlFor="State"
                                                >
                                                    Lga
                                                </Label>

                                                <Controller
                                                    control={control}
                                                    name="lga"
                                                    render={({ field: { onChange, value, ref } }) => (
                                                        <Select
                                                            value={lgaOption?.find(
                                                                (c) => c.value === String(value)
                                                            )}
                                                            options={lgaOption}
                                                            placeholder="Select Lga"
                                                            ref={ref}
                                                            onChange={(lgaOption) => {
                                                                onChange(lgaOption?.value);
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
                                                <Label
                                                    className='text-[#032282]'
                                                    htmlFor="hospital"
                                                >
                                                    Hospital ({hospitalList?.data?.length ?? 0})
                                                </Label>
                                                <div className="relative mt-[.25rem]">
                                                    <Controller
                                                        control={control}
                                                        name="hospital"
                                                        render={({ field }) => (
                                                            <Select
                                                                {...field}
                                                                options={hospitalOptions}
                                                                placeholder="Select Hospital"
                                                                onChange={(option) => field.onChange(option?.value)}
                                                                value={hospitalOptions?.find(
                                                                    (option) => option.value === field.value
                                                                )}
                                                                styles={style}
                                                                components={{
                                                                    Option: CustomOption,
                                                                    IndicatorSeparator: () => null,
                                                                }}
                                                            />
                                                        )}
                                                    />
                                                    {errors?.hospital && (
                                                        <p className="text-red-600 text-xs mt-1">
                                                            {errors.hospital.message}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <div>
                                                <Label
                                                    className='text-[#032282]'
                                                    htmlFor='selectedOption'
                                                >
                                                    Select the one to enter, BVN or NIN?
                                                </Label>
                                                <Controller
                                                    control={control}
                                                    name="selectedOption"
                                                    render={({ field: { onChange, value, ref } }) => (

                                                        <RadioGroup
                                                            defaultValue="nin"
                                                            id='selectedOption'
                                                            onValueChange={onChange}
                                                            value={value}
                                                            className='px-4 py-3 bg-[#F5F9FE] mt-2'
                                                            ref={ref}
                                                        >
                                                            <div className='flex gap-x-4'>

                                                                <div className="flex items-center space-x-2 bg-white py-2 pl-3 text-[#032282] pr-8 rounded-lg">
                                                                    <RadioGroupItem value="bvn" id="r1" />
                                                                    <Label htmlFor="r1" className='text-[#032282]'>BVN</Label>
                                                                </div>
                                                                <div className="flex items-center space-x-2 bg-white py-2 pl-3 text-[#032282] pr-8 rounded-lg">
                                                                    <RadioGroupItem value="nin" id="r2" />
                                                                    <Label htmlFor="r2" className='text-[#032282]'>NIN</Label>
                                                                </div>
                                                            </div>
                                                        </RadioGroup>
                                                    )}
                                                />
                                            </div>
                                            {watchSelectedOption === "bvn" && (
                                                <div className="w-full mt-[1rem] text-sm font-normal">
                                                    <Label
                                                        className="mb-1 block text-xs text-[#032282]"
                                                        htmlFor="bvn"
                                                    >
                                                        BVN
                                                    </Label>
                                                    <div className="relative mt-[.25rem]">
                                                        <Input2
                                                            className={`${errors?.bvn?.message ? "border border-red-700" : ""} text-[#032282] bg-[#F5F9FE] py-6`}
                                                            placeholder="Enter BVN"
                                                            type="text"
                                                            id="bvn"
                                                            required
                                                            {...register("bvn")}

                                                        />
                                                    </div>
                                                </div>
                                            )}

                                            {watchSelectedOption === "nin" && (
                                                <div className="w-full mt-[1rem] text-sm font-normal">
                                                    <Label
                                                        className="mb-1 block text-xs text-[#032282]"
                                                        htmlFor="nin"

                                                    >
                                                        NIN
                                                    </Label>
                                                    <div className="relative mt-[.25rem]">
                                                        <Input2
                                                            className={`${errors?.nin?.message ? "border border-red-700" : ""}  bg-[#F5F9FE] py-6`}
                                                            placeholder="Enter NIN"
                                                            type="text"
                                                            id="nin"
                                                            required
                                                            {...register("nin")}
                                                            disabled
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <div className='border-b-[0.3px] mt-4'></div>
                                        <div className='mt-6'>
                                            <Button className='bg-[#099976] py-3 px-7 text-xs text-nowrap rounded-10 border-[0.3px] border-[#032282]'>Save Changes</Button>
                                        </div>
                                    </form>
                                </div>
                            </section>

                        </div>
                    </section>
                    <ErrorModal
                        isErrorModalOpen={isErrorModalOpen}
                        setErrorModalState={() => {
                            setErrorModalState(false);
                        }}
                        subheading={
                            errorModalMessage ||
                            errorMsg ||
                            "Please check your inputs and try again."
                        }
                    ></ErrorModal>
                </div>
            )}
        </>
    )
}


