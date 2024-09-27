"use client";
import React, { useState } from "react";
import { Button } from "@/components/core";
import CopyIcon3 from "../icons/CopyIcon3";
import { SmallSpinner } from "@/icons/core";
import { capitalizeFirstLetter } from "@/utils";
import { UserDataTypes, useUser } from "@/app/(auth)/(onboarding)/misc";
import { useClipboard } from "@/hooks";
import { useQuery, useQueryClient } from "react-query";
import { fetchReferralCode } from "../../dashboard/api/referral/fetchReferralCode";
import { getPlan } from "@/app/(main)/misc/components/insurance/api/plan/getPlan";
import ActiveIcon from "../icons/ActiveIcon";
import Image from "next/image";
import MakePaymentModal from "./payment/MakePayment";
import MakePaymentDetailsModal from "./payment/MakePaymentDetailsModal";
import { getUserCurrentPlan } from "../../dashboard/api/getCurrentPlan";



interface Prop {
    userData: UserDataTypes | undefined;
    loadinUser: boolean;
}



const ViewBeneficiaryHeader = ({ loadinUser, userData: users }: Prop) => {
    const { data: currentPlan, isLoading: loadingPlan } = useQuery({
        queryFn: () => getUserCurrentPlan(String(users?.phone_number)),
        queryKey: ["fetch-user-current-plan", users?.phone_number],
        enabled: !!users?.phone_number,
    });


    const { data: userData, isLoading } = useUser();

    const { copy } = useClipboard();
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
        refetch,

        isLoading: loadinGenerate,
    } = useQuery({
        queryFn: () => fetchReferralCode(userData?.id as string),
        queryKey: ["generate-referral-code", userData?.id],
        enabled: false,
        onSuccess: () => {
            // Invalidate user details query to refetch data
            queryClient.invalidateQueries(["user-details", data?.referral_code]);
        },
    });
    const { data: plansData } = useQuery({
        queryFn: getPlan,
        queryKey: ["get-plans"],
    });
    const makePayment =
        userData?.subscription_status === "NOT_ACTIVE" ||
        userData?.subscription_status === "PENDING" ||
        userData?.subscription_status === "FAILED";
    return (
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
                        <div className="flex  flex-col ">
                            <h2 className="text-white text-sm md:text-base font-medium">
                                {capitalizeFirstLetter(String(userData?.first_name))}{" "}
                                {capitalizeFirstLetter(String(userData?.last_name))}
                            </h2>
                            <div className="flex justify-between items-center w-full ">
                                <div className="flex items-center gap-x-3 flex-1">
                                    <div className="">
                                        <h2 className="text-sm flex text-[#FFFFFFB2] font-medium font-sans">
                                            <p className="text-[#8490A8] text-sm">Enrolment ID:</p>
                                            {currentPlan?.enrolement_id
                                                ? currentPlan?.enrolement_id
                                                : "Nil"}
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
                    <div className="flex items-center   gap-2  ">
                        {userData?.referral_code ? (
                            <div className="flex items-center gap-2">
                                <div
                                    className="flex items-center justify-center flex-col gap-x-2 bg-[#21253d] px-4 rounded-lg cursor-pointer border-opacity-70 py-[.5625rem] "
                                    onClick={() =>
                                        copy(
                                            `https://www.libertylifeplus.com/?referral_code=${userData?.referral_code}` ??
                                            ""
                                        )
                                    }
                                >
                                    <p className="text-white text-xxs text-opacity-60">
                                        Referral link
                                    </p>
                                    <div className="flex">
                                        <p className="text-white max-w-[6.25rem] text-xxs truncate">
                                            {`https://www.libertylifeplus.com/?referral_code=${userData?.referral_code}`}
                                        </p>
                                        <Button className=" text-white px-0  py-[.0625rem]  flex items-start bg-transparent text-xs font-medium">
                                            <CopyIcon3 height={15} width={15} />
                                        </Button>
                                    </div>
                                </div>

                                <div
                                    className="flex items-center justify-center flex-col gap-x-2 bg-[#21253d] px-6 rounded-lg cursor-pointer border-opacity-70 py-[.5625rem] "
                                    onClick={() => copy(userData?.referral_code ?? "")}
                                >
                                    <p className="text-white text-xxs text-opacity-60">
                                        Referral Code
                                    </p>
                                    <div className="flex">
                                        <p className="text-white max-w-[3.25rem] text-xxs truncate">
                                            {userData?.referral_code ?? ""}
                                        </p>
                                        <Button className=" text-white px-0  py-[.0625rem]  flex items-start bg-transparent text-xs font-medium">
                                            <CopyIcon3 height={15} width={15} />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <Button onClick={() => refetch()}>
                                {loadinGenerate ? (
                                    <SmallSpinner color="white" />
                                ) : (
                                    "Generate Referral"
                                )}
                            </Button>
                        )}
                        {makePayment && (
                            <Button
                                className="bg-[#099976] h-[2.8125rem] text-white  text-xs font-medium"
                                onClick={() => setshowMakePaymentModal(true)}
                            >
                                Make Payment
                            </Button>
                        )}
                        {userData?.subscription_status === "EXPIRED" && (
                            <Button
                                className="bg-[#099976] h-[2.8125rem] text-white  text-xs font-medium"
                                onClick={() => setshowMakePaymentModal(true)}
                            >
                                Renew plan
                            </Button>
                        )}
                        {userData?.subscription_status === "SUCCESS" && (
                            <Button
                                className="bg-[#099976] h-[2.8125rem] text-white text-xs font-medium"
                                disabled
                            >
                                {userData?.subscription_status === "SUCCESS" && "Active"}
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
    );
};

export default ViewBeneficiaryHeader;
