"use client";
import React, { useState, useEffect } from "react";
import {
  Button,
  ClientOnly,
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  ErrorModal,
  RadioGroup,
  RadioGroupItem,
} from "@/components/core";
import CopyIcon2 from "../../icons/CopyIcon2";
import { Label } from "@radix-ui/react-label";

import {
  formatAxiosErrorMessage,
  formatCurrency,
  removeCommaFromPrice,
} from "@/utils";
import { useQuery } from "react-query";
import {
  getPlan,
  PlanData,
  plantypes,
} from "@/app/(main)/misc/components/insurance/api/plan/getPlan";
import { useErrorModalState } from "@/hooks";
import { AxiosError } from "axios";
import { beneficailData, useAddbeneficiaries } from "./api/addBeneficiariels";
import SelectPlanModal from "../Funds/Selectplan";
import { SmallSpinner } from "@/icons/core";
import { getPackagePlans } from "./api/fetchPackagePlan";
import { getPecentage } from "./api/fetchPercentagePrice";
import {
  calculateActualAmount,
  getAmountDeduction,
  getPercentage,
} from "./util/planCalc";
import { useAddMoreToBeneficiaryList } from "./api/addMoreBeneficiries";
import { useUser } from "@/app/(auth)/(onboarding)/misc";
import { useRenewBeneficiaryList } from "./api/renewBeneficiaries";
import { PaymentSuccessMsg } from "@/app/(main)/misc/components/insurance/modals/remital/RemitalSubmitPlan";
import { useMakeRemitalPayment } from "@/app/(main)/misc/components/insurance/api/remital/remitalpayment";

export interface successProp {
  account_number: number;
  account_name: string;
  bank_name: string;
  wallet_balance: number;
  people_added: number;
  plan_details: Plandetails;
  paystack_link: string;
  unique_request_id: string;
}

interface Plandetails {
  plan_duration: number;
  total_price: number;
  price: number;
}

interface UseBooleanStateControlProps {
  isSelectPlanModalOpen: boolean;
  setSelectPlanModal: React.Dispatch<React.SetStateAction<boolean>>;
  beneficiariesList:
    | {
        beneficiaries: {
          name_of_beneficiary: string;
          phone_number_of_beneficiary: string;
          type_of_beneficary?: "ADULT" | "MINOR";
        }[];
      }
    | undefined;
  selectedPlan: PlanData[] | undefined;
  planType: string;
  actionType: string;
}

function SelectDurationModal({
  isSelectPlanModalOpen,
  setSelectPlanModal,
  beneficiariesList,
  selectedPlan,
  planType,
  actionType,
}: UseBooleanStateControlProps) {
  const {
    isErrorModalOpen,
    setErrorModalState,
    openErrorModalWithMessage,
    errorModalMessage,
  } = useErrorModalState();
  const [errorMsg, setErrorMsg] = useState("");
  const { data: users } = useUser();
  const [SuccessPayment, setSuccessPayment] = useState(false);
  const { mutate: handleAddBeneficiary, isLoading } = useAddbeneficiaries();
  const [paymentProp, setPaymentProp] = useState<successProp>();
  const [SelectPlan, setSelectPlan] = useState(false);
  const [selectedValue, setSelectedValue] = useState(
    String(Number(selectedPlan && selectedPlan[0]?.plan_duration?.duration))
  );
  const [paymentAmount, setPaymentAmount] = useState<number | null>(null);
  const [totalAmount, setTotalAmount] = useState<number | null>(null);
  const [discountedAmount, setDiscountedAmount] = useState<number | null>(null);

  const { data: percentageCalc } = useQuery({
    queryFn: getPecentage,
    queryKey: ["fetch-percentage-list"],
  });

  function getPercentage(type: string, number: number): number {
    const percentageData = percentageCalc?.percentage_data[type];

    // Convert number to string for indexing
    const key = number > 8 ? "8" : number.toString();

    if (percentageData && percentageData.hasOwnProperty(key)) {
      return percentageData[key];
    } else {
      return 0; // or some default value if the key doesn't exist
    }
  }

  // Update calculations when relevant data changes
  useEffect(() => {
    if (selectedPlan && beneficiariesList?.beneficiaries) {
      const selectedPlanItem = selectedPlan.find(
        (plan) => String(plan.plan_duration.duration) === selectedValue
      );
      const basePrice = selectedPlanItem
        ? parseFloat(removeCommaFromPrice(String(percentageCalc?.base_price)))
        : 0;
      const numberOfBeneficiaries = beneficiariesList.beneficiaries.length;

      setPaymentAmount(basePrice);

      const calculatedTotalAmount = calculateActualAmount(
        basePrice,
        Number(selectedValue),
        numberOfBeneficiaries
      );
      setTotalAmount(calculatedTotalAmount);

      const percentage = getPercentage(
        planType?.toLowerCase(),
        numberOfBeneficiaries
      );
      setDiscountedAmount(
        getAmountDeduction(
          basePrice,
          Number(selectedValue),
          numberOfBeneficiaries,
          percentage
        )
      );
    }
  }, [selectedPlan, selectedValue, beneficiariesList, percentageCalc]);

  const handleChange = (value: string) => {
    setSelectedValue(String(value));
  };
  const { mutate: handlePaymentRequest } = useMakeRemitalPayment();

  const { mutate: addMoreBeneficiary, isLoading: loadingMoreBeneficiary } =
    useAddMoreToBeneficiaryList();
  const { mutate: handleRenewBene, isLoading: loadingRenew } =
    useRenewBeneficiaryList();
  const makePayment = () => {
    if (actionType === "makePayment") {
      if (users?.paid_beneficiary_requests?.includes(planType)) {
        addMoreBeneficiary(
          {
            beneficiariesList:
              beneficiariesList?.beneficiaries as beneficailData[],
            packages: planType,
            duration: Number(selectedValue),
          },
          {
            onSuccess: (data: successProp) => {
              setPaymentProp(data);
              setSelectPlan(true);
            },
            onError: (error) => {
              const errorMessage = formatAxiosErrorMessage(error as AxiosError);
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              //@ts-expect-error
              setErrorMsg(error?.response?.data?.error);
              openErrorModalWithMessage(String(errorMessage));
            },
          }
        );
      } else {
        handleAddBeneficiary(
          {
            beneficiariesList:
              beneficiariesList?.beneficiaries as beneficailData[],
            packages: planType,
            duration: Number(selectedValue),
          },
          {
            onSuccess: (data: successProp) => {
              setPaymentProp(data);
              setSelectPlan(true);
            },
            onError: (error) => {
              const errorMessage = formatAxiosErrorMessage(error as AxiosError);
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              //@ts-expect-error
              setErrorMsg(error?.response?.data?.error);
              openErrorModalWithMessage(String(errorMessage));
            },
          }
        );
      }
    } else {
      if (planType === "INDIVIDUAL") {
        handlePaymentRequest(
          {
            duration: Number(selectedValue),
            userId: users?.id as string,
            plan_type: planType,
            number_of_recipient: 1,
          },
          {
            onSuccess: (data: PaymentSuccessMsg) => {
              
                setPaymentProp({
                  account_name: data?.account_name,
                  plan_details: {
                    plan_duration: Number(selectedValue),
                    price: data?.amount,
                    total_price: data?.amount,
                  },
                  wallet_balance: Number(data?.wallet_balance),
                  unique_request_id: String(data?.unique_request_id),
                  account_number: Number(data?.account_no),
                  bank_name: data?.bank_name,
                  paystack_link: data?.paystack_link,
                  people_added: Number(1),
                });
            
              setSelectPlan(true);
            },
            onError: (error) => {
              const errorMessage = formatAxiosErrorMessage(error as AxiosError);
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              //@ts-expect-error
              setErrorMsg(error?.response?.data?.error);

              openErrorModalWithMessage(String(errorMessage));
            },
          }
        );
      } else {
    
  

        handleRenewBene(
          {
            beneficiariesList:
              beneficiariesList?.beneficiaries as beneficailData[],
            packages: planType,
            duration: Number(selectedValue),
          },
          {
            onSuccess: (data: successProp) => {
              setPaymentProp(data);
              setSelectPlan(true);
            },
            onError: (error) => {
              const errorMessage = formatAxiosErrorMessage(error as AxiosError);
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              //@ts-expect-error
              setErrorMsg(error?.response?.data?.error);
              openErrorModalWithMessage(String(errorMessage));
            },
          }
        );
      }
    }
  };

  return (
    <div className="rounded-xl">
      <ClientOnly>
        <Dialog open={isSelectPlanModalOpen}>
          <DialogContent className="!overflow-hidden">
            <DialogHeader className="bg-[#1B1687] ">
              <DialogTitle className="text-[#fff]">Select Duration</DialogTitle>
              <DialogClose
                className="rounded-10 bg-transparent border-[0.3px] border-[#407BFF]"
                onClick={() => setSelectPlanModal(false)}
              >
                <button>Close</button>
              </DialogClose>
            </DialogHeader>
            <DialogBody className="bg-[#141B3f]">
              <div className=" text-sm text-white">
                <p className="text-white text-sm w-4/5">
                  Kindly select any of the plans below to activate plan and make
                  payment.
                </p>
                <div className="text-[#FFFFFFCC] text-base gap-y-3 mt-5">
                  <RadioGroup
                    value={selectedValue}
                    onValueChange={handleChange}
                  >
                    {selectedPlan?.map((payment, idx) => (
                      <div
                        className="flex space-x-2 items-center mt-3 bg-[#FFFFFF1A] rounded-10 py-3 pl-4"
                        key={idx}
                      >
                        <RadioGroupItem
                          className="w-4 h-4 p-0 rounded-full border border-[#ffffff] bg-[#141B3F] checked:bg-[#407BFF] checked:border-[#407BFF]"
                          value={String(payment?.plan_duration?.duration)}
                          id={String(payment?.plan_duration?.duration)}
                        />
                        <Label
                          className="text-sm"
                          htmlFor={String(payment?.plan_duration?.duration)}
                        >
                          {Number(payment?.plan_duration?.duration)} Month Plan
                          <span className="text-white pl-2 font-bold text-sm">
                            {formatCurrency(
                              Number(
                                removeCommaFromPrice(String(payment?.price))
                              )
                            )}
                          </span>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="flex items-center gap-x-2 w-full py-4 bg-black rounded-lg mt-3 justify-center">
                  <p className="text-white text-lg font-bold">Total:</p>
                  {planType !== "LOVE_ONES" && (
                    <p className="text-white line-through text-lg text-opacity-80 font-bold">
                      {totalAmount !== null
                        ? formatCurrency(
                            Number(removeCommaFromPrice(String(totalAmount)))
                          )
                        : "0.00"}
                    </p>
                  )}
                  <p className="text-white text-lg font-bold">
                    {discountedAmount !== null
                      ? formatCurrency(
                          Number(removeCommaFromPrice(String(discountedAmount)))
                        )
                      : "0.00"}
                  </p>
                </div>
                <div className="w-full mt-6  flex items-center gap-3 py-5 text-sm font-normal">
                  <Button
                    className=" flex items-center gap-x-5 justify-center font-display focus:shadow-outline w-full rounded-2xl bg-[#fff] p-4  font-semibold tracking-wide
                                            shadow-lg transition-colors delay-150 ease-in-out hover:bg-slate-300 focus:outline-none text-[#1B1687]"
                    type="submit"
                    onClick={makePayment}
                  >
                    Make payment{" "}
                    {isLoading ||
                      loadingRenew ||
                      (loadingMoreBeneficiary && (
                        <SmallSpinner className="" color="#1B1687" />
                      ))}
                  </Button>
                </div>
              </div>
            </DialogBody>
          </DialogContent>
        </Dialog>
      </ClientOnly>
      <ErrorModal
        isErrorModalOpen={isErrorModalOpen}
        setErrorModalState={() => setErrorModalState(false)}
        subheading={
          errorModalMessage ||
          errorMsg ||
          "Please check your inputs and try again."
        }
      />
      {SelectPlan && (
        <SelectPlanModal
          heading="Select Plan"
          isSelectPlanModalOpen={SelectPlan}
          setSelectPlanModal={setSelectPlan}
          subsection="Kindly select any of the plans below to activate plan and make payment."
          paymentProp={paymentProp}
        />
      )}
    </div>
  );
}
export default SelectDurationModal;
