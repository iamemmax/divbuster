"use client"
import React from 'react'
import { Button, ClientOnly, Dialog, DialogBody, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/core";




interface UseBooleanStateControlProps {
  isSixMonthIndividualPlanModalOpen: boolean;
  setSixMonthIndividualPlanModal: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  heading: string;
  description: string;
  subdescription: string;
  children?: React.ReactNode;
  amount: string;


}


function SixMonthIndividualPlanModal({

  isSixMonthIndividualPlanModalOpen,
  setSixMonthIndividualPlanModal,
  heading,
  description,
  subdescription,
  children,
  amount

}: UseBooleanStateControlProps) {


  return (

    <div className="rounded-xl">



      <ClientOnly>

        <Dialog open={isSixMonthIndividualPlanModalOpen}
          onOpenChange={setSixMonthIndividualPlanModal}>

          <DialogContent className="!overflow-hidden !border !border-[#407BFF]">




            <DialogBody className="bg-[#141B3f] w-full  border-[0.01px] border-[#407BFF]">

              <div className="py-1">

                <div className=''>

                  <div className="flex items-center justify-center w-full">
                    <svg width="101" height="101" viewBox="0 0 101 101" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="100.32" height="100.32" rx="50.16" fill="#fff" /><path d="M47 34a3 3 0 0 1 6 0v22a3 3 0 0 1-6 0zm0 32a3 3 0 1 1 6 0 3 3 0 0 1-6 0Z" stroke="#1B1687" stroke-width="2" />

                    </svg>
                  </div>

                  <div className="flex justify-center items-center w-full mt-[1rem]">

                    <p className="text-xl  'font-DMSans' font-semibold text-[#fff]">{heading}</p>

                  </div>

                  <div className="w-full flex justify-center items-center">

                    <p className="text-sm text-[#94a3b8] font-normal 'font-DMSans' ">{description}</p>

                  </div>

                  <div className="w-full flex items-center justify-center gap-[0.3rem]" >

                    <p className=" text-sm font-normal  text-[#94a3b8]  'font-DMSans'">{subdescription}</p>
                    <p className='text-[#fff]'>{amount}</p>

                  </div>


                  <div className=''>

                    <div className="">

                      {children} 

                    </div>

                   

                  </div>


                </div>


              </div>

            </DialogBody>


          </DialogContent>


        </Dialog>
      </ClientOnly>


    </div>





  )


}

export default SixMonthIndividualPlanModal









