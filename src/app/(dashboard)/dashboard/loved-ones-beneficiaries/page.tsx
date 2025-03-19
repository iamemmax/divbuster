"use client";
import React, { useState } from "react";
import DashboardPlanHeader from "../../comp/components/DashboardPlanHeader";
import WalletCard from "../../comp/components/cards/WalletCard";
import { useUser } from "@/app/(auth)/(onboarding)/misc";
import { useQuery } from "react-query";
import { getBeneficiaries } from "../../comp/components/plans/api/fetchBeneficairies";
import { LinkButton } from "@/components/core";
import BackIcon from "../../comp/icons/Backicon";
import CurrentPlanCard from "../../comp/components/cards/CurrentPlanCard";
import LoveOneCard from "../../comp/components/cards/LoveOneCard";
import LovedOnesBeneficiaries from "../../comp/components/beneficiary/LovedOnesBeneficiaries";

const Page = () => {
  const { data: userData, isLoading } = useUser();
  const [fiterStatus, setFiterStatus] = useState("");
  const { data: beneficiaryList, isLoading: loadingBeneficial } = useQuery({
    queryFn: () => getBeneficiaries(fiterStatus),
    queryKey: ["fetch-Beneficiaries-list", fiterStatus],
    enabled: !!userData?.phone_number,
  });
  // const [showViw, setshowViw] = useState(second)

  return (
    <div className="relative bg-[#f5f9fe] w-full h-screen">
      <DashboardPlanHeader />

      <div className="bg-main flex items-start px-3  md:px-[4.5rem] lg:px-[7.5rem]px-6  lg:px-[4.5rem] 2xl:px-[7.5rem]">
        <LinkButton
          href={"/dashboard"}
          className="flex items px-0 bg-transparent gap-3"
          // onClick={() => router?.back()}
        >
          <BackIcon />
          <h2 className="text-white font-bold text-2xl">Loved Ones</h2>
        </LinkButton>
      </div>

      <div className="w-full h-12 bg-main py-10"></div>
      <div className="relative ">
        <div className=" inset-x-0 top-[-4rem] absolute">
        <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-[1.1fr_1fr_1.4fr] 3xl:grid-cols-[1.1fr_1fr_1.4fr_1fr] gap-3 px-6 lg:px-[4.5rem] 2xl:px-[7.5rem]">
  <CurrentPlanCard loadinUser={isLoading} userData={userData} />
  <LoveOneCard
    loadinUser={isLoading}
    userData={userData}
    loadingBeneficial={loadingBeneficial}
    beneficiaryList={beneficiaryList}
    showViewButton={false}
  />
  <WalletCard loadinUser={isLoading} userData={userData} />
</div>

          <LovedOnesBeneficiaries
            beneficiaryList={beneficiaryList && beneficiaryList[2]}
            loading={isLoading}
            setFiterStatus={setFiterStatus}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
