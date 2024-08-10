"use client";
import React, { useState } from "react";
import DashboardPlanHeader from "../../comp/components/DashboardPlanHeader";
import WalletCard from "../../comp/components/cards/WalletCard";
import { useUser } from "@/app/(auth)/(onboarding)/misc";
import { useQuery } from "react-query";
import { getBeneficiaries } from "../../comp/components/plans/api/fetchBeneficairies";
import { Spinner } from "@/icons/core";
import FamilyUserIcon from "../../comp/components/cards/icons/UserIcon";
import { Button, LinkButton } from "@/components/core";
import AvatarGroup from "../../comp/components/plans/family/AvaterGroup";
import { generateAvatars } from "../../comp/components/cards/TopCards";
import BuyPlanModal from "../../comp/components/plans/family/BuyPlanForFamily";
import { useRouter } from "next/navigation";
import BackIcon from "../../comp/icons/Backicon";
import { subtractFromSix } from "../../comp/components/plans/util/planCalc";
import FamilyBeneficiary from "../../comp/components/beneficiary/FamilyBeneficiary";
import CurrentPlanCard from "../../comp/components/cards/CurrentPlanCard";
import CorporateBeneficiary from "../../comp/components/beneficiary/CorporateBeneficiary";
import CorporateCard from "../../comp/components/cards/CorporateCard";

const Page = () => {
  const [BuyPlan, setBuyPlan] = useState(false);
  const { data: userData, isLoading } = useUser();
  const { data: beneficiaryList, isLoading: loadingBeneficial } = useQuery({
    queryFn: getBeneficiaries,
    queryKey: ["fetch-Beneficiaries-list"],
    enabled: !!userData?.phone_number,
  });

  const makePayment =
    userData?.subscription_status === "NOT_ACTIVE" ||
    userData?.subscription_status === "PENDING" ||
    userData?.subscription_status === "FAILED";
  const router = useRouter();
  return (
    <div className="relative bg-[#f5f9fe] w-full h-screen">
      <DashboardPlanHeader />

      <div className="bg-main px-6 flex items-start md:px-[4.5rem] lg:px-[7.5rem]">
        <LinkButton
          href={"/dashboard"}
          className="flex items px-0 bg-transparent gap-3"
          // onClick={() => router?.back()}
        >
          <BackIcon />
          <h2 className="text-white font-bold text-2xl">Corperate</h2>
        </LinkButton>
      </div>

      <div className="w-full h-12 bg-main py-10"></div>
      <div className="relative ">
        <div className=" inset-x-0 top-[-4rem] absolute">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 2xl:grid-cols-[1.1fr_1fr_1.4fr_1fr] px-6  md:px-[4.5rem] lg:px-[7.5rem] ">
            <CurrentPlanCard loadinUser={isLoading} userData={userData} />
            <CorporateCard
              loadinUser={isLoading}
              userData={userData}
              loadingBeneficial={loadingBeneficial}
              beneficiaryList={beneficiaryList}
            />
            <WalletCard loadinUser={isLoading} userData={userData} />
          </div>
          <CorporateBeneficiary
            beneficiaryList={beneficiaryList && beneficiaryList[1]}
            loading={isLoading}
          />
        </div>
      </div>
      {BuyPlan && (
        <BuyPlanModal
          heading="Beneficiary Details"
          isBuyPlanModalOpen={BuyPlan}
          setBuyPlanModal={setBuyPlan}
          subsection="Kindly enter the details below to activate beneficiary ."
        />
      )}
    </div>
  );
};

export default Page;
