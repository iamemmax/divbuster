"use client";
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
import { useErrorModalState } from "@/hooks";
import useDataStore from "@/app/store/useStore";
import { Spinner } from "@/icons/core";
import { getPecentage } from "@/app/(dashboard)/comp/components/plans/api/fetchPercentagePrice";
import {
  getAmountDeduction,
  getPercentage,
} from "@/app/(dashboard)/comp/components/plans/util/planCalc";
import { getPlan } from "../../misc/components/insurance/api/plan/getPlan";
import UserIcons from "../../misc/components/insurance/icons/Usericon";
import RemitalListIcon from "../../misc/components/insurance/icons/RemitalListIcon";

interface Prop {
  setOpenShowRemitalPlan: Dispatch<SetStateAction<boolean>>;
  openRemitalPlan: boolean;
  userId: string;
  setOpenCheckPhoneNumberModal: React.Dispatch<React.SetStateAction<boolean>>;
  referalPlan: React.Dispatch<
    React.SetStateAction<{
      duration: string;
      amount: string;
      number_of_recipient: string;
      play_type: string;
    }>
  >;
}
interface PercentageData {
  [key: number]: number;
}

export interface PercentageCalc {
  percentage_data: {
    family: PercentageData;
    individual: PercentageData;
    corporate: PercentageData;
  };
  base_price: number;
}

// Define the type for the health plan
export type PlanType = "family" | "individual" | "corporate";

const Page = ({
  openRemitalPlan,
  setOpenShowRemitalPlan,
  userId,
  setOpenCheckPhoneNumberModal,
  referalPlan,
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

  const [errorMsg, setErrorMsg] = useState("");
  // const [showSubmitModal, setShowSubmitModal] = useState(false);
  // const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [planCounts, setPlanCounts] = useState<Record<string, number>>({});

  const { data: plansData, isLoading: loadingPlan } = useQuery({
    queryFn: getPlan,
    queryKey: ["get-referral-name-plans"],
  });

  //   console.log(plansData);

  const [selectedTab, setSelectedTab] = useState(
    plansData ? plansData[0]?.package_name : "INDIVIDUAL"
  );

  useEffect(() => {
    if (plansData) {
      setSelectedTab(plansData[0]?.package_name);
    }
  }, [plansData]);

  const increment = (planId: string) => {
    setPlanCounts((prevCounts) => {
      const currentCount = prevCounts[planId] || 0;

      if (selectedTab === "FAMILY" && currentCount >= 6) {
        setErrorMsg("Maximum of 6 plans allowed for FAMILY.");
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
    //   console.error(No data found for type: ${type});
      return 0; // or handle this case as needed
    }

    // Convert number to string for indexing
    const key = number > 8 ? 8 : number;

    if (key in percentageData) {
      const value = percentageData[key];
      if (typeof value === "number") {
        return value;
      } else {
        // console.error(Unexpected type for key ${key}: ${typeof value});
        return 0; // or handle unexpected type
      }
    } else {
    //   console.warn(Key ${key} not found in percentageData for type: ${type});
      return 0; // or some default value if the key doesn't exist
    }
  }

  return (
    <main className="bg-main text-white size-full  py-5 px-6 md:px-[120px]">
      {/* {loadingPlan ? (
        <div className="fixed z-[999999999999999999999999] inset-0 bg-white flex justify-center items-center">
          <Spinner color="white" />
        </div>
      ) : (
        <div>
          
        </div>
      )} */}
      jjjjjjjj
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
    </main>
  );
};

export default Page;