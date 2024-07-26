"use client"
import React from 'react'
import { Button, ClientOnly, Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from "@/components/core";
import CopyIcon2 from '../../icons/CopyIcon2';
import { SuccessIcon } from '../../icons';
import { DialogBody } from '@/components/core/DialogClone';



interface UseBooleanStateControlProps {
    isSuccessPaymentModalOpen: boolean;
    setSuccessPaymentModal: React.Dispatch<React.SetStateAction<boolean>>

    heading: string;
    subsection: string;
    children?: React.ReactNode;
}
function SuccessPaymentModal({

    isSuccessPaymentModalOpen,
    setSuccessPaymentModal,

    subsection

}: UseBooleanStateControlProps) {

    return (

        <div className="rounded-xl">

            <ClientOnly>

                <Dialog open={isSuccessPaymentModalOpen}>

                    <DialogContent className="!overflow-hidden">

                        <DialogBody className="bg-[#141B3f]">
                            <article className=' text-sm text-white font-sans'>
                                <div className='flex justify-center items-center'><SuccessIcon /></div>
                                <div className='px-11 mt-8'>
                                <p className='text-white text-xl text-center'>{subsection}</p>
                                <p className='text-[#FFFFFFCC] text-xs text-center mt-1'>Your insurance application for Olowokurube Ajankau has been received and is being processed An insurance code for use at clinics, pharmacies, or hospitals will be sent via email to the beneficiary.</p>
                                </div>
                                <div className='bg-[#FFFFFF1A] w-full py-3 font-medium text-center mt-5'>Thank you for choosing Liberty Life.</div>
                                <div className='flex justify-center mt-4'>
                                <Button className='bg-white text-[#1B1687] text-sm py-3.5 px-32 rounded-[20px]' onClick={() => setSuccessPaymentModal(false)}>Done</Button>  
                                </div>
                            </article>
                        </DialogBody>

                    </DialogContent>

                </Dialog>

            </ClientOnly>


        </div>





    )


}

export default SuccessPaymentModal;


