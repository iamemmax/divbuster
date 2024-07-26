"use client"

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
    ClientOnly,
    Dialog,
    DialogBody,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    // Select,
    // SelectContent,
    // SelectItem,
    // SelectTrigger,
    // SelectValue,
    FormError,
    ErrorModal,
    Button,
} from "@/components/core";

import { z } from "zod";
import { Label } from "@radix-ui/react-label";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "react-query";

import { SmallSpinner, Spinner } from "@/icons/core";
import { capitalizeFirstLetter, formatAxiosErrorMessage } from "@/utils";
import { AxiosError } from "axios";
import { useErrorModalState } from "@/hooks";
import { Input2 } from "@/components/core/Input2";
import DebounceInput from "@/app/(dashboard)/comp/components/misc/DebounceInput";
import { useRouter } from "next/navigation";

import Select, { components } from "react-select";
import { fetchHospitalListByLga, fetchRegionByState, fetchStateList, useUserHospitalChoice } from "@/app/(main)/misc/components/insurance/api/remital/remtalUserDetails";
import SelectPlanModal from "./Selectplan";
import { useUser } from "@/app/(auth)/(onboarding)/misc";

interface Prop {
    setBuyPlanModal: React.Dispatch<React.SetStateAction<boolean>>
    isBuyPlanModalOpen: true
    heading: string;
    subsection: string
}

interface Hospitals {
    state: string;
    lga: string;
    provider_id: string;
    hospital: string;
}

interface Hospitals {
    lga: string;
    state: string;
    hospital: string;
    provider_id: string;
}

const formValues = z.object({
    hospitaldata: z.object({
        phone_number: z.string().trim().min(1, { message: "Please enter a valid phone number." }),
        name: z.string().trim().min(1, { message: "Please enter your name." }),
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
    }),
});

type formValues = z.infer<typeof formValues>;

const BuyPlanModal = ({
    setBuyPlanModal,
    isBuyPlanModalOpen
}: Prop) => {
    const {
        control,
        handleSubmit,
        register,
        formState: { errors },
        setValue,
      } = useForm<formValues>({
        resolver: zodResolver(formValues),
        defaultValues: {
          hospitaldata: {
            phone_number: '',
            name: '',
            email: '',
            state: '',
            lga: '',
          },
        },
      });

    const [errorMsg, setErrorMsg] = useState("");

    const {
        isErrorModalOpen,
        setErrorModalState,
        openErrorModalWithMessage,
        errorModalMessage,
    } = useErrorModalState();

    const selectedState = useWatch({
        control,
        name: "hospitaldata.state",
    });

    const selectedlga = useWatch({
        control,
        name: "hospitaldata.lga",
    });

    const [SelectPlan, setSelectPlan] = useState(false)

    const { data: stateList } = useQuery({
        queryFn: fetchStateList,
        queryKey: ["fetch-state-list"],
    });

    const { data: lgaList, isLoading: loadinglga } = useQuery({
        queryFn: () => fetchRegionByState(selectedState),
        queryKey: ["fetch-lga-list", selectedState],
    });
    console.log(selectedlga)

    const uniqueStates = Array.from(new Set(stateList));

    const { data: hospitalList, isLoading: loadingHospital } = useQuery({
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
    const { mutate: handleSubmitHospital, isLoading: loadingSubmit } =
    useUserHospitalChoice();
  // const router = useRouter();
  const onSubmit = (data: formValues) => {
    const selectedlgaData = hospitalList?.data?.find(
      (hos) =>
        hos?.lga?.toLowerCase() === data?.hospitaldata?.lga?.toLowerCase()
    );
    const { data: userData, isLoading } = useUser();
    handleSubmitHospital(
      {
        userId: userData?.user_id as string,
        email: data?.hospitaldata?.email,
        state: data?.hospitaldata.state,
        hospital: data?.hospitaldata.hospital,
        provider_id: String(selectedlgaData?.provider_id),
        lga: String(selectedlgaData?.lga),
      },
      {
        onSuccess: () => {
         setBuyPlanModal
        },
        onError: (error) => {
          const errorMessage = formatAxiosErrorMessage(error as AxiosError);
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-expect-error
          setErrorMsg(error?.response?.data?.error);
          openErrorModalWithMessage(String(errorMessage));
        },
      }
    );
  };

    const stateOptions = uniqueStates?.map((state) => ({
        value: state,
        label: state,
    }));
    const lgaOption = lgaList?.map((state) => ({
        value: state,
        label: state,
    }));

    const style = {
        control: (base: any) => ({
            ...base,
            border: 0,
            background: "#2a304f",
            height: "2.875rem",
            boxShadow: "none",
            color: "#fff",
        }),
        option: (provided: any) => ({
            ...provided,
            color: "#333",
            background: "#fff",
            "&:hover": {
                background: "#f0f0f0",
            },
        }),
        singleValue: (provided: any) => ({
            ...provided,
            color: "#fff",
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

    return (
        <>
            {isLoading ? (
                <Spinner />
            ) : (
                <div className="rounded-xl">
                    <Dialog open={isBuyPlanModalOpen}>
                        <DialogContent className="!overflow-hidden">
                            <DialogHeader className="bg-[#1B1687] 'font-DMSans' font-medium text-[#fff] text-base">
                                <DialogTitle className="'font-DMSans' font-medium text-[#fff]">
                                    User Details
                                </DialogTitle>
                                <DialogClose className="rounded-10 bg-transparent border-[0.3px] border-[#407BFF]">
                                    <button onClick={() => setBuyPlanModal(false)}>
                                        close
                                    </button>
                                </DialogClose>
                            </DialogHeader>

                            <DialogBody className="bg-[#141B3f] w-full">
                                <div className="py-1">
                                    <div className="text-[#fff] font-light  'font-DMSans' text-sm">
                                        Kindly enter the details below to activate
                                        beneficiary.
                                    </div>
                                </div>
                                <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
                                    <div className="w-full mt-[1rem] text-sm font-normal">
                                        <Label
                                            className="mb-1 block text-xs text-[#fff]"
                                            htmlFor="name"
                                        >
                                            Name
                                        </Label>
                                        <div className="relative mt-[.25rem]">
                                            <Input2
                                                className={`${errors?.hospitaldata?.email?.message ? "border border-red-700" : ""} text-[#fff] h-[2.875rem]`}
                                                placeholder="Enter name"
                                                type="text"
                                                id="name"
                                                {...register("hospitaldata.name")}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full mt-[1rem] text-sm font-normal">
                                        <Label
                                            className="mb-1 block text-xs text-[#fff]"
                                            htmlFor="number"
                                        >
                                            Phone number
                                        </Label>
                                        <div className="relative mt-[.25rem]">
                                            <Input2
                                                className={`${errors?.hospitaldata?.phone_number?.message ? "border border-red-700" : ""} text-[#fff] h-[2.875rem]`}
                                                placeholder="Enter phone number"
                                                type="text"
                                                id="phone-number"
                                                {...register("hospitaldata.phone_number")}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full mt-[1rem] text-sm font-normal">
                                        <Label
                                            className="mb-1 block text-xs text-[#fff]"
                                            htmlFor="email"
                                        >
                                            Email
                                        </Label>
                                        <div className="relative mt-[.25rem]">
                                            <Input2
                                                className={`${errors?.hospitaldata?.email?.message ? "border border-red-700" : ""} text-[#fff] h-[2.875rem]`}
                                                placeholder="Enter email"
                                                type="text"
                                                id="email"
                                                {...register("hospitaldata.email")}
                                            />
                                        </div>
                                    </div>
                                    <div className="">
                                        <Label
                                            className="mt-5 mb-1 block text-xs text-[#fff]"
                                            htmlFor="State"
                                        >
                                            State
                                        </Label>

                                        <Controller
                                            control={control}
                                            name="hospitaldata.state"
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
                                                        setValue("hospitaldata.lga", "");
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
                                            className="mt-5 mb-1 block text-xs text-[#fff]"
                                            htmlFor="State"
                                        >
                                            L.G.A
                                        </Label>

                                        <Controller
                                            control={control}
                                            name="hospitaldata.lga"
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
                                    <div className="w-full mt-[1rem] text-sm font-normal">
                                        <label
                                            className="mb-1 block text-xs text-[#fff]"
                                            htmlFor="hospital"
                                        >
                                            Hospital ({hospitalList?.data?.length ?? 0})
                                        </label>
                                        <div className="relative mt-[.25rem]">
                                            <Controller
                                                control={control}
                                                name="hospitaldata.hospital"
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
                                            {errors?.hospitaldata?.hospital && (
                                                <p className="text-red-600 text-xs mt-1">
                                                    {errors.hospitaldata.hospital.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="pb-[4rem]">
                                        <Button
                                            className="mt-[4.5rem] flex items-center gap-x-5 justify-center font-display focus:shadow-outline w-full rounded-2xl bg-[#fff] p-4 py-3 font-semibold tracking-wide
                                            shadow-lg transition-colors delay-150 ease-in-out hover:bg-slate-300 focus:outline-none text-[#1B1687]"
                                            type="submit"
                                            
                               
                                        >
                                            Continue{" "}
                                            {loadingSubmit && (
                                                <SmallSpinner className="" color="#1B1687" />
                                            )}
                                        </Button>
                                    </div>
                                </form>
                            </DialogBody>
                        </DialogContent>
                    </Dialog>

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
            {
                SelectPlan &&
                <SelectPlanModal
                    heading="Select Plan"
                    isSelectPlanModalOpen={SelectPlan}
                    setSelectPlanModal={setSelectPlan}
                    subsection="Kindly select any of the plans below to activate plan and make payment."
                />
            }
        </>
    );
};

export default BuyPlanModal;