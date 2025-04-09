"use client";

import { cn } from "@/utils/classNames";
import { RightUpArrow } from "@/icons/core";
import { Button } from "@/components/core";


import {  useState } from "react";
import CheckPhoneNumber from "./insurance/modals/CheckPhoneNumber";
import NonRemitalModal from "./insurance/modals/non-remital/NonRemitalModal";

import CreatepasswordModal from "./insurance/modals/remital/CreatePassWordModal";
import RemitalModalDetails from "./insurance/modals/remital/RemitalModalDetails";
import RemitalPlanModal from "./insurance/modals/remital/RemitalPlanModal";
import RemitalUserDetails from "./insurance/modals/remital/RemitalUserDetails";
import { useAuth } from "@/contexts/authentication";

export default function GetInsuranceButton() {
  const [openCheckPhoneNumberModal, setOpenCheckPhoneNumberModal] =
    useState(false);
  const [openRemitalDetailModal, setOpenRemitalDetailModal] = useState(false);
  const [phoneNumberCheckResponse, setPhoneNumberCheckResponse] = useState({
    id: "",
    address: "",
    full_name: "",
    ministry: "",
    state: "",
  });
  const [OpenRemitalUserDetail, setOpenRemitalUserDetail] = useState(false);
  const [userId, setUserId] = useState("");
  const [verifiedPhoneNumber, setVerifiedPhoneNumber] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [openRemitalPlan, setOpenShowRemitalPlan] = useState(false);
  const [openNonRemitalDetailModal, setOpenNonRemitalDetailModal] =
    useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [verifyResponse, setVerifyResponse] = useState({
    is_eligible: false,
    nin: "",
    bvn: "",
    address: "",
    email: "",
    id: "",
  });
  const { authState } = useAuth();
    const { isAuthenticated } = authState;
  return (
    
       <div className="">
       <div className="">
           <Button
                className={cn(
                  "flex items-center cursor-pointer justify-between text-black text-xs max-xxscren:text-xxs md:text-[0.865rem] text-left py-1.5 pr-1.5 pl-4 mt-4 rounded-full max-w-max",
                  "font-display"
                )}
                id="get-insurance-button"
                variant="white"
                onClick={() =>{
                  isAuthenticated?window.location.href="/plan":
                  setOpenCheckPhoneNumberModal(true)}}
              >
                Get insurance
                <span className="flex items-center justify-center p-2 rounded-full bg-main-light ml-2 sm:ml-4 md:ml-7">
                  <RightUpArrow className="" height={12} width={12} />
                </span>
              </Button>
       </div>


        {openCheckPhoneNumberModal && (
          <CheckPhoneNumber
            openCheckPhoneNumberModal={openCheckPhoneNumberModal}
            setPhoneNumberCheckResponse={setPhoneNumberCheckResponse}
            setOpenCheckPhoneNumberModal={setOpenCheckPhoneNumberModal}
            setOpenRemitalDetailModal={setOpenRemitalDetailModal}
            setOpenNonRemitalDetailModal={setOpenNonRemitalDetailModal}
            setVerifiedPhoneNumber={setVerifiedPhoneNumber}
            setUserId={setUserId}
            setOpenRemitalUserDetail={setOpenRemitalUserDetail}
            setVerifyResponse={setVerifyResponse}
            setUserEmail={setUserEmail}
            setShowPasswordModal={setShowPasswordModal}
          // setOpenNonRemitalDetailModal={setOpenNonRemitalDetailModal}
          />
        )}
        {/* remitals ............................................................ remita.................... */}
        {openRemitalDetailModal && (
          <RemitalModalDetails
            setOpenRemitalDetailModal={setOpenRemitalDetailModal}
            openRemitalDetailModal={openRemitalDetailModal}
            phoneNumberCheckResponse={phoneNumberCheckResponse}
            verifiedPhoneNumber={verifiedPhoneNumber}
            setOpenRemitalUserDetail={setOpenRemitalUserDetail}
            setUserEmail={setUserEmail}
          />
        )}
        {OpenRemitalUserDetail && (
          <RemitalUserDetails
            setOpenRemitalUserDetail={setOpenRemitalUserDetail}
            OpenRemitalUserDetail={OpenRemitalUserDetail}
            userId={userId}
            setOpenShowRemitalPlan={setOpenShowRemitalPlan}
            verifyResponse={verifyResponse}
            userEmail={userEmail}
            setShowPasswordModal={setShowPasswordModal}
          />
        )}

        {showPasswordModal && (
          <CreatepasswordModal
            userEmail={userEmail}
            setShowPasswordModal={setShowPasswordModal}
            showPasswordModal={showPasswordModal}
            setOpenShowRemitalPlan={setOpenShowRemitalPlan}
            verifiedPhoneNumber={verifiedPhoneNumber}
          />
        )}
        {openRemitalPlan && (
          <RemitalPlanModal
            openRemitalPlan={openRemitalPlan}
            setOpenShowRemitalPlan={setOpenShowRemitalPlan}
            userId={userId}
            verifyResponse={verifyResponse}
            verifiedPhoneNumber={verifiedPhoneNumber}
          />
        )}
        {openNonRemitalDetailModal && (
          <NonRemitalModal
            verifiedPhoneNumber={verifiedPhoneNumber}
            setPhoneNumberCheckResponse={setPhoneNumberCheckResponse}
            openNonRemitalDetailModal={openNonRemitalDetailModal}
            setOpenRemitalDetailModal={setOpenRemitalDetailModal}
            setOpenNonRemitalDetailModal={setOpenNonRemitalDetailModal}
            setOpenRemitalUserDetail={setOpenRemitalUserDetail}
            userId={userId}
            verifyResponse={verifyResponse}
            setUserEmail={setUserEmail}
          />
        )}
       
      </div>

   
  );
}
