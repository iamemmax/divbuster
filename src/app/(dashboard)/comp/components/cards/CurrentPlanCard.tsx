import { UserDataTypes, useUser } from "@/app/(auth)/(onboarding)/misc";
import { getUserCurrentPlan } from "@/app/(dashboard)/dashboard/api/getCurrentPlan";
import { Spinner } from "@/icons/core";
import { capitalizeFirstLetter } from "@/utils";
import moment from "moment";
import React from "react";
import { useQuery } from "react-query";

interface Prop {
  userData: UserDataTypes | undefined;
  loadinUser: boolean;
}
const CurrentPlanCard = ({ loadinUser, userData: users }: Prop) => {
  const { data: currentPlan, isLoading: loadingPlan } = useQuery({
    queryFn: () => getUserCurrentPlan(String(users?.phone_number)),
    queryKey: ["fetch-user-current-plan", users?.phone_number],
    enabled: !!users?.phone_number,
  });
  const makePayment =
    users?.subscription_status === "NOT_ACTIVE" ||
    users?.subscription_status === "PENDING" ||
    users?.subscription_status === "FAILED";
  return (
    <div className="bg-white rounded-10 px-6 py-4 shadow-sm">
      {loadingPlan || loadinUser ? (
        <div className="flex justify-center h-full items-center w-full py-6">
          <Spinner className="w-4  h-4 " color="#DB8C00" />
        </div>
      ) : (
        <>
          <div className="py-[.1875rem] bg-[#31D0AA26] w-[4.625rem] px-2 rounded-lg">
            <p className="text-[.625rem] text-[#099976] ">Current plan</p>
          </div>
          <div className=" mt-[.625rem] grid w-full  grid-cols-2 ">
            <div className="mt-3">
              <h2 className="text-xs text-[#032282] font-medium font-sans">
                {currentPlan?.enrolee_name ? currentPlan?.enrolee_name : "Nil"}
              </h2>
              <p className="text-[#8490A8] text-[.625rem]">Enrolee name</p>
            </div>
            <div className="mt-2">
              <h2 className="text-xs text-[#032282] font-medium font-sans">
                {/* {capitalizeFirstLetter(
                  String(users?.subscription_status?.toLowerCase())
                )}{" "} */}
                {!makePayment ? (
                  <button className="bg-[#31D0AA26] rounded-md px-2 py-1 text-[#099976] text-[.625rem]">
                    {capitalizeFirstLetter(
                      String(users?.subscription_status?.toLowerCase())
                    )}
                  </button>
                ) : (
                  <button className="bg-[#31D0AA26] rounded-md px-2 py-1 text-[#099976] text-[.625rem]">
                    {capitalizeFirstLetter(
                      String(
                        users?.subscription_status === "SUCCESS" && "Active"
                      )
                    )}
                  </button>
                )}
              </h2>
              <p className="text-[#8490A8] text-[.625rem]">Plan type</p>
            </div>
            <div className="mt-3">
              <h2 className="text-xs text-[#032282] font-medium font-sans">
                {currentPlan?.enrolement_id
                  ? currentPlan?.enrolement_id
                  : "Nil"}
              </h2>
              <p className="text-[#8490A8] text-[.625rem]">Enrolment ID</p>
            </div>
            <div className="mt-3">
              <h2 className="text-xs text-[#032282] font-medium font-sans">
                {currentPlan?.expires_on
                  ? moment(currentPlan?.expires_on).format("MMM Do YY")
                  : "Nil"}
              </h2>
              <p className="text-[#8490A8] text-[.625rem]">Expires on</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CurrentPlanCard;
