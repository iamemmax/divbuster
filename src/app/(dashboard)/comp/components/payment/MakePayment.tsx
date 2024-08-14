"use client";
// import React, { useState, useEffect } from "react";
// import {
//   Button,
//   ClientOnly,
//   Dialog,
//   DialogBody,
//   DialogClose,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   ErrorModal,
//   LinkButton,
//   RadioGroup,
//   RadioGroupItem,
// } from "@/components/core";
// import CopyIcon2 from "../../icons/CopyIcon2";
// import { Label } from "@radix-ui/react-label";

// import {
//   formatAxiosErrorMessage,
//   formatCurrency,
//   removeCommaFromPrice,
// } from "@/utils";
// import { useQuery } from "react-query";
// import {
//   getPlan,
//   PlanData,
//   plantypes,
// } from "@/app/(main)/misc/components/insurance/api/plan/getPlan";
// import { useClipboard, useErrorModalState } from "@/hooks";
// import { AxiosError } from "axios";
// // import { beneficailData, useAddbeneficiaries } from "./api/addBeneficiariels";
// // import SelectPlanModal from "../Funds/Selectplan";
// import { SmallSpinner } from "@/icons/core";
// import { useAddbeneficiaries } from "../plans/api/addBeneficiariels";
// import { PayStack } from "../../icons";
// import { useUser } from "@/app/(auth)/(onboarding)/misc";
// import { useRouter } from "next/navigation";
// import { confirmTransfer } from "@/app/(main)/misc/components/insurance/api/plan/confirmTransfer";
// import toast from "react-hot-toast";
// // import { getPackagePlans } from "./api/fetchPackagePlan";
// // import { getPecentage } from "./api/fetchPercentagePrice";
// // import {
// //   calculateActualAmount,
// //   getAmountDeduction,
// //   getPercentage,
// // } from "./util/planCalc";

// export interface successProp {
//   account_number: number;
//   account_name: string;
//   bank_name: string;
//   wallet_balance: number;
//   people_added: number;
//   plan_details: Plandetails;
//   paystack_link: string;
//   unique_request_id: string;
// }

// interface Plandetails {
//   plan_duration: number;
//   total_price: number;
//   price: number;
// }

// interface UseBooleanStateControlProps {
// isSelectPlanModalOpen: boolean;
// setSelectPlanModal: React.Dispatch<React.SetStateAction<boolean>>;

// }

// function MakePaymentModal({
//   isSelectPlanModalOpen,
//   setSelectPlanModal,
//   //   beneficiariesList,
//   // selectedPlan,
//   //   planType,
// }: UseBooleanStateControlProps) {
//   const {
//     isErrorModalOpen,
//     setErrorModalState,
//     openErrorModalWithMessage,
//     errorModalMessage,
//   } = useErrorModalState();
//   const [errorMsg, setErrorMsg] = useState("");

//   const [showPaymentOption, setShowPaymentOption] = useState(false);
//   const { mutate: handleAddBeneficiary, isLoading } = useAddbeneficiaries();
//   const [paymentProp, setPaymentProp] = useState<successProp>();

//   const [selectedValue, setSelectedValue] = useState(
//     String(Number(selectedPlan && selectedPlan[0]?.plan_duration?.duration))
//   );

//   const handleChange = (value: string) => {
//     setSelectedValue(String(value));
//   };

//   const makePaymentReqquest = () => {
//     setShowPaymentOption(true);
//   };
//   const { copy } = useClipboard();

//   const { data: users, isLoading: isLoadingTransfer } = useUser();
//   const router = useRouter();
//   const { refetch } = useQuery({
//     queryFn: () => confirmTransfer(String(users?.phone_number)),
//     queryKey: ["confirm-transfer", users?.phone_number],
//     enabled: false,
//     onSuccess: (data) => {
//       if (data.message !== "success") {
//         toast.success(data?.message);
//         router.push("/dashboard");
//       } else {
//         setErrorMsg(data?.message);
//         openErrorModalWithMessage(String(data?.message));
//       }
//     },
//     onError: (error) => {
//       const errorMessage = formatAxiosErrorMessage(error as AxiosError);
//       // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//       //@ts-expect-error
//       setErrorMsg(error?.response?.data?.error);
//       openErrorModalWithMessage(String(errorMessage));
//     },
//   });
//   return (
//     <div className="rounded-xl">
//       <ClientOnly>
//         <Dialog open={isSelectPlanModalOpen}>
//           <DialogContent className="!overflow-hidden">
//             <DialogHeader className="bg-[#1B1687] ">
//               <DialogTitle className="text-[#fff]">Select Duration</DialogTitle>
//               <DialogClose
//                 className="rounded-10 bg-transparent border-[0.3px] border-[#407BFF]"
//                 onClick={() => setSelectPlanModal(false)}
//               >
//                 <button>Close</button>
//               </DialogClose>
//             </DialogHeader>
//             <DialogBody className="bg-[#141B3f]">
//               <div className=" text-sm text-white">
//                 {!showPaymentOption && (
//                   <div className="w-full">
//                     <p className="text-white text-sm w-4/5">
//                       Kindly select any of the plans below to activate plan and
//                       make
//                     </p>
//                     <div className="text-[#FFFFFFCC] text-base gap-y-3 mt-5">
//                       <RadioGroup
//                         value={selectedValue}
//                         onValueChange={handleChange}
//                       >
//                         {selectedPlan?.map((payment, idx) => (
//                           <div
//                             className="flex space-x-2 items-center mt-3 bg-[#FFFFFF1A] rounded-10 py-3 pl-4"
//                             key={idx}
//                           >
//                             <RadioGroupItem
//                               className="w-4 h-4 p-0 rounded-full border border-[#ffffff] bg-[#141B3F] checked:bg-[#407BFF] checked:border-[#407BFF]"
//                               value={String(payment?.plan_duration?.duration)}
//                               id={String(payment?.plan_duration?.duration)}
//                             />
//                             <Label
//                               className="text-sm"
//                               htmlFor={String(payment?.plan_duration?.duration)}
//                             >
//                               {Number(payment?.plan_duration?.duration)} Month
//                               Plan
//                               <span className="text-white pl-2 font-bold text-sm">
//                                 {formatCurrency(
//                                   Number(removeCommaFromPrice(payment?.price))
//                                 )}
//                               </span>
//                             </Label>
//                           </div>
//                         ))}
//                       </RadioGroup>
//                     </div>
//                     <div className="w-full mt-6  flex items-center gap-3 py-5 text-sm font-normal">
//                       <Button
//                         className=" flex items-center gap-x-5 justify-center font-display focus:shadow-outline w-full rounded-2xl bg-[#fff] p-4  font-semibold tracking-wide
//                                             shadow-lg transition-colors delay-150 ease-in-out hover:bg-slate-300 focus:outline-none text-[#1B1687]"
//                         type="submit"
//                         onClick={makePaymentReqquest}
//                       >
//                         Continue
//                         {isLoading && (
//                           <SmallSpinner className="" color="#1B1687" />
//                         )}
//                       </Button>
//                     </div>
//                   </div>
//                 )}

//                 {showPaymentOption && (
//                   <article className=" text-sm text-white">
//                     {/* <div className="flex justify-center items-center gap-x-2 py-3">
//                       <div className=" border-dashed border border-[#9F9F9F] w-[120px] h-[1px]"></div>
//                       <div className="text-sm">Payment Option</div>
//                       <div className=" border-dashed border border-[#9F9F9F] w-[120px] h-[1px]"></div>
//                     </div> */}
//                     <div className="bg-[#FFFFFF1A] rounded-2xl pt-4 pb-3 px-6 mt-5">
//                       <p className="pb-4">Make payment via transfer</p>
//                       <div className="border-b-[0.3px] border-[#FFFFFF1A]"></div>
//                       <article className="flex justify-between">
//                         <div className="grid grid-cols-2 py-5 gap-5 w-full">
//                           <div className=" w-full">
//                             <p className="text-[#FFFFFF99] text-xs">
//                               Account name
//                             </p>
//                             <p className="font-sans font-medium">
//                               {paymentProp?.account_name ?? "Nil"}
//                             </p>
//                           </div>
//                           <div className=" w-full">
//                             <p className="text-[#FFFFFF99] text-xs">
//                               Account no
//                             </p>

//                             <div className=" flex items-center gap-3">
//                               <p className="font-sans font-medium">
//                                 {paymentProp?.account_number}
//                               </p>
//                               <CopyIcon2
//                                 onClick={() =>
//                                   copy(String(paymentProp?.account_number))
//                                 }
//                               />
//                             </div>
//                           </div>
//                           <div className="gap-x-4 col-span-2">
//                             <p className="text-[#FFFFFF99] text-xs">
//                               Bank name
//                             </p>
//                             <p className="font-sans font-medium">
//                               {paymentProp?.bank_name}
//                             </p>
//                           </div>
//                         </div>
//                       </article>
//                     </div>
//                     <div className="mt-4">
//                       <RadioGroup
//                         value={selectedValue}
//                         onValueChange={setSelectedValue}
//                       >
//                         <div className="flex items-center space-x-2 bg-[#FFFFFF1A] rounded-10 py-3 pl-4">
//                           <RadioGroupItem
//                             value=""
//                             id="r1"
//                             className={`w-4 h-4 p-0 rounded-full border
//               ${selectedValue === "" ? "bg-[#407BFF] border-[#407BFF]" : "bg-[#141B3F] border-[#ffffff]"}
//             `}
//                             aria-labelledby="r1-label"
//                           />
//                           <label
//                             id="r1-label"
//                             htmlFor="r1"
//                             className="flex justify-between gap-20 cursor-pointer"
//                           >
//                             <div>Main wallet Balance:</div>
//                             <div className="font-medium">
//                               {formatCurrency(
//                                 Number(paymentProp?.wallet_balance)
//                               )}
//                             </div>
//                           </label>
//                         </div>
//                         {/* Add more RadioGroup.Item components here if needed */}
//                       </RadioGroup>
//                     </div>
//                     <div className="pb-6">
//                       <LinkButton
//                         href={paymentProp?.paystack_link ?? ""}
//                         className="border-[0.3px] border-[#407BFF] py-4 gap-2 w-full mt-10 rounded-10"
//                         //   onClick={() => setSuccessPayment(true)}
//                       >
//                         <div>
//                           <PayStack />
//                         </div>
//                         <div className="font-sans font-medium">
//                           Pay with paystack{" "}
//                         </div>
//                       </LinkButton>
//                       <Button
//                         className="w-full text-[#1B1687] flex justify-center items-center space-x-3 bg-white py-3.5 font-medium text-sm mt-6"
//                         onClick={() => refetch()}
//                       >
//                         I have made payment{" "}
//                         {isLoadingTransfer && <SmallSpinner />}
//                       </Button>
//                     </div>
//                   </article>
//                 )}
//               </div>
//             </DialogBody>
//           </DialogContent>
//         </Dialog>
//       </ClientOnly>
//       <ErrorModal
//         isErrorModalOpen={isErrorModalOpen}
//         setErrorModalState={() => setErrorModalState(false)}
//         subheading={
//           errorModalMessage ||
//           errorMsg ||
//           "Please check your inputs and try again."
//         }
//       />
//     </div>
//   );
// }
// export default MakePaymentModal;

// "use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Button,
  ClientOnly,
  ErrorModal,
  LinkButton,
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

import Link from "next/link";
// import PlanComfirmationModal from "./PlanComfirmationModal";
// import PlanPayment from "./PlanPayment";
// import RemitalSuccessModal from "./RemitalSuccessModal";
import { useQuery } from "react-query";
// import { useMakeRemitalPayment } from "../../api/remital/remitalpayment";
import {
  formatAxiosErrorMessage,
  formatCurrency,
  removeCommaFromPrice,
} from "@/utils";
import { AxiosError } from "axios";
import { useErrorModalState } from "@/hooks";
import { useLogin, useUser } from "@/app/(auth)/(onboarding)/misc";
import { useRouter } from "next/navigation";
import useDataStore from "@/app/store/useStore";
import { Spinner } from "@/icons/core";
import { getPecentage } from "@/app/(dashboard)/comp/components/plans/api/fetchPercentagePrice";
import {
  getAmountDeduction,
  getPercentage,
} from "@/app/(dashboard)/comp/components/plans/util/planCalc";
import {
  getPlan,
  plantypes,
} from "@/app/(main)/misc/components/insurance/api/plan/getPlan";
import UserIcons from "@/app/(main)/misc/components/insurance/icons/Usericon";
import RemitalListIcon from "@/app/(main)/misc/components/insurance/icons/RemitalListIcon";
import ConfirmPayment from "./ConfirmPayment";
import BuyPlanModalForCoperate from "../plans/coperate/BuyPlanForCoperate";
import BuyPlanModalForLovedOne from "../plans/loved-ones/BuyLovedOnePlan";
import BuyPlanModal from "../plans/family/BuyPlanForFamily";
import AddPrinciplePhoneNumer from "../plans/family/AddPrinciplePhoneNumber";

interface Prop {
  isSelectPlanModalOpen: boolean;
  setSelectPlanModal: React.Dispatch<React.SetStateAction<boolean>>;
  planData: plantypes[] | undefined;
  setPaymentData: React.Dispatch<
    React.SetStateAction<{
      account_name: string;
      account_no: string;
      amount: string;
      bank_name: string;
      paystack_link: string;
    }>
  >;
  setShowPaymentModal: React.Dispatch<React.SetStateAction<boolean>>;
}
interface PercentageData {
  [key: number]: number;
}

interface PercentageCalc {
  percentage_data: {
    family: PercentageData;
    individual: PercentageData;
    corporate: PercentageData;
  };
  base_price: number;
}

// Define the type for the health plan
type PlanType = "family" | "individual" | "corporate";

const MakePaymentModal = ({
  isSelectPlanModalOpen,
  setSelectPlanModal,
  planData,
  setPaymentData,
  setShowPaymentModal,
}: Prop) => {
  const {
    isErrorModalOpen,
    setErrorModalState,
    openErrorModalWithMessage,
    errorModalMessage,
  } = useErrorModalState();

  const { data: percentageCalc } = useQuery({
    queryFn: getPecentage,
    queryKey: ["fetch-percentage-list"],
  });

  const [showPaymentConfirmation, setShowPaymentConfirmation] = useState(false);
  const [planType, setPlanType] = React.useState({
    phone_number: "",
    duration: "",
    amount: "",
    number_of_recipient: "",
    play_type: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  // const [showSubmitModal, setShowSubmitModal] = useState(false);
  // const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [planCounts, setPlanCounts] = useState<Record<string, number>>({});
  const [BuyPlan, setBuyPlan] = useState(false);
  const [buyPlanForCoporate, setBuyPlanForCoporate] = useState(false);
  const [buyFamilyPlan, setBuyFamilyPlan] = useState(false);
  const { data: plansData, isLoading: loadingPlan } = useQuery({
    queryFn: getPlan,
    queryKey: ["get-plans"],
  });

  const { data: users } = useUser();

  const [selectedTab, setSelectedTab] = useState(
    plansData ? plansData[0]?.package_name : "INDIVIDUAL"
  );

  useEffect(() => {
    if (plansData) {
      setSelectedTab(plansData[0]?.package_name);
    }
  }, [plansData]);

  // const increment = (planId: string) => {
  //   setPlanCounts((prevCounts) => ({
  //     ...prevCounts,
  //     [planId]: (prevCounts[planId] || 0) + 1,
  //   }));
  // };

  // const me = true
  const increment = (planId: string) => {
    setPlanCounts((prevCounts) => {
      const currentCount = prevCounts[planId] || 0;

      // Determine the maximum allowed count based on `has_created_individual_health`
      const maxAllowed = users?.has_created_individual_health ? 5 : 6;

      if (selectedTab === "FAMILY" && currentCount >= maxAllowed) {
        setErrorMsg(`Maximum of ${maxAllowed} plans allowed for FAMILY.`);
        return prevCounts; // Prevent incrementing
      }

      // Clear any previous error message if the condition passes
      setErrorMsg("");

      return {
        ...prevCounts,
        [planId]: currentCount + 1,
      };
    });
  };

  const decrement = (planId: string, minCount: number) => {
    setPlanCounts((prevCounts) => ({
      ...prevCounts,
      [planId]: Math.max((prevCounts[planId] || 0) - 1, minCount),
    }));
  };

  useEffect(() => {
    if (plansData) {
      setSelectedTab(plansData[0]?.package_name);
      // Set default counts for FAMILY and CORPORATE plans
      const initialCounts: Record<string, number> = {};
      plansData?.forEach((planCategory) => {
        if (planCategory?.package_name === "FAMILY") {
          planCategory?.data?.forEach((plan) => {
            initialCounts[plan.id.toString()] = 3;
          });
        } else if (planCategory.package_name === "CORPORATE") {
          planCategory.data.forEach((plan) => {
            initialCounts[plan.id.toString()] = 4;
          });
        }
      });
      setPlanCounts(initialCounts);
    }
  }, [plansData]);
  // percentage calculation
  function getPercentage(
    type: keyof PercentageCalc["percentage_data"],
    number: number
  ): number {
    const percentageData = percentageCalc?.percentage_data[type];

    if (!percentageData) {
      console.error(`No data found for type: ${type}`);
      return 0; // or handle this case as needed
    }

    // Convert number to string for indexing
    const key = number > 8 ? 8 : number;

    if (key in percentageData) {
      const value = percentageData[key];
      if (typeof value === "number") {
        return value;
      } else {
        console.error(`Unexpected type for key ${key}: ${typeof value}`);
        return 0; // or handle unexpected type
      }
    } else {
      console.warn(`Key ${key} not found in percentageData for type: ${type}`);
      return 0; // or some default value if the key doesn't exist
    }
  }

  return (
    <div>
      {loadingPlan ? (
        <div className="fixed z-[999999999999999999999999] inset-0 bg-white flex justify-center items-center">
          <Spinner color="white" />
        </div>
      ) : (
        <Dialog open={isSelectPlanModalOpen}>
          <DialogContent className="!overflow-hidden rounded-[1.125rem]  min-h-[90vh] max-h-[97vh] px-4 w-full md:min-h-[55rem]">
            <div className="md:w-full flex justify-between items-center">
              <DialogHeader className="bg-[#1B1687]  w-full !justify-between">
                <DialogTitle className="text-[#fff] whitespace-nowrap">
                  {selectedTab} PLAN
                </DialogTitle>

                <DialogClose
                  className="rounded-lg"
                  onClick={() => setSelectPlanModal(false)}
                >
                  <button>Close</button>
                </DialogClose>
              </DialogHeader>
            </div>

            <DialogBody className="bg-[#151D42] w-full rounded-b-[1.125rem] h-full">
              {loadingPlan ? (
                <div className="flex justify-center h-36 items-center">
                  <Spinner color="white" />
                </div>
              ) : (
                <>
                  <div className="py-1">
                    <div className="text-[#fff] text-center font-semibold text-3xl">
                      <DialogDescription className="text-3xl">
                        Choose Your Plan
                      </DialogDescription>
                    </div>
                  </div>

                  <div className="flex w-full items-center justify-center">
                    {selectedTab === "INDIVIDUAL" && (
                      <p className="w-full px-4 md:px-[2rem] text-center  text-base  sm:max-w-[80%] text-[#fff] text-opacity-50 font-medium">
                        Individual plan gives you access to health cover for you
                        only, and you stand a chance to enjoy awesome benefits.
                      </p>
                    )}
                    {selectedTab === "FAMILY" && (
                      <p className="w-full px-4 md:px-[1.5rem] text-center  text-base sm:max-w-[90%] text-[#fff] text-opacity-50 font-medium">
                        Family plan gives you access to include up to 6 members
                        of your family. The more you add, the more discount you
                        get.
                      </p>
                    )}
                    {selectedTab === "CORPORATE" && (
                      <p className="w-full px-4 md:px-[1.5rem] text-center text-base  sm:max-w-[90%] text-[#fff] text-opacity-50 font-medium">
                        Corporate plan allows you provide premium .<br /> Health
                        coverage for employees
                      </p>
                    )}
                  </div>

                  <div className="max-h-[60vh] overflow-y-auto md:min-h-[409px] rounded-b-lg md:mb-[2rem] md:w-full mt-5 md:mt-6">
                    <Tabs
                      className=""
                      defaultValue={selectedTab}
                      onValueChange={(e) => setSelectedTab(e)}
                    >
                      <div className="flex w-full px-6 items-center justify-center">
                        <TabsList className="flex w-[98%] justify-center rounded-[.75rem] bg-[#1D2651] md:max-w-[30rem] md:pl-6 lg:pl-0 border border-[#407BFF]">
                          {plansData?.map((tab, idx: number) => (
                            <TabsTrigger
                              className="inline-flex w-full items-center justify-center rounded-xl text-md font-medium text-[#fff] data-[state=active]:shadow-none"
                              value={tab?.package_name}
                              key={idx}
                            >
                              {tab?.package_name}
                            </TabsTrigger>
                          ))}
                        </TabsList>
                      </div>

                      {/*  PLAN */}
                      {plansData?.map((healthPlan, idx: number) => (
                        <TabsContent
                          key={idx}
                          className="md:mt-6 mt-3 rounded-10 w-full py-10 lg:py-4"
                          value={healthPlan?.package_name}
                        >
                          <div
                            className={`${healthPlan?.data?.length > 2 ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-y-8  gap-x-[1rem] px-6 " : " w-full flex flex-col md:flex-row gap-[1rem] px-6 items-center justify-center"}`}
                          >
                            {healthPlan?.data?.map((plan, idxx: number) => (
                              <div
                                className="flex flex-col w-full items-center justify-center"
                                key={idxx}
                              >
                                <div className="w-full">
                                  <div className="border-[0.3px] relative border-[#4760FD] rounded-[1.25rem] bg-[#1A234C]">
                                    <div className="w-full py-8  relative">
                                      <div className="absolute -top-6 flex justify-center items-start w-full">
                                        <UserIcons width={65} height={65} />
                                      </div>
                                      <div className="mt-4">
                                        <div className="py-3 px-4">
                                          <p className="text-base text-[#D1D3DB] text-opacity-80 font-normal">
                                            {plan?.plan_duration?.duration}{" "}
                                            Months Plan
                                          </p>
                                          <div className="flex items-center gap-x-2">
                                            {plan?.old_price && (
                                              <p className="text-white line-through text-lg text-opacity-80 font-bold">
                                                {formatCurrency(
                                                  Number(
                                                    removeCommaFromPrice(
                                                      plan?.old_price
                                                    )
                                                  )
                                                )}
                                              </p>
                                            )}
                                            {plan?.price && (
                                              <p className="text-white text-lg font-bold">
                                                {formatCurrency(
                                                  Number(
                                                    removeCommaFromPrice(
                                                      plan?.price
                                                    )
                                                  )
                                                )}
                                              </p>
                                            )}
                                          </div>
                                          {/* {healthPlan?.package_name ===
                                              "FAMILY" && (
                                              <p className="text-xs py-1 text-[#D1D3DB] text-opacity-80 font-normal">
                                                3 Individuals (3 + 1 free )
                                              </p>
                                            )} */}
                                          {/* {healthPlan?.package_name ===
                                            "CORPERATE" && (
                                            <p className="text-xs py-1 text-[#D1D3DB] text-opacity-80 font-normal">
                                              Minimum of{" "}
                                              {plan?.plan_duration?.min_members}
                                            </p>
                                          )} */}
                                        </div>
                                        <div className="space-y-[10px] mt-1">
                                          {plan?.descriptions?.map(
                                            (list, index: number) => (
                                              <div
                                                className="flex px-4 border-b-[0.1px] pb-2 space-y-1 border-[#ddd] border-opacity-10 items-center gap-2"
                                                key={index}
                                              >
                                                <div className="">
                                                  <RemitalListIcon />
                                                </div>
                                                <p className="text-white text-opacity-80 text-xs -mt-1">
                                                  {list}
                                                </p>
                                              </div>
                                            )
                                          )}
                                        </div>
                                      </div>
                                      {healthPlan.package_name === "FAMILY" && (
                                        <div className="flex  items-center  justify-center gap-4 px-4">
                                          <div className="flex mt-3 rounded-[1.25rem] py-[.3125rem] px-2 space-x-3 items-center border-white border-[0.2px] border-opacity-50 ">
                                            <Button
                                              onClick={() =>
                                                decrement(
                                                  plan.id.toString(),
                                                  plan.plan_duration.min_members
                                                )
                                              }
                                              className="bg-transparent py-0 px-1 rounded"
                                            >
                                              <svg
                                                width="16"
                                                height="16"
                                                viewBox="0 0 16 16"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                              >
                                                <path
                                                  d="M8 1.5C4.416 1.5 1.5 4.416 1.5 8C1.5 11.584 4.416 14.5 8 14.5C11.584 14.5 14.5 11.584 14.5 8C14.5 4.416 11.584 1.5 8 1.5ZM8 2.5C11.0435 2.5 13.5 4.9565 13.5 8C13.5 11.0435 11.0435 13.5 8 13.5C4.9565 13.5 2.5 11.0435 2.5 8C2.5 4.9565 4.9565 2.5 8 2.5ZM5 7.5V8.5H11V7.5H5Z"
                                                  fill="white"
                                                />
                                              </svg>
                                            </Button>
                                            <div className="text-xs  text-white font-semibold">
                                              {planCounts[plan.id.toString()] ||
                                                0}
                                            </div>
                                            <Button
                                              onClick={() =>
                                                increment(plan.id.toString())
                                              }
                                              className="bg-transparent px-1 py-0 rounded"
                                            >
                                              <svg
                                                width="15"
                                                height="15"
                                                viewBox="0 0 15 15"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                              >
                                                <g clip-path="url(#clip0_5291_1985)">
                                                  <path
                                                    d="M7.03125 0C7.68066 0 8.30322 0.0830078 8.89893 0.249023C9.49463 0.415039 10.0562 0.649414 10.5835 0.952148C11.1108 1.25488 11.5845 1.62109 12.0044 2.05078C12.4243 2.48047 12.7905 2.95654 13.103 3.479C13.4155 4.00146 13.6523 4.56055 13.8135 5.15625C13.9746 5.75195 14.0576 6.37695 14.0625 7.03125C14.0625 7.68066 13.9795 8.30322 13.8135 8.89893C13.6475 9.49463 13.4131 10.0562 13.1104 10.5835C12.8076 11.1108 12.4414 11.5845 12.0117 12.0044C11.582 12.4243 11.106 12.7905 10.5835 13.103C10.061 13.4155 9.50195 13.6523 8.90625 13.8135C8.31055 13.9746 7.68555 14.0576 7.03125 14.0625C6.38184 14.0625 5.75928 13.9795 5.16357 13.8135C4.56787 13.6475 4.00635 13.4131 3.479 13.1104C2.95166 12.8076 2.47803 12.4414 2.05811 12.0117C1.63818 11.582 1.27197 11.106 0.959473 10.5835C0.646973 10.061 0.410156 9.50195 0.249023 8.90625C0.0878906 8.31055 0.00488281 7.68555 0 7.03125C0 6.38184 0.0830078 5.75928 0.249023 5.16357C0.415039 4.56787 0.649414 4.00635 0.952148 3.479C1.25488 2.95166 1.62109 2.47803 2.05078 2.05811C2.48047 1.63818 2.95654 1.27197 3.479 0.959473C4.00146 0.646973 4.56055 0.410156 5.15625 0.249023C5.75195 0.0878906 6.37695 0.00488281 7.03125 0ZM7.03125 13.125C7.59277 13.125 8.13232 13.0518 8.6499 12.9053C9.16748 12.7588 9.65088 12.5537 10.1001 12.29C10.5493 12.0264 10.9619 11.709 11.3379 11.3379C11.7139 10.9668 12.0312 10.5566 12.29 10.1074C12.5488 9.6582 12.7539 9.17236 12.9053 8.6499C13.0566 8.12744 13.1299 7.58789 13.125 7.03125C13.125 6.46973 13.0518 5.93018 12.9053 5.4126C12.7588 4.89502 12.5537 4.41162 12.29 3.9624C12.0264 3.51318 11.709 3.10059 11.3379 2.72461C10.9668 2.34863 10.5566 2.03125 10.1074 1.77246C9.6582 1.51367 9.17236 1.30859 8.6499 1.15723C8.12744 1.00586 7.58789 0.932617 7.03125 0.9375C6.46973 0.9375 5.93018 1.01074 5.4126 1.15723C4.89502 1.30371 4.41162 1.50879 3.9624 1.77246C3.51318 2.03613 3.10059 2.35352 2.72461 2.72461C2.34863 3.0957 2.03125 3.50586 1.77246 3.95508C1.51367 4.4043 1.30859 4.89014 1.15723 5.4126C1.00586 5.93506 0.932617 6.47461 0.9375 7.03125C0.9375 7.59277 1.01074 8.13232 1.15723 8.6499C1.30371 9.16748 1.50879 9.65088 1.77246 10.1001C2.03613 10.5493 2.35352 10.9619 2.72461 11.3379C3.0957 11.7139 3.50586 12.0312 3.95508 12.29C4.4043 12.5488 4.89014 12.7539 5.4126 12.9053C5.93506 13.0566 6.47461 13.1299 7.03125 13.125ZM7.5 6.5625H11.25V7.5H7.5V11.25H6.5625V7.5H2.8125V6.5625H6.5625V2.8125H7.5V6.5625Z"
                                                    fill="white"
                                                  />
                                                </g>
                                                <defs>
                                                  <clipPath id="clip0_5291_1985">
                                                    <rect
                                                      width="15"
                                                      height="15"
                                                      fill="white"
                                                    />
                                                  </clipPath>
                                                </defs>
                                              </svg>
                                            </Button>
                                          </div>
                                          <div className="flex justify-center rounded-[1.25rem] mt-3 py-[.375rem] px-3 bg-white bg-opacity-10 items-center">
                                            <p className="text-white font-semibold text-xs">
                                              {formatCurrency(
                                                getAmountDeduction(
                                                  Number(
                                                    removeCommaFromPrice(
                                                      String(
                                                        percentageCalc?.base_price
                                                      )
                                                    )
                                                  ),
                                                  plan?.plan_duration?.duration,
                                                  planCounts[
                                                    plan.id.toString()
                                                  ] || 0,
                                                  getPercentage(
                                                    plan?.plan_duration?.plan_type?.name?.toLowerCase() as PlanType,
                                                    planCounts[
                                                      plan.id.toString()
                                                    ]
                                                  )
                                                )
                                              )}
                                            </p>
                                          </div>
                                        </div>
                                      )}
                                    </div>

                                    <div className="border-[.0313rem] border-[#4760FD] rounded-10 -mt-2 flex justify-center items-center w-full py-5">
                                      <Button
                                        className="rounded-3xl font-display focus:shadow-outline w-[10rem] bg-[#fff] p-4 py-2 font-semibold tracking-wide shadow-lg transition-colors delay-150 ease-in-out hover:bg-slate-300 focus:outline-none text-[#1B1687]"
                                        onClick={() => {
                                          if (
                                            plan?.plan_duration?.plan_type
                                              ?.name === "INDIVIDUAL"
                                          ) {
                                            setPlanType({
                                              phone_number: String(
                                                users?.phone_number
                                              ),
                                              number_of_recipient: String(
                                                planCounts[
                                                  plan.id.toString()
                                                ] || 0
                                              ),
                                              duration: String(
                                                plan?.plan_duration?.duration
                                              ),
                                              amount:
                                                healthPlan?.package_name ===
                                                "FAMILY"
                                                  ? formatCurrency(
                                                      getAmountDeduction(
                                                        Number(
                                                          removeCommaFromPrice(
                                                            String(
                                                              percentageCalc?.base_price
                                                            )
                                                          )
                                                        ),
                                                        plan?.plan_duration
                                                          ?.duration,
                                                        planCounts[
                                                          plan.id.toString()
                                                        ] || 0,
                                                        getPercentage(
                                                          plan?.plan_duration?.plan_type?.name?.toLowerCase() as PlanType,
                                                          planCounts[
                                                            plan.id.toString()
                                                          ]
                                                        )
                                                      )
                                                    )
                                                  : formatCurrency(
                                                      Number(
                                                        removeCommaFromPrice(
                                                          String(plan?.price)
                                                        )
                                                      )
                                                    ),
                                              play_type:
                                                healthPlan?.package_name,
                                            });

                                            setShowPaymentConfirmation(true);
                                          } else if (
                                            plan?.plan_duration?.plan_type
                                              ?.name === "FAMILY"
                                          ) {
                                            setBuyFamilyPlan(true);
                                          } else {
                                            setBuyPlanForCoporate(true);
                                          }
                                        }}
                                      >
                                        Get Insurance
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </TabsContent>
                      ))}
                    </Tabs>
                  </div>
                  <div
                    className={`flex sm:flex-row justify-between  px-6 w-full pb-1 items-center ${selectedTab === "Individual" ? " mt-[1rem]" : ""} gap-1 flex-nowrap`}
                  >
                    <Link href={"#"} className="text-[#AFD85B] text-sm">
                      <span className="text-[#747577]">
                        Terms & Conditions Apply:
                      </span>{" "}
                      libertyaasured.com
                    </Link>
                    {/* <Button
                      type="button"
                      className="bg-[#525668] rounded-[1.25rem] px-5 py-3 font-semibold text-white"
                      onClick={() => router.push("/")}
                    >
                      Skip
                    </Button> */}
                  </div>
                </>
              )}
            </DialogBody>
          </DialogContent>
        </Dialog>
      )}

      {showPaymentConfirmation && (
        <ConfirmPayment
          setShowPaymentConfirmation={setShowPaymentConfirmation}
          showPaymentConfirmation={showPaymentConfirmation}
          planType={planType}
          setPaymentData={setPaymentData}
          setShowPaymentModal={setShowPaymentModal}
          setSelectPlanModal={setSelectPlanModal}
        />
      )}

      {buyPlanForCoporate && (
        <BuyPlanModalForCoperate
          heading="Beneficiary Details"
          isBuyPlanModalOpen={buyPlanForCoporate}
          setBuyPlanModal={setBuyPlanForCoporate}
          subsection="Kindly enter the details below to activate beneficiary ."
        />
      )}

      {BuyPlan && (
        <AddPrinciplePhoneNumer
          openCheckPhoneNumberModal={BuyPlan}
          setOpenCheckPhoneNumberModal={setBuyPlan}
          setBuyFamilyPlan={setBuyFamilyPlan}
        />
      )}

      {buyFamilyPlan && (
        <BuyPlanModal
          heading="Beneficiary Details"
          isBuyPlanModalOpen={buyFamilyPlan}
          setBuyPlanModal={setBuyFamilyPlan}
          subsection="Kindly enter the details below to activate beneficiary ."
        />
      )}

      <ErrorModal
        isErrorModalOpen={isErrorModalOpen}
        setErrorModalState={() => {
          setErrorModalState(false);
        }}
        subheading={
          errorModalMessage ||
          errorMsg ||
          "Please check your inputs and try again."
        }
      ></ErrorModal>
    </div>
  );
};

export default MakePaymentModal;
