"use client"
import React, { ReactNode } from 'react'
import { ClientOnly, Dialog, DialogContent } from "@/components/core";
import { DialogBody } from '@/components/core/DialogClone';




interface UseBooleanStateControlProps {
    isDeductionModalOpen: boolean;
    setDeductionModal: React.Dispatch<
        React.SetStateAction<boolean>
    >;

    setSeventhModal: React.Dispatch<React.SetStateAction<boolean>>

    heading: string;
    description: ReactNode;
    subdescription: string;
    children?: React.ReactNode;


}


function DeductionModal({

    isDeductionModalOpen,
    setDeductionModal,
    setSeventhModal,
    heading,
    description,
    subdescription,



}: UseBooleanStateControlProps) {


    return (

        <div className="rounded-xl">



            <ClientOnly>

                <Dialog open={isDeductionModalOpen}
                    onOpenChange={setDeductionModal}>

                    <DialogContent className="!overflow-hidden border border-[#407BFF]">




                        <DialogBody className="bg-[#141B3f] w-full  border-[0.01px] border-[#407BFF]">

                            <div className="py-1">

                                <div className=''>

                                    <div className="flex items-center justify-center w-full">

                                        <svg
                                            width={101}
                                            height={101}
                                            viewBox="0 0 101 101"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            
                                        >
                                            <rect width={100.32} height={100.32} rx={50.16} fill="#fff" />
                                            <path
                                                d="M47 34a3 3 0 0 1 6 0v22a3 3 0 0 1-6 0zm0 32a3 3 0 1 1 6 0 3 3 0 0 1-6 0Z"
                                                stroke="#1B1687"
                                                strokeWidth={2}
                                            />
                                        </svg>

                                    </div>

                                    <div className="flex justify-center items-center w-full mt-[1rem]">

                                        <p className="text-xl  'font-DMSans' font-semibold text-[#fff]">{heading}</p>

                                    </div>

                                    <div className="text-center px-[3rem] mt-[0.65rem] ">

                                        <p className="text-xs text-[#94a3b8] font-normal 'font-DMSans' ">{description}</p>

                                    </div>


                                    <div className='bg-[#272D4A] mt-[3.5rem] w-full flex items-center justify-center'>

                                        <div className=''>

                                            <p className="text-[#fff] py-[1rem] text-xs font-medium 'font-DMSans' ">{subdescription}</p>

                                        </div>



                                    </div>


                                </div>



                                <div className='w-full flex justify-center items-center gap-[1rem] mt-[1rem] text-sm'>
                                    <button
                                        className="rounded-3xl border-[0.3px] text-[#fff]  py-[0.9rem] w-[10rem] shadow-lg transition-colors delay-150 ease-in-out focus:outline-none"
                                        onClick={() => {
                                            setDeductionModal(false);

                                        }}
                                    >
                                        Decline
                                    </button>

                                    <button
                                        className="rounded-3xl bg-[#fff] text-[#1B1687]  py-[0.9rem] w-[10rem] shadow-lg transition-colors delay-150 ease-in-out focus:outline-none"
                                        onClick={() => {

                                            setSeventhModal(true);

                                        }}
                                    >
                                        Agree & Proceed
                                    </button>
                                </div>


                            </div>

                        </DialogBody>




                    </DialogContent>


                </Dialog>
            </ClientOnly>


        </div>





    )


}

export default DeductionModal;









