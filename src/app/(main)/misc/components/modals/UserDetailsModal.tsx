"use client"

import { ClientOnly, Dialog, DialogBody, DialogClose, DialogContent, DialogHeader, DialogTitle, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/core";

import { useRouter } from "next/navigation";
import { Label } from '@radix-ui/react-label';
import { Controller, useForm } from "react-hook-form";


export interface stateOptions {
    name: string;
    value: string;
}[]

interface UseBooleanStateControlProps {
    isUserDetailsModalOpen: boolean;
    setUserDetailsModal: React.Dispatch<
        React.SetStateAction<boolean>
    >;
    setFourthModal: React.Dispatch<React.SetStateAction<boolean>>;
    heading: string;
    subheading: string;
    statedroplist?: stateOptions;
    



}


function UserDetailsModal({

    isUserDetailsModalOpen,
    setUserDetailsModal,
    setFourthModal,
    heading,
    subheading,
    statedroplist,
    

}: UseBooleanStateControlProps) {



    const {
        control,
        handleSubmit,
    
        // formState: { errors },
    } = useForm();


    const onCreateCompanySubmit = async (data: any) => {
        if(data){
            //
        }
    }


    const stateOptions = [
        {
            name: '1',
            value: "Lagos",

        },

        {
            name: '2',
            value: "Ekiti",


        },

        {
            name: '3',
            value: "Osun",

        },

        {
            name: '4',
            value: "Arizona",

        },

        {
            name: '5',
            value: "Oyo",

        },

        {
            name: '6',
            value: "Ogun",

        },

        {
            name: '7',
            value: "Abuja",


        }


    ];

    const lgaOptions = [
        { name: 'Shomolu', value: 'SHOMOLU' },
        { name: 'AdeKunle', value: 'ADEKUNLE' },
        { name: 'Etiosa', value: 'ETIOSA' },
        { name: 'Yaba', value: 'YABA' },
    ];


    const hosipitalOptions = [
        { name: 'Saint Luke Hospital', value: 'SAINT-LUKE-HOSPITAL' },
        { name: 'Saint Patriach Hospital', value: 'SAINT-PATRIACH-HOSPITAL' },
        { name: 'Yaba Hospital', value: 'YABA-HOSPITAL' },
        { name: 'Mushin Hospital', value: 'Mushin-HOSPITAL' },
    ];


    const Router = useRouter();

    const handleClose = () => {

        setUserDetailsModal(false)
        Router.back();

    }


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
                                onSubmit={handleSubmit(onCreateCompanySubmit)}
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
                                            name="state"
                                            render={({ field: { onChange, value, ref } }) => (
                                                <Select value={value} onValueChange={onChange}>
                                                    <SelectTrigger id="state" ref={ref} className="bg-[#2D3456] text-[#fff]">
                                                        <SelectValue placeholder="Enter State" />
                                                    </SelectTrigger>
                                                    <SelectContent >
                                                        {stateOptions?.map(({ name, value }) => {

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
                                )}





                                {statedroplist && (
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
                                )}


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
                                            name="Hospital"
                                            render={({ field: { onChange, value, ref } }) => (
                                                <Select value={value} onValueChange={onChange}>
                                                    <SelectTrigger id="hospital" ref={ref} className="bg-[#2D3456] text-[#fff]">
                                                        <SelectValue placeholder="Select Hospital" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {hosipitalOptions?.map(({ name, value }) => {
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
                                )}




                            </form>

                            {/* <div className="mt-6 md:mt-12">

                            {children}

                            </div> */}

                            <button
                                className="mt-[5rem] font-display focus:shadow-outline w-full rounded-2xl bg-[#fff] p-4 py-3 font-semibold tracking-wide
        shadow-lg transition-colors delay-150 ease-in-out hover:bg-slate-300 focus:outline-none text-[#1B1687]"

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









