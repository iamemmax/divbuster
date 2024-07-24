"use client"
import React from 'react'
import { Button, ClientOnly, Dialog, DialogBody, DialogClose, DialogContent, DialogHeader, DialogTitle, RadioGroup, RadioGroupItem } from "@/components/core";
import CopyIcon2 from '../../icons/CopyIcon2';
import { Label } from '@radix-ui/react-label';



interface UseBooleanStateControlProps {
    isSelectPlanModalOpen: boolean;
    setSelectPlanModal: React.Dispatch<React.SetStateAction<boolean>>

    heading: string;
    subsection: string;
    children?: React.ReactNode;
}
function SelectPlanModal({

    isSelectPlanModalOpen,
    setSelectPlanModal,

    heading,
    subsection

}: UseBooleanStateControlProps) {

    interface data {
        item: string
        value: string
    }


    const PlanDetails: data[] = [
        {
            item: "Account name",
            value: "Liberty assured"
        },
        {
            item: "Account no",
            value: "2029471942"
        },
        {
            item: "Bank name",
            value: "VFD Microfinance Bank"
        },
    ]

    return (

        <div className="rounded-xl">

            <ClientOnly>
                <Dialog open={isSelectPlanModalOpen}>
                    <DialogContent className="!overflow-hidden">
                        <DialogHeader className="bg-[#1B1687] ">
                            <DialogTitle className="text-[#fff]">
                                {heading}
                            </DialogTitle>
                            <DialogClose className="rounded-10 bg-transparent border-[0.3px] border-[#407BFF]">
                                <button onClick={() => setSelectPlanModal(false)}>close</button>
                            </DialogClose>
                        </DialogHeader>
                        <DialogBody className="bg-[#141B3f]">
                            <article className=' text-sm text-white'>
                                <p className='text-white text-sm'>{subsection}</p>
                                <div className='text-[#FFFFFFCC] text-base gap-y-3 mt-8'>
                                    <RadioGroup defaultValue="comfortable">
                                        <div className="flex items-center space-x-2 bg-[#FFFFFF1A] rounded-10 py-3 pl-4">
                                            <RadioGroupItem value="default" id="r1" />
                                            <Label htmlFor="r1">1 Month Plan -  <span className='text-white font-bold text-xl'>₦3,000</span></Label>
                                        </div>
                                        <div className="flex items-center space-x-2 bg-[#FFFFFF1A] rounded-10 py-3 pl-4">
                                            <RadioGroupItem value="comfortable" id="r2" />
                                            <Label htmlFor="r2">6 Months Plan -  <span className='text-white font-bold text-xl'>₦18,000</span></Label>
                                        </div>
                                        <div className="flex items-center space-x-2 bg-[#FFFFFF1A] rounded-10 py-3 pl-4">
                                            <RadioGroupItem value="compact" id="r3" />
                                            <Label htmlFor="r3">12 Months Plan -  <span className='text-white font-bold text-xl'>₦36,000</span></Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                                <div className='flex justify-center items-center gap-x-2 py-3'>
                                    <div className=' border-dashed border border-[#9F9F9F] w-[110px] h-[1px]'></div>
                                    <div className='text-sm'>Payment Option</div>
                                    <div className=' border-dashed border border-[#9F9F9F] w-[110px] h-[1px]'></div>
                                </div>
                                <div className='bg-[#FFFFFF1A] rounded-2xl pt-4 pb-5 px-6 mt-5'>
                                    <p className='pb-4'>Make payment via transfer</p>
                                    <div className='border-b-[0.3px] border-[#FFFFFF1A]'></div>
                                    <article className='flex justify-between'>
                                        <div className='grid grid-cols-2 py-5 gap-5 '>
                                            {
                                                PlanDetails.map((detail, index) => (
                                                    <div key={index} className='gap-x-4'>
                                                        <p className='text-[#FFFFFF99] text-xs'>{detail.item}</p>
                                                        <p className='font-sans font-medium'>{detail.value}</p>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                        <div className='mt-5'>
                                            <CopyIcon2 />
                                        </div>
                                    </article>
                                </div>
                                <div className='mt-4'>
                                    <RadioGroup>
                                        <div className="flex items-center space-x-2 bg-[#FFFFFF1A] rounded-10 py-3 pl-4">
                                            <RadioGroupItem value="default" id="r1" />
                                            <Label htmlFor="r1" className='flex justify-between gap-20'>
                                                <div>Main wallet Balance:</div>
                                                <div className='font-medium'> ₦100,000.00</div>
                                            </Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                                
                            </article>
                        </DialogBody>

                    </DialogContent>

                </Dialog>

            </ClientOnly>


        </div >





    )


}

export default SelectPlanModal;


