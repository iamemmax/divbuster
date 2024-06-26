"use client"


import { ClientOnly, Dialog, DialogBody, DialogClose, DialogContent, DialogHeader, DialogTitle } from "@/components/core";

import { useRouter } from "next/navigation";
import { useRemitaDetailsData } from "@/app/(auth)/(onboarding)/misc/api/getRemitaDetailsRequest";
import Image from "next/image";




interface UseBooleanStateControlProps {
  setNonRemitaPaymentModal: React.Dispatch<React.SetStateAction<boolean>>


  // setSixthNonRemitaPaymentModal: React.Dispatch<React.SetStateAction<boolean>>
  // setSixthNonRemitaPaymentModal: React.Dispatch<React.SetStateAction<boolean>>
  setSixthNonRemitaPaymentModal: React.Dispatch<React.SetStateAction<boolean>>


  heading: string;
  subheading: string;
  description: string;
  phonedial: string;
  phonecode: string;
  amount: string;
  paymenttrans: string;
  accountname: string;
  accounttitle: string;
  accountno: string;
  accountnumber: string;
  bankname: string;
  banktitle: string;
  closeButtonReplacement?: React.ReactNode;
  children?: React.ReactNode;


}


function NonRemitaPaymentModal({

  // isNonRemitaPaymentModalOpen,
  setNonRemitaPaymentModal,
  setSixthNonRemitaPaymentModal,

  heading,
  subheading,
  amount,
  description,
  phonedial,
  phonecode,
  paymenttrans,
  accountname,
  accounttitle,
  bankname,
  banktitle,
  accountno,
  accountnumber



}: UseBooleanStateControlProps) {



  const router = useRouter();



  const handleClose = () => {

    setNonRemitaPaymentModal(false);

    router.back();

  }






  return (

    <div className="rounded-xl">



      <ClientOnly>


        <Dialog
          //@ts-ignore
          open={setNonRemitaPaymentModal}
          onOpenChange={setNonRemitaPaymentModal}>

          <DialogContent className="!overflow-hidden">



            <DialogHeader className="bg-[#1B1687] ">

              <DialogTitle className="text-[#fff]">
                {heading}
              </DialogTitle>

              <DialogClose className="rounded-full">
                <button onClick={handleClose}>close</button>
              </DialogClose>


            </DialogHeader>

            <DialogBody className="bg-[#141B3f] w-full">

              <div className="py-1">

                <div className="text-[#fff] font-light text-sm 'font-DMSans'">
                  {subheading}
                </div>



                <div className="my-5 bg-[#2B3151] text-[#fff]  rounded-lg text-center">

                  <p className="text-sm   py-[0.6rem] 'font-DMSans'">{description}</p>
                  <p className="text-2xl  py-[0.6rem] 'font-DMSans' font-bold">{amount}</p>

                </div>

                <div className="mt-[1rem]">

                  <p className="text-sm text-[#fff]">{phonedial}</p>

                </div>

                <div className=" bg-[#2B3151] rounded-lg text-center mt-[1rem]">

                  <p className=" text-[#fff] 'font-DMSans' font-medium text-xl py-[0.9rem]">{phonecode}</p>


                </div>

                <div className=" w-full bg-[#2B3151] rounded-lg  mt-[1rem] px-[1rem] py-[1rem]">

                  <p className=" text-[#fff] 'font-DMSans' font-normal py-[0.9rem] text-sm">{paymenttrans}</p>

                  <div className=" h-[0.6px] w-full bg-[#646464] "></div>

                  <div className="flex items-center justify-between w-full">

                    <div className="mt-[0.8rem]">

                      <p className="text-[#fff] text-xs">{accountname}</p>
                      <p className="font-medium text-[#fff] text-base">{accounttitle}</p>

                    </div>


                    <div className="mt-[0.8rem]">

                      <p className="text-[#fff] text-xs">{accountno}</p>

                      <div className="flex gap-[2rem]">

                        <p className="font-medium text-[#fff] text-base">{accountnumber}</p>

                        <svg
                          width={20}
                          height={20}
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"

                        >
                          <path
                            d="M9.25 18.458h-3.5c-1.567 0-2.587-.35-3.223-.985-.636-.636-.985-1.656-.985-3.223v-3.5c0-1.567.35-2.586.985-3.222.636-.636 1.656-.986 3.223-.986h3.5c1.567 0 2.586.35 3.222.986s.986 1.655.986 3.222v3.5c0 1.567-.35 2.587-.986 3.223s-1.655.985-3.222.985ZM5.75 6.792c-1.321 0-2.362.217-3.052.907-.689.689-.906 1.73-.906 3.051v3.5c0 1.321.217 2.362.906 3.052.69.689 1.73.906 3.052.906h3.5c1.321 0 2.362-.217 3.051-.906s.907-1.73.907-3.052v-3.5c0-1.321-.217-2.362-.907-3.051-.689-.69-1.73-.907-3.051-.907z"
                            fill="#fff"
                            stroke="#fff"
                          />
                          <path
                            d="M13.458 12.708v.5h.792c1.321 0 2.362-.217 3.051-.906s.907-1.73.907-3.052v-3.5c0-1.321-.217-2.362-.907-3.051-.689-.69-1.73-.907-3.051-.907h-3.5c-1.321 0-2.362.217-3.052.907-.689.689-.907 1.73-.907 3.051v.792H9.25c1.567 0 2.586.35 3.222.986s.986 1.655.986 3.222zm.792.75h-.917a.12.12 0 0 1-.087-.037.12.12 0 0 1-.038-.088V10.75c0-1.321-.217-2.362-.907-3.051-.689-.69-1.73-.907-3.051-.907H6.667a.12.12 0 0 1-.088-.038.12.12 0 0 1-.037-.087V5.75c0-1.567.35-2.586.985-3.222.636-.636 1.656-.986 3.223-.986h3.5c1.567 0 2.586.35 3.222.986s.986 1.655.986 3.222v3.5c0 1.567-.35 2.587-.986 3.223s-1.655.985-3.222.985Z"
                            fill="#fff"
                            stroke="#fff"
                          />
                        </svg>

                      </div>



                    </div>



                  </div>




                  <div className="mt-[1rem]">

                    <p className="text-[#fff]">{bankname}</p>
                    <p className="text-[#fff]">{banktitle}</p>

                  </div>



                </div>



                <div className="relative">
                  <button
                    className="mt-[2rem] font-display focus:shadow-outline w-full rounded-2xl bg-[#080D27] p-4 py-3 font-semibold tracking-wide
        shadow-lg transition-colors delay-150 ease-in-out hover:bg-slate-300 focus:outline-none text-[#1B1687] mb-[3rem]"
                  >
                    <Image
                      alt=""
                      className="absolute left-[25%] mt-[0.1rem]"
                      height={18}
                      width={18}
                      src='/images/landing-page/pay.png'
                    />
                    <p>Pay with PayStack</p>
                  </button>
                </div>

                <button
                  className="font-display focus:shadow-outline w-full rounded-2xl bg-[#fff] p-4 py-3 font-semibold tracking-wide
        shadow-lg transition-colors delay-150 ease-in-out hover:bg-slate-300 focus:outline-none text-[#1B1687] mb-[3rem]"

                  onClick={() => {
                    setSixthNonRemitaPaymentModal(true);
                    setNonRemitaPaymentModal(false);



                  }}
                >
                  Continue
                </button>



              </div>

            </DialogBody>


          </DialogContent>


        </Dialog>
      </ClientOnly>


    </div>





  )


}

export default NonRemitaPaymentModal






