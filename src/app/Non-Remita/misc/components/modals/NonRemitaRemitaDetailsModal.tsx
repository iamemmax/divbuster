"use client"


import { ClientOnly, Dialog, DialogBody, DialogClose, DialogContent, DialogHeader, DialogTitle } from "@/components/core";

// import DisplayedRemitaDetails from "../DisplayedRemitaDetails";
// import OTPInput from "../OtpInput";
import { useRouter } from "next/navigation";
import { useRemitaDetailsData } from "@/app/(auth)/(onboarding)/misc/api/getRemitaDetailsRequest";
import DisplayedRemitaDetails from "@/app/(main)/misc/components/DisplayedRemitaDetails";
import OTPInput from "@/app/(main)/misc/components/OtpInput";




interface UseBooleanStateControlProps {

  isNonRemitaRemitaDetailsModalOpen: boolean;
  setNonRemitaRemitaDetailsModal: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  

  remitaDetailsResponse?: {

    FullName: string;
    Ministry: string;
    State: string;
  }


  setThirdNonRemitaModal: React.Dispatch<React.SetStateAction<boolean>>;

  heading: string;
  subheading: string;
  description: string;
  subdescription: string;
  otp: number;
  closeButtonReplacement?: React.ReactNode;
  children?: React.ReactNode;


}


function NonRemitaRemitaDetailsModal({

  isNonRemitaRemitaDetailsModalOpen,
  setNonRemitaRemitaDetailsModal,
  remitaDetailsResponse,
  setThirdNonRemitaModal,
  heading,
  subheading,
  description,
  subdescription,
  // otp,
  // children,


}: UseBooleanStateControlProps) {



  const router = useRouter();



  const handleClose = () => {

    setNonRemitaRemitaDetailsModal(false);

    router.back();

  }






  return (

    <div className="rounded-xl">



      <ClientOnly>

        <Dialog open={isNonRemitaRemitaDetailsModalOpen}
          onOpenChange={setNonRemitaRemitaDetailsModal}>

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

                <div className="my-5">

                  <DisplayedRemitaDetails
                    name={remitaDetailsResponse?.FullName}
                    Ministry={remitaDetailsResponse?.Ministry}
                    State={remitaDetailsResponse?.State}

                  />


                </div>

                <div className="mt-2 bg-[#2B3151] text-[#fff]  rounded-lg">

                  <p className="text-sm  pl-[1rem] py-[0.6rem] 'font-DMSans'">{description}</p>

                </div>



                <div className="mt-[2rem]  text-[#fff] w-full 'font-DMSans'" >

                  <p className="w-full text-xs font-medium">{subdescription}</p>

                </div>



                <div className="mt-[2rem]">

                  <OTPInput

                  />

                </div>


                {/* <div className="mt-6 md:mt-12">

{children}

</div> */}


                <button
                  className="mt-[5rem] font-display focus:shadow-outline w-full rounded-2xl bg-[#fff] p-4 py-3 font-semibold tracking-wide
        shadow-lg transition-colors delay-150 ease-in-out hover:bg-slate-300 focus:outline-none text-[#1B1687] mb-[3rem]"

                  onClick={() => {
                    setThirdNonRemitaModal(true)
                    setNonRemitaRemitaDetailsModal(false)


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

export default NonRemitaRemitaDetailsModal









