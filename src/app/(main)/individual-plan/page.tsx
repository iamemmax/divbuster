"use client"

import { useBooleanStateControl } from "@/hooks";
import RemitaDetailsModal from "../misc/components/modals/RemitaDetailsModal";
import Home from "../page";
import Link from "next/link";
import IndividualModal from "../misc/components/modals/IndividualPlanModal";
import SixMonthIndividualPlanModal from "../misc/components/modals/SixMonthIndividualPlanModal";
import DeductionModal from "../misc/components/modals/DeductionModal";
import AppSuccessfulModal from "../misc/components/modals/AppSuccessfulModal";





export default function IndividualPlan() {

  const {
    state: isSuccessIndividualModalOpen,
    setState: setSuccessIndividualModalState,
    setTrue: openSuccessModal,
  } = useBooleanStateControl();


  const {
    state: isSuccessSixMonthIndividualPlanModalOpen,
    setState: setSuccessSixMonthIndividualPlanModalState,
    setTrue: openSixMonthIndividualPlanModal,
    setFalse: closeSixMonthIndividualPlanModal,
  } = useBooleanStateControl();



  const {
    state: isSuccessDeductionModalOpen,
    setState: setSuccessDeductionModalState,
    setTrue: openDeductionModal,
    setFalse: closeDeductionModal,
  } = useBooleanStateControl();



  const {
    state: isSuccessAppSuccessfulModalOpen,
    setState: setSuccessAppSuccessfulModalState,
    setTrue: openAppSuccessfulModal,
    setFalse: closeAppSuccesfulModal,

  } = useBooleanStateControl();


  return (

    <div className="w-full h-full">


      <Home />




      <IndividualModal

        subheading="Choose Your Plan"
        heading="Choose your Plan"
        description="Individual plan gives you access to health cover for you only while the family plan covers for you and your family"
        Tab1="Individual"
        Tab2="Family"
        individualdurationplanone="6-Month Plan"
        individualamountplanone="₦3,000"
        individualamountplantwo="₦12,000"
        individualdurationplantwo="12-Month Plan"
        familydurationplanone="6-Month Plan"
        familydurationplantwo="12-Month Plan"
        familyamountplanone="₦3,000"
        familyamountplantwo="₦12,000"
        isIndividualModalOpen={true}
        setIndividualModal={setSuccessIndividualModalState}

      >




        <button
          className=" rounded-3xl font-display focus:shadow-outline w-[10rem]  bg-[#fff] p-4 py-2 font-semibold tracking-wide
            shadow-lg transition-colors delay-150 ease-in-out hover:bg-slate-300 focus:outline-none text-[#1B1687]"
          onClick={openSixMonthIndividualPlanModal}
        >
          Get Insurance
        </button>







      </IndividualModal>





      {isSuccessSixMonthIndividualPlanModalOpen && (

        <SixMonthIndividualPlanModal
          heading="6-Month Individual Plan"
          description="You have selected a 6-Month health cover."
          subdescription="A monthly premium of "
          amount="₦3,000"
          isSixMonthIndividualPlanModalOpen={isSuccessSixMonthIndividualPlanModalOpen}
          setSixMonthIndividualPlanModal={setSuccessSixMonthIndividualPlanModalState}


        >



          <div className='w-full flex justify-center items-center gap-[1rem] mt-[4rem] text-sm'>
            <button
              className="rounded-3xl border-[0.3px] text-[#fff]  py-[0.9rem] w-[10rem] shadow-lg transition-colors delay-150 ease-in-out focus:outline-none"
              onClick={() => {

                closeSixMonthIndividualPlanModal();
              }}
            >
              Decline
            </button>

            <button
              className="rounded-3xl bg-[#fff] text-[#1B1687]  py-[0.9rem] w-[10rem] shadow-lg transition-colors delay-150 ease-in-out focus:outline-none"
              onClick={() => {

                closeSixMonthIndividualPlanModal();
                openDeductionModal();

              }}
            >
              Accept
            </button>
          </div>




        </SixMonthIndividualPlanModal>


      )}

      {isSuccessDeductionModalOpen && (


        <DeductionModal


          heading="Deduction Acknowledgment"

          description={
            <>
              Kindly know that a <span style={{ color: "white" }}>₦3,000 </span>

              monthly premium will be auto-deducted from your salary for your health insurance package
            </>
          }

          subdescription="This also qualifies you for the lifestyle reward of N5m"
          isDeductionModalOpen={isSuccessDeductionModalOpen}
          setDeductionModal={setSuccessDeductionModalState}

        >


          <div className='w-full flex justify-center items-center gap-[1rem] mt-[1rem] text-sm'>
            <button
              className="rounded-3xl border-[0.3px] text-[#fff]  py-[0.9rem] w-[10rem] shadow-lg transition-colors delay-150 ease-in-out focus:outline-none"
              onClick={() => {

                closeSixMonthIndividualPlanModal();
                closeDeductionModal();
              }}
            >
              Decline
            </button>

            <button
              className="rounded-3xl bg-[#fff] text-[#1B1687]  py-[0.9rem] w-[10rem] shadow-lg transition-colors delay-150 ease-in-out focus:outline-none"
              onClick={() => {

                closeSixMonthIndividualPlanModal();

                closeDeductionModal();

                openAppSuccessfulModal();


              }}
            >
              Agree & Proceed
            </button>
          </div>



        </DeductionModal>



      )}

      {isSuccessAppSuccessfulModalOpen && (


        <AppSuccessfulModal

          heading="Application Successful"
          description="Your insurance application has been received and is being processed. You will soon receive an insurance code for use at clinics, pharmarcies, or hospitals"
          subdescription="Thank you for choosing Liberty life."
          isAppSuccessfulModalOpen={isSuccessAppSuccessfulModalOpen}
          setAppSuccessfulModal={setSuccessAppSuccessfulModalState}




        >

          <div className="flex w-full items-center justify-center">

          <button
            className="mt-[1rem] font-display focus:shadow-outline w-[23.76rem] rounded-10  bg-[#fff] p-4 py-3 font-semibold tracking-wide
        shadow-lg transition-colors delay-150 ease-in-out hover:bg-slate-300 focus:outline-none text-[#1B1687]"
          >
            Done
          </button>


          </div>

         

        </AppSuccessfulModal>






      )}





    </div>


  )


}