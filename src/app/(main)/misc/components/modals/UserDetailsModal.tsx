"use client"

import { ClientOnly, Dialog, DialogBody, DialogClose, DialogContent, DialogHeader, DialogTitle, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, FormError, ErrorModal, } from "@/components/core";

import { useRouter } from "next/navigation";
import { Label } from '@radix-ui/react-label';
import { Controller, useForm, useWatch } from "react-hook-form";
import { useStateListData } from "@/app/(auth)/(onboarding)/misc/api/getNigerianStates";
import { useState } from "react";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useErrorModalState } from "@/hooks";
import { useHospitalListData } from "@/app/(auth)/(onboarding)/misc/api/getHospitalByStates";


// export interface stateOptions {
//     name: string;
//     value: string;
// }[]

interface UseBooleanStateControlProps {
    isUserDetailsModalOpen: boolean;
    setUserDetailsModal: React.Dispatch<
        React.SetStateAction<boolean>
    >;
    setFourthModal: React.Dispatch<React.SetStateAction<boolean>>;
    heading: string;
    subheading: string;
    statedroplist?: string[];

}


function UserDetailsModal({

    isUserDetailsModalOpen,
    setUserDetailsModal,
    setFourthModal,
    heading,
    subheading,
    statedroplist,


}: UseBooleanStateControlProps) {

    const GetStartedFormSchema = z.object({
        
hospitaldata:z.object({
    state: z
    .string({ required_error: 'Please select a state.' })
    .trim()
    .min(1, { message: 'Please select a state.' }),

hospital: z
    .string({ required_error: 'Please select a hospital.'})
    .trim()
    .min(1, { message: 'Please select a hosiptal.' }),

})
        

    });

    type GetStartedFormValues = z.infer<typeof GetStartedFormSchema>;


    const {
        control,
        handleSubmit,
        register,
        formState: { errors },
        setValue
    } = useForm<GetStartedFormValues>({
        resolver: zodResolver(GetStartedFormSchema),
    });


    const {
        isErrorModalOpen,
        setErrorModalState,
        closeErrorModal,
        openErrorModalWithMessage,
        errorModalMessage,
    } = useErrorModalState();


    const router = useRouter();

    const handleClose = () => {

        setUserDetailsModal(false)
        router.back();

    }


    const selectedState = useWatch({
        control,
        name: 'hospitaldata'

    })

    




    const { data: stateListData, isLoading } = useStateListData();
    // const { data: stateListData } = useStateListData(selectedState as string, selectedState.trim !== "");

    console.log(stateListData)




    const {data: hospitalListData} = useHospitalListData(selectedState?.state);
        console.log(hospitalListData);


    // const {
    //     mutate: registerUserDetails,
    //     isLoading: isRegisterUserDetailsLoading,
    //   } = useRegisterUserDetails();

    const onUserDetailsSubmit = (submittedData: GetStartedFormValues) => {
        // registerUserDetails(
        //   { ...submittedData, list_STATES: 'AGENT', source: 'PAYBOX' },
        //   {
        //     onSuccess: () => {
        //       openLoaderModal();
        //       router.push(
        //         `/sign-up/email-otp/?email=${submittedData.email}&phone=${submittedData.phone_number}`
        //       );
        //     },

        //     onError: (error: unknown) => {
        //       const errorMessage = formatAxiosErrorMessage(error as AxiosError);
        //       openErrorModalWithMessage(errorMessage);
        //     },
        //   }
        // );
    };







    return (

        <div className="rounded-xl">



            <ClientOnly>

                <Dialog open={isUserDetailsModalOpen}
                    onOpenChange={setUserDetailsModal}>

                    <DialogContent className="!overflow-hidden">



                        <DialogHeader className="bg-[#1B1687] 'font-DMSans' font-medium text-[#fff] text-base">

                            <DialogTitle className="'font-DMSans' font-medium text-[#fff]">
                                {heading}
                            </DialogTitle>


                            <DialogClose className="rounded-full">
                                <button onClick={handleClose}>close</button>
                            </DialogClose>

                        </DialogHeader>

                        <DialogBody className="bg-[#141B3f] w-full">

                            <div className="py-1">

                                <div className="text-[#fff] font-light  'font-DMSans' text-sm">
                                    {subheading}
                                </div>


                            </div>

                            <form
                                className="space-y-8"
                                onSubmit={handleSubmit(onUserDetailsSubmit)}
                            >

                                {statedroplist && (
                                    <div className="">
                                        <Label
                                            className="mt-10 mb-1 block text-xs text-[#fff]"
                                            htmlFor="State"
                                        >
                                            State
                                        </Label>

                                        <Controller
                                            control={control}
                                            name="hospitaldata.state"
                                            render={({ field: { onChange, value, ref } }) => (
                                                <Select value={value} onValueChange={onChange}>
                                                    <SelectTrigger id="state" ref={ref} className="bg-[#2D3456] text-[#fff]">
                                                        <SelectValue placeholder="Enter State" />
                                                    </SelectTrigger>
                                                    <SelectContent >
                                                        {
                                                            isLoading &&
                                                            <SelectItem value={"loading"} disabled>
                                                                Loading...
                                                            </SelectItem>
                                                        }
                                                        {stateListData?.map((state_name) => {

                                                            return (

                                                                <SelectItem key={state_name} value={state_name}>
                                                                    {state_name}
                                                                </SelectItem>
                                                            );
                                                        })}
                                                    </SelectContent>
                                                </Select>
                                            )}
                                        />

                                        {errors?.hospitaldata?.state && (
                                            <FormError
                                                className="bg-red-900/40 text-white"
                                                errorMessage={errors?.hospitaldata?.state.message}
                                            />
                                        )}

                                    </div>
                                )}


                                {
                                    // stateListData && stateListData.map()
                                }


                                {/* {statedroplist && (
                                    <div>
                                        <Label
                                            className="mb-1 block text-xs  text-[#fff]"
                                            htmlFor="L.G.A"
                                        >
                                            L.G.A
                                        </Label>

                                        <Controller

                                            control={control}
                                            name="L.G.A"
                                            render={({ field: { onChange, value, ref } }) => (
                                                <Select value={value} onValueChange={onChange} >
                                                    <SelectTrigger id="lga" ref={ref} className="bg-[#2D3456] text-[#fff]">
                                                        <SelectValue placeholder="Enter L.G.A" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {lgaOptions?.map(({ name, value }) => {
                                                            return (
                                                                <SelectItem key={name} value={value}>
                                                                    {value}
                                                                </SelectItem>
                                                            );
                                                        })}
                                                    </SelectContent>
                                                </Select>
                                            )}
                                        />

                                    </div>
                                )} */}







                                {/* Hospital dropdownList */}


                                {statedroplist && (
                                    <div>
                                        <Label
                                            className="mb-1 block text-xs  text-[#fff]"
                                            htmlFor="Hospital"
                                        >
                                            Hospital
                                        </Label>

                                        <Controller
                                            control={control}
                                            name="hospitaldata.hospital"
                                            render={({ field: { onChange, value, ref } }) => (
                                                <Select value={value} onValueChange={onChange} disabled={!selectedState}>
                                                    <SelectTrigger id="hospital" ref={ref} className="bg-[#2D3456] text-[#fff]">
                                                        <SelectValue placeholder="Select Hospital" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {hospitalListData?.map((hospital:string, index:number) => {
                                                            return (
                                                                <SelectItem key={index} value={hospital}>
                                                                    {hospital}
                                                                </SelectItem>
                                                            );
                                                        })}
                                                    </SelectContent>
                                                </Select>
                                            )}
                                        />

                                    </div>
                                )}




                            </form>


                            <ErrorModal
                                isErrorModalOpen={isErrorModalOpen}
                                setErrorModalState={setErrorModalState}
                                subheading={
                                    errorModalMessage || 'Please check your inputs and try again.'
                                }
                            >
                                <div className="flex gap-3 rounded-2xl bg-red-50 px-8 py-6">
                                    <button
                                        className="grow bg-red-950 px-1.5 sm:text-sm md:px-6"
                                        type="button"
                                        onClick={closeErrorModal}
                                    >
                                        Okay
                                    </button>
                                </div>
                            </ErrorModal>


                            <button
                                className="mt-[5.8rem] mb-[2rem] font-display focus:shadow-outline w-full rounded-2xl bg-[#fff] p-4 py-3 font-semibold tracking-wide
        shadow-lg transition-colors delay-150 ease-in-out hover:bg-slate-300 focus:outline-none text-[#1B1687]"
                                disabled={!selectedState}

                                onClick={() => {

                                    setFourthModal(true);
                                    setUserDetailsModal(false);
                                }}
                            >
                                Continue
                            </button>

                        </DialogBody>


                    </DialogContent>


                </Dialog>
            </ClientOnly>


        </div>





    )


}

export default UserDetailsModal









