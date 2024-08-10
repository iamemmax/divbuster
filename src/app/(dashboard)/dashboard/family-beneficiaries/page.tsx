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
          <h2 className="text-white font-bold text-2xl">Family</h2>
        </LinkButton>
      </div>

      <div className="w-full h-12 bg-main py-10"></div>
      <div className="relative ">
        <div className=" inset-x-0 top-[-4rem] absolute">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 2xl:grid-cols-[1.1fr_1fr_1.4fr_1fr] px-6  md:px-[4.5rem] lg:px-[7.5rem] ">
            <CurrentPlanCard loadinUser={isLoading} userData={userData} />
            <div className="bg-white rounded-10 p-1">
              {loadingBeneficial || isLoading ? (
                <div className="flex justify-center h-full items-center w-full py-6">
                  <Spinner className="w-4  h-4 " color="#DB8C00" />
                </div>
              ) : (
                <div className="bg-[#F0F5FF] h-full flex flex-col shadow-sm rounded-10  px-6 py-[.875rem] ">
                  <div className="flex-1 py-1">
                    <div className="flex items-center gap-x-1">
                      <FamilyUserIcon />
                      <h2 className="text-sm font-semibold font-sans  text-[#032282]">
                        Family Plan
                      </h2>
                    </div>
                    {!makePayment ? (
                      <div className="mt-2">
                        <p className="text-[#475569] text-xxs">
                          Do something for your loved ones today by activating a
                          plan for them today
                        </p>
                      </div>
                    ) : (
                      <div className=" mt-[.8125rem] px-2 flex items-center gap-x-2">
                        <h2 className="text-[#032282] text-xl font-bold">
                          {beneficiaryList && beneficiaryList[0]?.data?.length}
                        </h2>
                        <div className="bg-white py-1 px-2 rounded-md">
                          <p className="text-xxs text-[#032282]">Benefactors</p>
                        </div>
                        <div className="p-4">
                          <AvatarGroup
                            avatars={generateAvatars(
                              Number(
                                beneficiaryList &&
                                  beneficiaryList[0]?.data?.length
                              )
                            )}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  {makePayment && (
                    <div className="justify-self-end flex items-center gap-4">
                      <div className="">
                        <h2 className="text-[#032282] text-xs font-semibold">
                          {subtractFromSix(
                            Number(
                              beneficiaryList &&
                                beneficiaryList[0]?.data?.length
                            )
                          )}{" "}
                          Slot
                        </h2>
                        <p className="text-[#8490A8] text-xxs">
                          Remaining Slot
                        </p>
                      </div>
                      <Button
                        className="bg-white rounded-md py-[.4375rem]  px-[.8125rem] text-[#032282] text-[.625rem]"
                        onClick={() => setBuyPlan(true)}
                      >
                        Add Member
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
            <WalletCard loadinUser={isLoading} userData={userData} />
          </div>
          <FamilyBeneficiary
            beneficiaryList={beneficiaryList && beneficiaryList[0]}
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
