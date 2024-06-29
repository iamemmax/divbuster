import React, { Dispatch, SetStateAction, useState } from "react";
import {
  ClientOnly,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/core";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/core/DialogClone";
import RemitalListIcon from "../../icons/RemitalListIcon";
import UserIcons from "../../icons/Usericon";
import Link from "next/link";
import PlanComfirmationModal from "./PlanComfirmationModal";
import PlanPayment from "./PlanPayment";
import RemitalSuccessModal from "./RemitalSuccessModal";

interface Prop {
  setOpenShowRemitalPlan: Dispatch<SetStateAction<boolean>>;
  openRemitalPlan: true;
  verifiedPhoneNumber: string;
}

const RemitalPlanModal = ({
  openRemitalPlan,
  setOpenShowRemitalPlan,
  verifiedPhoneNumber,
}: Prop) => {
  const list = [
    "Telemedicine",
    "Surgery Care",
    "Pharmacy Access",
    "Doctor Consultation",
  ];
  const plans = [
    {
      plan: "1 Month Plan",
      amount: 3000,
      plan_duration: "ONE",
      duration: 1,
    },
    {
      plan: "6 Month Plan",
      amount: 18000,
      plan_duration: "SIX",
      duration: 6,
    },
    {
      plan: "12 Month Plan",
      amount: 36000,
      plan_duration: "TWElVE",
      duration: 12,
    },
  ];
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [planData, setPlanData] = useState<{
    plan_type: string;
    plan_duration: string;
    plan_amount: number;
    type: string;
    duration: number;
  }>({
    plan_type: "",
    plan_duration: "",
    plan_amount: 0,
    type: "",
    duration: 1,
  });

  return (
    <div>
      <Dialog open={openRemitalPlan}>
        <DialogContent className="!overflow-hidden w-[98%] max-h-[97vh] px-4 md:w-full md:h-[55rem]">
          <div className=" md:w-full flex justify-between items-center ">
            <DialogHeader className="bg-[#1B1687] w-full !justify-between ">
              <DialogTitle className="text-[#fff] whitespace-nowrap ">
                Individual Plan
              </DialogTitle>

              <DialogClose className="rounded-lg">
                <button onClick={() => setOpenShowRemitalPlan(false)}>
                  Close
                </button>
              </DialogClose>
            </DialogHeader>
          </div>

          <DialogBody className="bg-[#151D42] w-full h-full ">
            <div className="py-1">
              <div className="text-[#fff]  text-center font-semibold text-3xl">
                <DialogDescription className="text-3xl">
                  Choose Your Plan
                </DialogDescription>
              </div>
            </div>

            <div className="flex w-full items-center justify-center">
              <p className="w-full px-[2rem] text-center  sm:max-w-[80%]  text-[#747577] font-medium">
                Individual plan gives you access to health cover for you only,
                while the family plan covers for you and your family.
              </p>
            </div>

            <div className="max-h-[60vh] md:h-[409px] md:w-full  mt-10 ">
              <Tabs className="" defaultValue="Individual">
                <div className="flex w-full  px-6  items-center justify-center ">
                  <TabsList className="flex w-[98%] justify-center rounded-[.75rem]  bg-[#1D2651]  md:max-w-[23rem] md:pl-6 lg:pl-0  border border-[#407BFF]">
                    <TabsTrigger
                      className="inline-flex w-full items-center justify-center rounded-xl   text-lg font-medium text-[#fff]  data-[state=active]:shadow-none"
                      value="Individual"
                    >
                      Individual
                    </TabsTrigger>
                    <TabsTrigger
                      className="inline-flex w-full items-center justify-center rounded-xl    text-lg font-medium text-[#fff]   data-[state=active]:shadow-none"
                      value="Family"
                    >
                      Family
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent
                  className="mt-6 rounded-10 w-full   py-10  lg:py-4"
                  value="Individual"
                >
                  <div className="w-full flex flex-col md:flex-row gap-[1rem] px-6  items-center justify-center">
                    {plans?.map((plan, idx: number) => (
                      <div
                        className="  flex flex-col w-full  items-center justify-center"
                        key={idx}
                      >
                        <div className="w-full">
                          <div className="border-[0.3px]  border-[#4760FD]   rounded-lg   bg-[#1A234c] ">
                            <div className="w-full py-8 px-6">
                              <div className="">
                                <UserIcons />
                              </div>
                              <div className="py-3">
                                <p className=" text-base text-[#D1D3DB] font-normal">
                                  {plan?.plan}
                                </p>
                                <h1 className="text-white text-[2.25rem] font-bold">
                                  ₦{plan?.amount}
                                </h1>
                              </div>
                              <div className="space-y-4">
                                {list?.map((list, index: number) => (
                                  <div
                                    className="flex border-b-[0.1px] pb-2 space-y-1 border-[#ddd] border-opacity-20 items-center gap-2"
                                    key={index}
                                  >
                                    <div className="">
                                      {" "}
                                      <RemitalListIcon />
                                    </div>
                                    <p className="text-white text-xs -mt-1">
                                      {list}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="border-[.0313rem] border-[#4760FD] rounded-10 mt-5 flex justify-center items-center w-full py-5 ">
                              <button
                                className=" rounded-3xl font-display focus:shadow-outline w-[10rem]  bg-[#fff] p-4 py-2 font-semibold tracking-wide
                                  shadow-lg transition-colors delay-150 ease-in-out hover:bg-slate-300 focus:outline-none text-[#1B1687]"
                                onClick={() => {
                                  setShowConfirmation(true);
                                  setPlanData({
                                    plan_duration: plan?.plan_duration,
                                    plan_amount: Number(plan?.amount),
                                    plan_type: plan?.plan,
                                    type: "INDIVIDUAL",
                                    duration: plan?.duration,
                                  });
                                }}
                              >
                                Get Insurance
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex sm:flex-row flex-col w-full justify-center items-center mt-[1.4rem] gap-1 flex-nowrap">
                    <Link href={"#"} className="text-white text-sm">
                      <span className="text-[#747577]">
                        Terms & Conditions Apply:
                      </span>{" "}
                      libertyaasured.com
                    </Link>
                  </div>
                  <div className=""></div>
                </TabsContent>

                {/* FAMILY PLAN */}

                <TabsContent
                  className="mt-1 rounded-10  px-6  lg:px-0 lg:py-4"
                  value="Family"
                >
                  <div className="w-full  flex  gap-[1rem] items-center justify-center">
                    <h2 className="text-white text-3xl py-6"> coming soon</h2>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </DialogBody>
        </DialogContent>
      </Dialog>

      {showConfirmation && (
        <PlanComfirmationModal
          showConfirmation={showConfirmation}
          setShowConfirmation={setShowConfirmation}
          planData={planData}
          verifiedPhoneNumber={verifiedPhoneNumber}
          setShowPaymentModal={setShowPaymentModal}
        />
      )}
      {showPaymentModal && (
        <PlanPayment
          showPaymentModal={showPaymentModal}
          setShowPaymentModal={setShowPaymentModal}
          verifiedPhoneNumber={verifiedPhoneNumber}
          planData={planData}
          setShowSuccessModal={setShowSuccessModal}
        />
      )}
      <RemitalSuccessModal
        showSuccessModal={showSuccessModal}
        setShowSuccessModal={setShowSuccessModal}
      />
    </div>
  );
};

export default RemitalPlanModal;
