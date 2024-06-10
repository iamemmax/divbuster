"use client"

import Home from "@/app/(main)/page";
import {
    Button,
    ClientOnly,

    DialogTrigger,
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "@/components/core";
import { Dialog, DialogBody, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/core/DialogClone";
import { Input2 } from "@/components/core/Input2";
import { useBooleanStateControl } from "@/hooks";
import { RightUpArrow } from "@/icons/core";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from 'next/image';
import Link from "next/link";
import SixMonthIndividualPlanModal from "./SixMonthIndividualPlanModal";
import DeductionModal from "./DeductionModal";
import AppSuccessfulModal from "./AppSuccessfulModal";




interface UseBooleanStateControlProps {
    isIndividualModalOpen: boolean;
    setIndividualModal: React.Dispatch<
        React.SetStateAction<boolean>
    >;
    heading: string;
    subheading: string;
    // closeButtonReplacement?: React.ReactNode;
    children?: React.ReactNode;
    description?: string;
    Tab1?: string;
    Tab2?: string;
    Tab3?: string;
    Tab4?: string;
    individualdurationplanone?: string;
    individualdurationplantwo?: string;
    individualamountplanone?: string;
    individualamountplantwo?: string;
    familydurationplan?: string;
    familydurationplanone?: string;
    familydurationplantwo?: string;
    familyamountplanone?: string;
    familyamountplantwo?: string;




}


function IndividualModal({

    isIndividualModalOpen,
    setIndividualModal,
    heading,
    subheading,
    description,
    
    Tab1,
    Tab2,
    individualdurationplanone,
    individualamountplanone,
    individualdurationplantwo,
    individualamountplantwo,
    familydurationplanone,
    familydurationplantwo,
    familyamountplanone,
    familyamountplantwo,
    children,

}: UseBooleanStateControlProps) {

const [fifthModal, setFifthModal] = useState(false);
const [sixthModal, setSixthModal] =useState(false);
const [seventhModal, setSeventhModal] =useState(false);



    const firstMonthPlan = [
        {
            picture: '/images/landing-page/verify.png',
            value: "Telemedicine",

        },

        {
            picture: '/images/landing-page/verify.png',
            value: "Surgery Care",


        },

        {
            picture: '/images/landing-page/verify.png',
            value: "Pharmacy Access",

        },

        {
            picture: '/images/landing-page/verify.png',
            value: "Doctor Consultation",

        },


    ];




    const familyMonthPlan = [
        {
            picture: '/images/landing-page/verify.png',
            value: "Telemedicine",

        },

        {
            picture: '/images/landing-page/verify.png',
            value: "Surgery Care",


        },

        {
            picture: '/images/landing-page/verify.png',
            value: "Pharmacy Access",

        },

        {
            picture: '/images/landing-page/verify.png',
            value: "Doctor Consultation",

        },


    ];


    const router = useRouter();



    const handleClose = () => {

        setIndividualModal(false);

        router.back();

    }




    return (

        <div className="">



            <ClientOnly>


                <Dialog open={isIndividualModalOpen}
                    onOpenChange={setIndividualModal}


                >

                    <DialogContent className="!overflow-hidden w-full h-[55rem]">

                        <div className="w-full flex justify-between items-center gap-16">

                            <DialogHeader className="bg-[#1B1687] w-full !justify-between !gap-40">

                                <DialogTitle className="text-[#fff] ">
                                    {heading}
                                </DialogTitle>


                                <DialogClose className="rounded-full">
                                    <button onClick={handleClose}>close</button>
                                </DialogClose>

                            </DialogHeader>
                        </div>

                        <DialogBody className="bg-[#151D42] w-full ">

                            <div className="py-1">

                                <div className="text-[#fff]  text-center font-semibold text-3xl">
                                    <DialogDescription className="text-3xl">{subheading}</DialogDescription>
                                </div>


                            </div>

                            <div className="flex w-full items-center justify-center">
                                <p className="w-full px-[2rem] text-center  sm:max-w-[80%]  text-[#747577]">{description}</p>
                            </div>




                            <div className="h-[409px] w-full  mt-10 ">


                                <Tabs className="" defaultValue="Individual">

                                    <div className="flex w-full items-center justify-center">
                                        <TabsList className="flex w-full justify-center rounded-10 py-[2rem]   md:max-w-[23rem] md:pl-6 lg:pl-0  border-[1px] border-[#407BFF]">

                                            <TabsTrigger
                                                className="inline-flex w-full items-center justify-center rounded-xl   text-lg font-medium text-[#fff]  data-[state=active]:shadow-none"
                                                value="Individual"
                                            >
                                                {Tab1}
                                            </TabsTrigger>
                                            <TabsTrigger
                                                className="inline-flex w-full items-center justify-center rounded-xl    text-lg font-medium text-[#fff]   data-[state=active]:shadow-none"
                                                value="Family"
                                            >
                                                {Tab2}
                                            </TabsTrigger>


                                        </TabsList>
                                    </div>

                                    <TabsContent
                                        className="mt-1 rounded-10  px-6 py-10 lg:px-0 lg:py-4"
                                        value="Individual"
                                    >
                                        <div className="w-full flex gap-[1rem] items-center justify-center">


                                            <div className="  flex flex-col items-center justify-center">
                                                <svg className="z-40" width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="40" cy="40" r="39.5" fill="#080D27" stroke="#4760FD" />
                                                    <path d="M50.0713 43.5C51.115 43.501 52.1156 43.9162 52.8533 44.6545C53.591 45.3929 54.0053 46.3939 54.0053 47.4375V48.4438C54.0053 50.0083 53.4453 51.522 52.4303 52.7103C49.6828 55.918 45.5056 57.5018 40.0001 57.5018C34.4946 57.5018 30.3191 55.918 27.5786 52.7068C26.5646 51.5191 26.0074 50.0089 26.0071 48.4473V47.4358C26.0075 46.3921 26.4224 45.3913 27.1603 44.6533C27.8983 43.9153 28.8991 43.5005 29.9428 43.5H50.0713ZM50.0713 46.125H29.9411C29.593 46.125 29.2591 46.2633 29.013 46.5095C28.7669 46.7556 28.6286 47.0894 28.6286 47.4375V48.4473C28.6286 49.3835 28.9646 50.29 29.5736 51.0023C31.7663 53.573 35.2086 54.8768 39.9983 54.8768C44.7916 54.8768 48.2338 53.573 50.4336 51.004C51.0437 50.2906 51.3789 49.3826 51.3786 48.4438V47.4358C51.3781 47.0886 51.2401 46.7557 50.9948 46.5101C50.7495 46.2644 50.4185 46.126 50.0713 46.125ZM40.0001 22.5088C41.1492 22.5088 42.287 22.7351 43.3486 23.1748C44.4102 23.6146 45.3748 24.2591 46.1873 25.0716C46.9998 25.8841 47.6443 26.8487 48.084 27.9103C48.5238 28.9719 48.7501 30.1097 48.7501 31.2588C48.7501 32.4079 48.5238 33.5457 48.084 34.6073C47.6443 35.6689 46.9998 36.6335 46.1873 37.446C45.3748 38.2585 44.4102 38.903 43.3486 39.3427C42.287 39.7825 41.1492 40.0088 40.0001 40.0088C37.6794 40.0088 35.4538 39.0869 33.8129 37.446C32.172 35.805 31.2501 33.5794 31.2501 31.2588C31.2501 28.9381 32.172 26.7125 33.8129 25.0716C35.4538 23.4307 37.6794 22.5088 40.0001 22.5088ZM40.0001 25.1338C39.1957 25.1338 38.3993 25.2922 37.6562 25.6C36.913 25.9078 36.2378 26.359 35.6691 26.9278C35.1003 27.4965 34.6491 28.1717 34.3413 28.9149C34.0335 29.658 33.8751 30.4544 33.8751 31.2588C33.8751 32.0631 34.0335 32.8596 34.3413 33.6027C34.6491 34.3458 35.1003 35.0211 35.6691 35.5898C36.2378 36.1586 36.913 36.6097 37.6562 36.9176C38.3993 37.2254 39.1957 37.3838 40.0001 37.3838C41.6245 37.3838 43.1825 36.7385 44.3311 35.5898C45.4798 34.4412 46.1251 32.8832 46.1251 31.2588C46.1251 29.6343 45.4798 28.0764 44.3311 26.9278C43.1825 25.7791 41.6245 25.1338 40.0001 25.1338Z" fill="white" />


                                                </svg>

                                                <div className="">

                                                    <div className="border-[0.3px]  border-[#407BFF]  rounded-lg  border-[#475ffd54] bg-[#1A234c] -mt-5  ">

                                                        <div className="pt-[33px] px-[17px] pb-5">

                                                            <p className=" text-base text-[#D1D3DB] font-normal">{individualdurationplanone}</p>
                                                            <h1 className="text-white text-3xl font-bold">{individualamountplanone}</h1>


                                                            <div className="mt-10">

                                                                {firstMonthPlan.map((item, index) => (

                                                                    <div key={index} className="flex gap-2  border-b-2 border-[#1A2346] mt-4 mr-[4rem]">


                                                                        <svg className="z-40 mt-1" width="17 "
                                                                            height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M7.441 10.113a.53.53 0 0 1-.365-.146l-1.67-1.614a.49.49 0 0 1 0-.706.533.533 0 0 1 .732 0l1.303 1.26 2.966-2.867a.533.533 0 0 1 .73 0c.2.193.2.513 0 .707l-3.33 3.22a.53.53 0 0 1-.366.146" fill="#fff" />
                                                                            <path d="M8.276 15.167c-.435 0-.87-.14-1.207-.42l-1.09-.907a1.1 1.1 0 0 0-.53-.187H4.261c-1.02 0-1.848-.8-1.848-1.786v-1.14a1 1 0 0 0-.193-.507l-.93-1.06a1.79 1.79 0 0 1 0-2.313l.93-1.06a1 1 0 0 0 .194-.507V4.133c0-.986.827-1.786 1.848-1.786h1.193c.145 0 .42-.1.531-.187l1.09-.907c.676-.56 1.73-.56 2.407 0l1.09.907c.11.093.386.187.53.187h1.173c1.02 0 1.848.8 1.848 1.786v1.134c0 .14.103.406.2.513l.938 1.053c.58.654.58 1.674 0 2.327l-.938 1.053a1 1 0 0 0-.2.514v1.133c0 .987-.828 1.787-1.848 1.787h-1.173c-.144 0-.42.1-.53.186l-1.09.907a1.86 1.86 0 0 1-1.207.427M4.262 3.347c-.448 0-.814.353-.814.786v1.14c0 .38-.186.867-.441 1.154l-.931 1.06a.81.81 0 0 0 0 1.02l.93 1.06c.256.293.442.773.442 1.153v1.14c0 .433.366.787.814.787h1.193c.4 0 .904.18 1.207.433l1.09.907c.282.233.779.233 1.062 0l1.09-.907a2.1 2.1 0 0 1 1.206-.433h1.173c.448 0 .814-.354.814-.787v-1.133c0-.387.186-.874.448-1.167l.938-1.053c.241-.274.241-.754 0-1.027l-.938-1.053a1.92 1.92 0 0 1-.448-1.167V4.133c0-.433-.366-.786-.814-.786H11.11c-.4 0-.903-.18-1.207-.434l-1.09-.906c-.282-.234-.779-.234-1.061 0l-1.09.913a2.13 2.13 0 0 1-1.207.427z" fill="#fff"
                                                                            />
                                                                        </svg>


                                                                        <p className="text-base font-medium text-[#fff]">{item.value}</p>

                                                                    </div>

                                                                ))}

                                                            </div>


                                                        </div>



                                                        <div className="border border-[#407BFF] rounded-10 mt-5 flex justify-center items-center w-full py-5 ">


                                                          

                                                            <button
                                                                className=" rounded-3xl font-display focus:shadow-outline w-[10rem]  bg-[#fff] p-4 py-2 font-semibold tracking-wide
            shadow-lg transition-colors delay-150 ease-in-out hover:bg-slate-300 focus:outline-none text-[#1B1687]"
                                                                onClick={() => {
                                                                    setFifthModal(true)
                                                                

                                                                }}
                                                            >
                                                                Get Insurance
                                                            </button>


                                                        </div>



                                                    </div>

                                                </div>



                                            </div>



                                            <div className="  flex flex-col items-center justify-center">
                                                <svg className="z-40" width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="40" cy="40" r="39.5" fill="#080D27" stroke="#4760FD" />
                                                    <path d="M50.0713 43.5C51.115 43.501 52.1156 43.9162 52.8533 44.6545C53.591 45.3929 54.0053 46.3939 54.0053 47.4375V48.4438C54.0053 50.0083 53.4453 51.522 52.4303 52.7103C49.6828 55.918 45.5056 57.5018 40.0001 57.5018C34.4946 57.5018 30.3191 55.918 27.5786 52.7068C26.5646 51.5191 26.0074 50.0089 26.0071 48.4473V47.4358C26.0075 46.3921 26.4224 45.3913 27.1603 44.6533C27.8983 43.9153 28.8991 43.5005 29.9428 43.5H50.0713ZM50.0713 46.125H29.9411C29.593 46.125 29.2591 46.2633 29.013 46.5095C28.7669 46.7556 28.6286 47.0894 28.6286 47.4375V48.4473C28.6286 49.3835 28.9646 50.29 29.5736 51.0023C31.7663 53.573 35.2086 54.8768 39.9983 54.8768C44.7916 54.8768 48.2338 53.573 50.4336 51.004C51.0437 50.2906 51.3789 49.3826 51.3786 48.4438V47.4358C51.3781 47.0886 51.2401 46.7557 50.9948 46.5101C50.7495 46.2644 50.4185 46.126 50.0713 46.125ZM40.0001 22.5088C41.1492 22.5088 42.287 22.7351 43.3486 23.1748C44.4102 23.6146 45.3748 24.2591 46.1873 25.0716C46.9998 25.8841 47.6443 26.8487 48.084 27.9103C48.5238 28.9719 48.7501 30.1097 48.7501 31.2588C48.7501 32.4079 48.5238 33.5457 48.084 34.6073C47.6443 35.6689 46.9998 36.6335 46.1873 37.446C45.3748 38.2585 44.4102 38.903 43.3486 39.3427C42.287 39.7825 41.1492 40.0088 40.0001 40.0088C37.6794 40.0088 35.4538 39.0869 33.8129 37.446C32.172 35.805 31.2501 33.5794 31.2501 31.2588C31.2501 28.9381 32.172 26.7125 33.8129 25.0716C35.4538 23.4307 37.6794 22.5088 40.0001 22.5088ZM40.0001 25.1338C39.1957 25.1338 38.3993 25.2922 37.6562 25.6C36.913 25.9078 36.2378 26.359 35.6691 26.9278C35.1003 27.4965 34.6491 28.1717 34.3413 28.9149C34.0335 29.658 33.8751 30.4544 33.8751 31.2588C33.8751 32.0631 34.0335 32.8596 34.3413 33.6027C34.6491 34.3458 35.1003 35.0211 35.6691 35.5898C36.2378 36.1586 36.913 36.6097 37.6562 36.9176C38.3993 37.2254 39.1957 37.3838 40.0001 37.3838C41.6245 37.3838 43.1825 36.7385 44.3311 35.5898C45.4798 34.4412 46.1251 32.8832 46.1251 31.2588C46.1251 29.6343 45.4798 28.0764 44.3311 26.9278C43.1825 25.7791 41.6245 25.1338 40.0001 25.1338Z" fill="white" />


                                                </svg>

                                                <div className="">

                                                    <div className="border-[0.3px]  border-[#407BFF]  rounded-lg  border-[#475ffd54] bg-[#1A234c] -mt-5  ">

                                                        <div className="pt-[33px] px-[17px] pb-5">

                                                            <p className=" text-base text-[#D1D3DB] font-normal">{individualdurationplantwo}</p>
                                                            <h1 className="text-white text-3xl font-bold">{individualamountplantwo}</h1>

                                                            <div className="mt-10">

                                                                {firstMonthPlan.map((item, index) => (

                                                                    <div key={index} className="flex gap-2  border-b-2 border-[#1A2346] mt-4 mr-[4rem]">


                                                                        <svg className="z-40 mt-1" width="17 "
                                                                            height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M7.441 10.113a.53.53 0 0 1-.365-.146l-1.67-1.614a.49.49 0 0 1 0-.706.533.533 0 0 1 .732 0l1.303 1.26 2.966-2.867a.533.533 0 0 1 .73 0c.2.193.2.513 0 .707l-3.33 3.22a.53.53 0 0 1-.366.146" fill="#fff" />
                                                                            <path d="M8.276 15.167c-.435 0-.87-.14-1.207-.42l-1.09-.907a1.1 1.1 0 0 0-.53-.187H4.261c-1.02 0-1.848-.8-1.848-1.786v-1.14a1 1 0 0 0-.193-.507l-.93-1.06a1.79 1.79 0 0 1 0-2.313l.93-1.06a1 1 0 0 0 .194-.507V4.133c0-.986.827-1.786 1.848-1.786h1.193c.145 0 .42-.1.531-.187l1.09-.907c.676-.56 1.73-.56 2.407 0l1.09.907c.11.093.386.187.53.187h1.173c1.02 0 1.848.8 1.848 1.786v1.134c0 .14.103.406.2.513l.938 1.053c.58.654.58 1.674 0 2.327l-.938 1.053a1 1 0 0 0-.2.514v1.133c0 .987-.828 1.787-1.848 1.787h-1.173c-.144 0-.42.1-.53.186l-1.09.907a1.86 1.86 0 0 1-1.207.427M4.262 3.347c-.448 0-.814.353-.814.786v1.14c0 .38-.186.867-.441 1.154l-.931 1.06a.81.81 0 0 0 0 1.02l.93 1.06c.256.293.442.773.442 1.153v1.14c0 .433.366.787.814.787h1.193c.4 0 .904.18 1.207.433l1.09.907c.282.233.779.233 1.062 0l1.09-.907a2.1 2.1 0 0 1 1.206-.433h1.173c.448 0 .814-.354.814-.787v-1.133c0-.387.186-.874.448-1.167l.938-1.053c.241-.274.241-.754 0-1.027l-.938-1.053a1.92 1.92 0 0 1-.448-1.167V4.133c0-.433-.366-.786-.814-.786H11.11c-.4 0-.903-.18-1.207-.434l-1.09-.906c-.282-.234-.779-.234-1.061 0l-1.09.913a2.13 2.13 0 0 1-1.207.427z" fill="#fff"
                                                                            />
                                                                        </svg>


                                                                        <p className="text-base font-medium text-[#fff]">{item.value}</p>


                                                                    </div>
                                                                ))}




                                                            </div>


                                                        </div>



                                                        <div className="border border-[#407BFF] rounded-10 mt-5 flex justify-center items-center w-full py-5 ">


                                                            {/* <div className="">

                                                                {children}

                                                            </div> */}


                                                            <button
                                                                className=" rounded-3xl font-display focus:shadow-outline w-[10rem]  bg-[#fff] p-4 py-2 font-semibold tracking-wide
            shadow-lg transition-colors delay-150 ease-in-out hover:bg-slate-300 focus:outline-none text-[#1B1687]"
                                                                onClick={() => {
                                                                    setFifthModal(true)
                                                                 
                                                                }}
                                                            >
                                                                Get Insurance
                                                            </button>



                                                        </div>



                                                    </div>


                                                </div>



                                            </div>






                                        </div>

                                        <div className="flex w-full justify-center items-center mt-10">

                                            <p className="text-grey-600">Terms & Conditions Apply:</p>

                                            <Link
                                                href="/Individual-Plan/"
                                            >

                                                <p
                                                    className="text-white"
                                                >
                                                    libertyassured.com
                                                </p>

                                            </Link>

                                        </div>
                                    </TabsContent>






                                    {/* FAMILY PLAN */}

                                    <TabsContent
                                        className="mt-1 rounded-10  px-6 py-10 lg:px-0 lg:py-4"
                                        value="Family"
                                    >



                                        <div className="w-full flex gap-[1rem] items-center justify-center">


                                            <div className="  flex flex-col items-center justify-center">
                                                <svg className="z-40" width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="40" cy="40" r="39.5" fill="#080D27" stroke="#4760FD" />
                                                    <path d="M50.0713 43.5C51.115 43.501 52.1156 43.9162 52.8533 44.6545C53.591 45.3929 54.0053 46.3939 54.0053 47.4375V48.4438C54.0053 50.0083 53.4453 51.522 52.4303 52.7103C49.6828 55.918 45.5056 57.5018 40.0001 57.5018C34.4946 57.5018 30.3191 55.918 27.5786 52.7068C26.5646 51.5191 26.0074 50.0089 26.0071 48.4473V47.4358C26.0075 46.3921 26.4224 45.3913 27.1603 44.6533C27.8983 43.9153 28.8991 43.5005 29.9428 43.5H50.0713ZM50.0713 46.125H29.9411C29.593 46.125 29.2591 46.2633 29.013 46.5095C28.7669 46.7556 28.6286 47.0894 28.6286 47.4375V48.4473C28.6286 49.3835 28.9646 50.29 29.5736 51.0023C31.7663 53.573 35.2086 54.8768 39.9983 54.8768C44.7916 54.8768 48.2338 53.573 50.4336 51.004C51.0437 50.2906 51.3789 49.3826 51.3786 48.4438V47.4358C51.3781 47.0886 51.2401 46.7557 50.9948 46.5101C50.7495 46.2644 50.4185 46.126 50.0713 46.125ZM40.0001 22.5088C41.1492 22.5088 42.287 22.7351 43.3486 23.1748C44.4102 23.6146 45.3748 24.2591 46.1873 25.0716C46.9998 25.8841 47.6443 26.8487 48.084 27.9103C48.5238 28.9719 48.7501 30.1097 48.7501 31.2588C48.7501 32.4079 48.5238 33.5457 48.084 34.6073C47.6443 35.6689 46.9998 36.6335 46.1873 37.446C45.3748 38.2585 44.4102 38.903 43.3486 39.3427C42.287 39.7825 41.1492 40.0088 40.0001 40.0088C37.6794 40.0088 35.4538 39.0869 33.8129 37.446C32.172 35.805 31.2501 33.5794 31.2501 31.2588C31.2501 28.9381 32.172 26.7125 33.8129 25.0716C35.4538 23.4307 37.6794 22.5088 40.0001 22.5088ZM40.0001 25.1338C39.1957 25.1338 38.3993 25.2922 37.6562 25.6C36.913 25.9078 36.2378 26.359 35.6691 26.9278C35.1003 27.4965 34.6491 28.1717 34.3413 28.9149C34.0335 29.658 33.8751 30.4544 33.8751 31.2588C33.8751 32.0631 34.0335 32.8596 34.3413 33.6027C34.6491 34.3458 35.1003 35.0211 35.6691 35.5898C36.2378 36.1586 36.913 36.6097 37.6562 36.9176C38.3993 37.2254 39.1957 37.3838 40.0001 37.3838C41.6245 37.3838 43.1825 36.7385 44.3311 35.5898C45.4798 34.4412 46.1251 32.8832 46.1251 31.2588C46.1251 29.6343 45.4798 28.0764 44.3311 26.9278C43.1825 25.7791 41.6245 25.1338 40.0001 25.1338Z" fill="white" />


                                                </svg>

                                                <div className="">

                                                    <div className="border-[0.3px]  border-[#407BFF]  rounded-lg  border-[#475ffd54] bg-[#1A234c] -mt-5  ">

                                                        <div className="pt-[33px] px-[17px] pb-5">

                                                            <p className=" text-base text-[#D1D3DB] font-normal">{familydurationplanone}</p>
                                                            <h1 className="text-white text-3xl font-bold">{familyamountplanone}</h1>

                                                            <div className="mt-10">

                                                                {familyMonthPlan.map((item, index) => (

                                                                    <div key={index} className="flex gap-2  border-b-2 border-[#1A2346] mt-4 mr-[4rem]">


                                                                        <svg className="z-40 mt-1" width="17 "
                                                                            height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M7.441 10.113a.53.53 0 0 1-.365-.146l-1.67-1.614a.49.49 0 0 1 0-.706.533.533 0 0 1 .732 0l1.303 1.26 2.966-2.867a.533.533 0 0 1 .73 0c.2.193.2.513 0 .707l-3.33 3.22a.53.53 0 0 1-.366.146" fill="#fff" />
                                                                            <path d="M8.276 15.167c-.435 0-.87-.14-1.207-.42l-1.09-.907a1.1 1.1 0 0 0-.53-.187H4.261c-1.02 0-1.848-.8-1.848-1.786v-1.14a1 1 0 0 0-.193-.507l-.93-1.06a1.79 1.79 0 0 1 0-2.313l.93-1.06a1 1 0 0 0 .194-.507V4.133c0-.986.827-1.786 1.848-1.786h1.193c.145 0 .42-.1.531-.187l1.09-.907c.676-.56 1.73-.56 2.407 0l1.09.907c.11.093.386.187.53.187h1.173c1.02 0 1.848.8 1.848 1.786v1.134c0 .14.103.406.2.513l.938 1.053c.58.654.58 1.674 0 2.327l-.938 1.053a1 1 0 0 0-.2.514v1.133c0 .987-.828 1.787-1.848 1.787h-1.173c-.144 0-.42.1-.53.186l-1.09.907a1.86 1.86 0 0 1-1.207.427M4.262 3.347c-.448 0-.814.353-.814.786v1.14c0 .38-.186.867-.441 1.154l-.931 1.06a.81.81 0 0 0 0 1.02l.93 1.06c.256.293.442.773.442 1.153v1.14c0 .433.366.787.814.787h1.193c.4 0 .904.18 1.207.433l1.09.907c.282.233.779.233 1.062 0l1.09-.907a2.1 2.1 0 0 1 1.206-.433h1.173c.448 0 .814-.354.814-.787v-1.133c0-.387.186-.874.448-1.167l.938-1.053c.241-.274.241-.754 0-1.027l-.938-1.053a1.92 1.92 0 0 1-.448-1.167V4.133c0-.433-.366-.786-.814-.786H11.11c-.4 0-.903-.18-1.207-.434l-1.09-.906c-.282-.234-.779-.234-1.061 0l-1.09.913a2.13 2.13 0 0 1-1.207.427z" fill="#fff"
                                                                            />
                                                                        </svg>


                                                                        <p className="text-base font-medium text-[#fff]">{item.value}</p>




                                                                    </div>




                                                                ))}




                                                            </div>


                                                        </div>



                                                        <div className="border border-[#407BFF] rounded-10 mt-5 flex justify-center items-center w-full py-5 ">



                                                            {/* <div className="">

                                                                {children}

                                                            </div> */}

                                                            <button
                                                                className=" rounded-3xl font-display focus:shadow-outline w-[10rem]  bg-[#fff] p-4 py-2 font-semibold tracking-wide
            shadow-lg transition-colors delay-150 ease-in-out hover:bg-slate-300 focus:outline-none text-[#1B1687]"
                                                                onClick={() => {
                                                                    setFifthModal(true)
                                                                    

                                                                }}
                                                            >
                                                                Get Insurance
                                                            </button>





                                                        </div>



                                                    </div>



                                                </div>



                                            </div>



                                            <div className="  flex flex-col items-center justify-center">
                                                <svg className="z-40" width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="40" cy="40" r="39.5" fill="#080D27" stroke="#4760FD" />
                                                    <path d="M50.0713 43.5C51.115 43.501 52.1156 43.9162 52.8533 44.6545C53.591 45.3929 54.0053 46.3939 54.0053 47.4375V48.4438C54.0053 50.0083 53.4453 51.522 52.4303 52.7103C49.6828 55.918 45.5056 57.5018 40.0001 57.5018C34.4946 57.5018 30.3191 55.918 27.5786 52.7068C26.5646 51.5191 26.0074 50.0089 26.0071 48.4473V47.4358C26.0075 46.3921 26.4224 45.3913 27.1603 44.6533C27.8983 43.9153 28.8991 43.5005 29.9428 43.5H50.0713ZM50.0713 46.125H29.9411C29.593 46.125 29.2591 46.2633 29.013 46.5095C28.7669 46.7556 28.6286 47.0894 28.6286 47.4375V48.4473C28.6286 49.3835 28.9646 50.29 29.5736 51.0023C31.7663 53.573 35.2086 54.8768 39.9983 54.8768C44.7916 54.8768 48.2338 53.573 50.4336 51.004C51.0437 50.2906 51.3789 49.3826 51.3786 48.4438V47.4358C51.3781 47.0886 51.2401 46.7557 50.9948 46.5101C50.7495 46.2644 50.4185 46.126 50.0713 46.125ZM40.0001 22.5088C41.1492 22.5088 42.287 22.7351 43.3486 23.1748C44.4102 23.6146 45.3748 24.2591 46.1873 25.0716C46.9998 25.8841 47.6443 26.8487 48.084 27.9103C48.5238 28.9719 48.7501 30.1097 48.7501 31.2588C48.7501 32.4079 48.5238 33.5457 48.084 34.6073C47.6443 35.6689 46.9998 36.6335 46.1873 37.446C45.3748 38.2585 44.4102 38.903 43.3486 39.3427C42.287 39.7825 41.1492 40.0088 40.0001 40.0088C37.6794 40.0088 35.4538 39.0869 33.8129 37.446C32.172 35.805 31.2501 33.5794 31.2501 31.2588C31.2501 28.9381 32.172 26.7125 33.8129 25.0716C35.4538 23.4307 37.6794 22.5088 40.0001 22.5088ZM40.0001 25.1338C39.1957 25.1338 38.3993 25.2922 37.6562 25.6C36.913 25.9078 36.2378 26.359 35.6691 26.9278C35.1003 27.4965 34.6491 28.1717 34.3413 28.9149C34.0335 29.658 33.8751 30.4544 33.8751 31.2588C33.8751 32.0631 34.0335 32.8596 34.3413 33.6027C34.6491 34.3458 35.1003 35.0211 35.6691 35.5898C36.2378 36.1586 36.913 36.6097 37.6562 36.9176C38.3993 37.2254 39.1957 37.3838 40.0001 37.3838C41.6245 37.3838 43.1825 36.7385 44.3311 35.5898C45.4798 34.4412 46.1251 32.8832 46.1251 31.2588C46.1251 29.6343 45.4798 28.0764 44.3311 26.9278C43.1825 25.7791 41.6245 25.1338 40.0001 25.1338Z" fill="white" />


                                                </svg>

                                                <div className="">

                                                    <div className="border-[0.3px]  border-[#407BFF]  rounded-lg  border-[#475ffd54] bg-[#1A234c] -mt-5  ">

                                                        <div className="pt-[33px] px-[17px] pb-5">

                                                            <p className=" text-base text-[#D1D3DB] font-normal">{familydurationplantwo}</p>
                                                            <h1 className="text-white text-3xl font-bold">{familyamountplantwo}</h1>

                                                            <div className="mt-10">

                                                                {familyMonthPlan.map((item, index) => (

                                                                    <div key={index} className="flex gap-2  border-b-2 border-[#1A2346] mt-4 mr-[4rem]">


                                                                        <svg className="z-40 mt-1" width="17 "
                                                                            height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M7.441 10.113a.53.53 0 0 1-.365-.146l-1.67-1.614a.49.49 0 0 1 0-.706.533.533 0 0 1 .732 0l1.303 1.26 2.966-2.867a.533.533 0 0 1 .73 0c.2.193.2.513 0 .707l-3.33 3.22a.53.53 0 0 1-.366.146" fill="#fff" />
                                                                            <path d="M8.276 15.167c-.435 0-.87-.14-1.207-.42l-1.09-.907a1.1 1.1 0 0 0-.53-.187H4.261c-1.02 0-1.848-.8-1.848-1.786v-1.14a1 1 0 0 0-.193-.507l-.93-1.06a1.79 1.79 0 0 1 0-2.313l.93-1.06a1 1 0 0 0 .194-.507V4.133c0-.986.827-1.786 1.848-1.786h1.193c.145 0 .42-.1.531-.187l1.09-.907c.676-.56 1.73-.56 2.407 0l1.09.907c.11.093.386.187.53.187h1.173c1.02 0 1.848.8 1.848 1.786v1.134c0 .14.103.406.2.513l.938 1.053c.58.654.58 1.674 0 2.327l-.938 1.053a1 1 0 0 0-.2.514v1.133c0 .987-.828 1.787-1.848 1.787h-1.173c-.144 0-.42.1-.53.186l-1.09.907a1.86 1.86 0 0 1-1.207.427M4.262 3.347c-.448 0-.814.353-.814.786v1.14c0 .38-.186.867-.441 1.154l-.931 1.06a.81.81 0 0 0 0 1.02l.93 1.06c.256.293.442.773.442 1.153v1.14c0 .433.366.787.814.787h1.193c.4 0 .904.18 1.207.433l1.09.907c.282.233.779.233 1.062 0l1.09-.907a2.1 2.1 0 0 1 1.206-.433h1.173c.448 0 .814-.354.814-.787v-1.133c0-.387.186-.874.448-1.167l.938-1.053c.241-.274.241-.754 0-1.027l-.938-1.053a1.92 1.92 0 0 1-.448-1.167V4.133c0-.433-.366-.786-.814-.786H11.11c-.4 0-.903-.18-1.207-.434l-1.09-.906c-.282-.234-.779-.234-1.061 0l-1.09.913a2.13 2.13 0 0 1-1.207.427z" fill="#fff"
                                                                            />
                                                                        </svg>


                                                                        <p className="text-base font-medium text-[#fff]">{item.value}</p>




                                                                    </div>

                                                                ))}

                                                            </div>
                                                        </div>



                                                        <div className="border border-[#407BFF] rounded-10 mt-5 flex justify-center items-center w-full py-5 ">


                                                            {/* <div className="">

                                                                {children}

                                                            </div> */}


                                                            <button
                                                                className=" rounded-3xl font-display focus:shadow-outline w-[10rem]  bg-[#fff] p-4 py-2 font-semibold tracking-wide
            shadow-lg transition-colors delay-150 ease-in-out hover:bg-slate-300 focus:outline-none text-[#1B1687]"
                                                                onClick={() => {
                                                                    setFifthModal(true)
                                                                    

                                                                }}
                                                            >
                                                                Get Insurance
                                                            </button>


                                                            {/* <button
                                                                className=" rounded-3xl font-display focus:shadow-outline w-[10rem]  bg-[#fff] p-4 py-2 font-semibold tracking-wide
shadow-lg transition-colors delay-150 ease-in-out hover:bg-slate-300 focus:outline-none text-[#1B1687]"
                                                            >
                                                                Get Insurance
                                                            </button> */}

                                                        </div>



                                                    </div>


                                                </div>



                                            </div>


                                        </div>








                                        <div className="flex w-full justify-center items-center mt-10 gap-2">

                                            <p className="text-grey-600">Terms & Conditions Apply:</p>

                                            <Link
                                                href="/Individual-Plan/"
                                            >

                                                <p
                                                    className="text-white"
                                                >
                                                    libertyassured.com
                                                </p>

                                            </Link>

                                        </div>



                                    </TabsContent>


                                </Tabs>

                            </div>




                        </DialogBody>


                    </DialogContent>


                </Dialog>
            </ClientOnly>




            {fifthModal && 

<SixMonthIndividualPlanModal

heading="6-Month Individual Plan"
description="You have selected a 6-Month health cover."
subdescription="A monthly premium of "
amount="₦3,000"
isSixMonthIndividualPlanModalOpen={fifthModal}
setSixMonthIndividualPlanModal={setFifthModal}
 setSeventhModal={setSixthModal}





/>
 }

{sixthModal && 



<DeductionModal


heading="Deduction Acknowledgment"

description={
  <>
    Kindly know that a <span style={{ color: "white" }}>₦3,000 </span>

    monthly premium will be auto-deducted from your salary for your health insurance package
  </>
}

subdescription="This also qualifies you for the lifestyle reward of N5m"
isDeductionModalOpen={sixthModal}
setDeductionModal={setSixthModal}
 setSeventhModal={setSeventhModal}
 



/>

}


{seventhModal && 

<AppSuccessfulModal

heading="Application Successful"
description="Your insurance application has been received and is being processed. You will soon receive an insurance code for use at clinics, pharmarcies, or hospitals"
subdescription="Thank you for choosing Liberty life."
isAppSuccessfulModalOpen={seventhModal}
setAppSuccessfulModal={setSeventhModal}

/>


}




        </div >





    )


}

export default IndividualModal









