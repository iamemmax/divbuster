'use client'

import ViewBeneficiaryHeader from '@/app/(dashboard)/comp/components/viewBeneficiaryHeader'
import { useQuery, useQueryClient } from 'react-query'
import { getBeneficiaryPlan } from '../../api/getBeneficiaryDetails'
import { format } from 'date-fns'
import React, { useState } from "react";
import { Button, LinkButton } from "@/components/core";
import { SmallSpinner } from "@/icons/core";
import { capitalizeFirstLetter } from "@/utils";
import { UserDataTypes, useUser } from "@/app/(auth)/(onboarding)/misc";
import { getPlan } from "@/app/(main)/misc/components/insurance/api/plan/getPlan";
import Image from "next/image";
import { fetchReferralCode } from '../../api/referral/fetchReferralCode'
import MakePaymentDetailsModal from '@/app/(dashboard)/comp/components/payment/MakePaymentDetailsModal'
import MakePaymentModal from '@/app/(dashboard)/comp/components/payment/MakePayment'
import ActiveIcon from '@/app/(dashboard)/comp/icons/ActiveIcon'
import { convertToTitleCase } from '@/utils/strings'
import { cn } from '@/utils/classNames'
import BackIcon from '@/app/(dashboard)/comp/icons/Backicon'
import { convertNumberToNaira } from '@/utils/currency'



interface Prop {
  userData: UserDataTypes | undefined;
  loadinUser: boolean;
}

const BeneficiaryDetailsPage = ({ params }: { params: { id: string } }, { loadinUser, userData: users }: Prop) => {
  const { id } = params
  const { data: beneficiary } = useQuery({
    queryFn: () => getBeneficiaryPlan(id),
    queryKey: ['get-beneficiary']
  })

  const { data: userData, isLoading } = useUser();

  const queryClient = useQueryClient();
  const [showMakePaymentModal, setshowMakePaymentModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentData, setPaymentData] = useState({
    account_name: "",
    account_no: "",
    amount: "",
    bank_name: "",
    paystack_link: "",
  });
  const {
    data,
    isLoading: loadinGenerate,
  } = useQuery({
    queryFn: () => fetchReferralCode(userData?.id as string),
    queryKey: ["generate-referral-code", userData?.id],
    enabled: false,
    onSuccess: () => {
      // Invalidate user details query to refetch data.........
      queryClient.invalidateQueries(["user-details", data?.referral_code]);
    },
  });
  const { data: plansData } = useQuery({
    queryFn: getPlan,
    queryKey: ["get-plans"],
  });
  const makePayment =
    beneficiary?.health_plan_status === "NOT_ACTIVE" ||
    beneficiary?.health_plan_status === "PENDING" ||
    beneficiary?.health_plan_status === "FAILED";

  console.log(beneficiary)
  return (
    <div>
      <div>
        <div className="bg-main px-6 flex pt-5 items-start md:px-[4.5rem] lg:px-[7.5rem]">
          <LinkButton
            href={"/dashboard"}
            className="flex items px-0 bg-transparent gap-3"
          >
            <BackIcon />
            <h2 className="text-white font-bold text-2xl">Plan Details</h2>
          </LinkButton>
        </div>
        <div className=" bg-main py-6 px-6  md:px-[4.5rem] lg:px-[7.5rem]  ">
          {isLoading ? (
            <div className="w-full h-24 flex justify-center items-center">
              {" "}
              <SmallSpinner color="white" />
            </div>
          ) : (
            <div className="bg-main w-full flex justify-between flex-wrap  gap-3 items-center   ">
              <div className="flex items-center  gap-x-3 ">
                <div className="text-white h-[2.5rem] w-[2.5rem]">
                  <Image
                    alt="user icon"
                    src={`/images/userIcon.png`}
                    height={40}
                    width={40}
                    className="rounded-full"
                  />
                </div>
                <div>
                  <div className="flex  flex-col ">
                    <h2 className="text-white text-sm md:text-base font-medium">
                      {capitalizeFirstLetter(String(beneficiary?.full_name))}{" "}
                    </h2>
                    <div className="flex justify-between items-center w-full ">
                      <div className="flex items-center gap-x-3 flex-1">
                        <div className="">
                          <h2 className="text-sm flex text-[#FFFFFFB2] font-medium font-sans">
                            <div>
                              <p className="text-white text-sm"> <span className="text-[#8490A8] text-sm">Phone Number:</span>{beneficiary?.phone_number}</p>
                              <p><span className="text-[#8490A8] text-sm">Enrolment Id:</span> {beneficiary?.enrollment_number ?? "Nil"} </p>
                            </div>
                          </h2>
                        </div>
                        {userData?.subscription_status === "SUCCESS" ? (
                          <div className="bg-[#142D22] rounded-lg py-2 px-3 flex items-center gap-[.375rem]">
                            <ActiveIcon />
                            <p className="text-[.625rem] text-[#12B669]">
                              Active plan
                            </p>
                          </div>
                        ) : (
                          <div className="bg-[#F6CE7F26] rounded-lg py-2 px-3 flex items-center gap-[.375rem]">
                            <ActiveIcon color="#DB8C00" />
                            <p className="text-[.625rem] text-[#DB8C00]">
                              Inactive plan
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center   gap-2  ">

                {makePayment && (
                  <Button
                    className="bg-[#099976] h-[2.8125rem] text-white  text-xs font-medium"
                    onClick={() => setshowMakePaymentModal(true)}
                  >
                    Make Payment
                  </Button>
                )}
                {beneficiary?.health_plan_status === "EXPIRED" && (
                  <Button
                    className="bg-[#099976] h-[2.8125rem] text-white  text-xs font-medium"
                    onClick={() => setshowMakePaymentModal(true)}
                  >
                    Renew plan
                  </Button>
                )}
                {beneficiary?.health_plan_status === "SUCCESS" && (
                  <Button
                    className="bg-[#099976] h-[2.8125rem] text-white text-xs font-medium"
                    disabled
                  >
                    {beneficiary?.health_plan_status === "SUCCESS" && "Active"}
                  </Button>
                )}
              </div>
            </div>
          )}
          {showMakePaymentModal && (
            <MakePaymentModal
              isSelectPlanModalOpen={showMakePaymentModal}
              setSelectPlanModal={setshowMakePaymentModal}
              planData={plansData}
              setShowPaymentModal={setShowPaymentModal}
              setPaymentData={setPaymentData}
            />
          )}
          {showPaymentModal && (
            <MakePaymentDetailsModal
              showMakePaymentModal={showPaymentModal}
              setShowPaymentModal={setShowPaymentModal}
              PaymentInfo={paymentData}
            />
          )}
        </div>
      </div>
      <div className='px-6 md:px-10 lg:px-[120px] bg-[#F0F5FF]  pb-10'>
        <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-x-4 lg:gap-x-6'>
          {
            beneficiary?.data.map((factors, ind) => (
              <div key={ind}>
                <article className='bg-white p-2 rounded-10 mt-10'>
                  <div className=' bg-[#F0F5FF] rounded-10 px-6 p-4 pb-6'>
                    <div>
                      <p
                        className={cn(
                          "rounded-md px-2 py-1 text-xxs max-w-[74px]",
                          factors?.status === "EXPIRED" && "text-[#EF4444] bg-[#EF444426]",
                          factors?.status === "PENDING" && " text-[#DB8C00] bg-[#F6CE7F26]",
                          factors?.status === "SUCCESS" && " text-[#099976] bg-[#31D0AA26]",
                        )}
                      >
                        {convertToTitleCase(factors?.status)}
                      </p>
                    </div>
                    <div className='grid grid-cols-2 mt-2.5 gap-y-5'>
                      <div className='text-[#032282] font-medium text-xs'>
                        {convertNumberToNaira(factors?.amount) ?? "0"}
                        <p className='text-[#8490A8] text-xxs'>Price</p>
                      </div>
                      <div className='text-[#032282] font-medium text-xs'>{factors?.insurance_duration ?? "Nil"} month
                        <p className='text-[#8490A8] text-xxs'>Duration</p>
                      </div>
                      <div className='text-[#032282] font-medium text-xs'>{format(factors?.date_created!, 'eee, qo MMM yyyy') ?? "Nil"}
                        <p className='text-[#8490A8] text-xxs'>Date Created</p>
                      </div>
                      <div className='text-[#032282] font-medium text-xs'>
                        {factors?.due_date ?
                          format(factors?.due_date!, 'eee, qo MMM yyyy' ?? "Nil")
                          :
                          ""
                        }
                        <p className='text-[#8490A8] text-xxs'>Expires on</p>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            ))
          }
        </section>
      </div>
    </div>
  )
}

export default BeneficiaryDetailsPage
