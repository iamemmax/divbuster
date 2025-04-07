"use client";
import React, { useState } from "react";
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/core";
import CopyIcon3 from "../icons/CopyIcon3";
import { SmallSpinner } from "@/icons/core";
import { capitalizeFirstLetter } from "@/utils";
import { useUser } from "@/app/(auth)/(onboarding)/misc";
import { useClipboard } from "@/hooks";
import { useQuery, useQueryClient } from "react-query";
import { fetchReferralCode } from "../../dashboard/api/referral/fetchReferralCode";
import { getPlan } from "@/app/(main)/misc/components/insurance/api/plan/getPlan";
import ActiveIcon from "../icons/ActiveIcon";
import Image from "next/image";
import MakePaymentModal from "./payment/MakePayment";
import MakePaymentDetailsModal from "./payment/MakePaymentDetailsModal";
import SelectDurationModal from "./plans/SelectDurationModal";
import UpdateUserAccount from "./beneficiary/UpdateUserAccount";
import ShowProcessingModal from "./payment/ShowProcessingModal";
import Select, { SingleValue } from "react-select";

interface ReferralOption {
  name: string;
  value: string;
}

const DashboardPlanHeader = () => {
  const { data: userData, isLoading } = useUser();
  
  const { copy } = useClipboard();
  const queryClient = useQueryClient();
  const [showUserDetailsModal, setShowUserDetailsModal] = useState(false)
  const [showProcessingModal, setShowProcessingModal] = useState(false)
  const [showDurationModal, setShowDurationModal] = useState(false);
  const [showMakePaymentModal, setshowMakePaymentModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [beneficiariesList, setBeneficiariesList] = useState<{
    beneficiaries: {
      name_of_beneficiary: string;
      phone_number_of_beneficiary: string;
      type_of_beneficary?: "ADULT" | "MINOR" | undefined;
    }[];
  }>();
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
    const NoUser = userData?.first_name === "" || userData?.first_name===null &&  userData?.last_name ==="" || userData?.last_name===null



    const handleRenewOneActionOnSelected = () => {
      const myList = {
        name_of_beneficiary: `${userData?.first_name} ${userData?.last_name}`,
        phone_number_of_beneficiary: userData?.phone_number as string,
        type_of_beneficary: "ADULT" as
          | "ADULT"
          | "MINOR"
          | undefined,
      };
  
      // Update the beneficiariesList state with the new item inside the beneficiaries array
     // Update the beneficiariesList state with the new item inside the beneficiaries array
     setBeneficiariesList({
      beneficiaries: [myList], // Wrap the single item in an array and assign it to the beneficiaries property
    });

    setShowDurationModal(true);
    };


    const style = {
      control: (base: any) => ({
          ...base,
          border: 0,
          background: "#F5F9FE",
          height: "2rem",
          boxShadow: "none",
          color: "#fff",
          
      }),
      option: (provided: any) => ({
          ...provided,
          color: "#333",
          background: "#fff",
          fontSize: "12px",
          
          "&:hover": {
              background: "#F5F9FE",
          },
      }),
      singleValue: (provided: any) => ({
          ...provided,
          color: "#032282",
          fontSize: "12px",
          textTransform: "capitalize",
      }),
      placeholder: (base:any) => ({
        ...base,
        fontSize: '0.75rem', // Reduce the font size of the placeholder text
        color: '#a0aec0', // Optional: you can customize the color of the placeholder too
      }),
  };
  
  const referralOption = [
    {name:"Referral code", value:`${  userData?.referral_code}`},
  {name:"Referral Links", value:`https://www.libertylifeplus.com/plan?referral_code=${userData?.referral_code}`}]
      const selectRefferalOptions = referralOption?.map((link) => ({
          value: link?.value,
          label: link?.name,
         
      }));

      const [selectedOption, setSelectedOption] = useState<SingleValue<{ value: string; label: string }>>(null);
    
    
      // Handle when an option is selected
      const handleSelectChange = (selected: SingleValue<{ value: string; label: string }>) => {
        setSelectedOption(selected);
    
        copy(`${selected?.value}`)
      };
      return (
    <div className=" bg-main py-4 md:py-6 px-6  lg:px-[4.5rem] 2xl:px-[7.5rem]  ">
      {isLoading ? (
        <div className="w-full h-24 flex justify-center items-center">
          {" "}
          <SmallSpinner color="white" />
        </div>
      ) : (
        <div className="bg-main w-full flex justify-between flex-wrap  gap-3 items-center   ">
          <div className="flex items-center  gap-x-3 ">
          <div className="text-white h-[2.5rem] w-[2.5rem] relative">
  <Image
    alt="user icon"
    src={userData?.profile_image_object?.img_url || `/images/userIcon.png`}
    layout="fill"
    className="rounded-full object-cover"
  />
</div>

            <div className="flex  flex-col ">
              <h2 className="text-white text-sm md:text-base font-medium">
                {capitalizeFirstLetter(String(userData?.first_name ??""))}{" "}
                {capitalizeFirstLetter(String(userData?.last_name??""))}
              </h2>
              <div className="flex justify-between flex-wrap items-center w-full ">
                <div className="flex items-center flex-wrap gap-3 flex-1">
                  <p className="text-[#6E6E8B] text-xs md:text-sm font-medium">
                    Welcome, How are you today?
                  </p>
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
          <div className="flex items-center   flex-wrap  gap-2  ">
            {userData?.referral_code ? (
              <>
              <div className="hidden  lg:flex items-center gap-2">
                <div
                  className=" flex items-center justify-center flex-col gap-x-2 bg-[#21253d] px-4 rounded-lg cursor-pointer border-opacity-70 py-[.5625rem] "
                  onClick={() =>
                    copy(
                      `https://www.libertylifeplus.com/plan?referral_code=${userData?.referral_code}`
                    )
                  }
                >
                  <p className="text-white text-xxs text-opacity-60">
                    Referral link
                  </p>
                  <div className="flex">
                    <p className="text-white max-w-[6.25rem] text-xxs truncate">
                      {`https://www.libertylifeplus.com/plan?referral_code=${userData?.referral_code}`}
                    </p>
                    <Button className=" text-white px-0  py-[.0625rem]  flex items-start bg-transparent text-xs font-medium">
                      <CopyIcon3 height={15} width={15} />
                    </Button>
                  </div>
                </div>

                <div
                  className="flex items-center justify-center flex-col gap-x-2 bg-[#21253d] px-3 md:px-6 rounded-lg cursor-pointer border-opacity-70 py-[.5625rem] "
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
              <div className="lg:hidden">
                                                                  



<Select
        options={selectRefferalOptions}
        defaultValue={selectRefferalOptions[0]??null}  // Pass the formatted options to React Select
        onChange={handleSelectChange}    // Handle change
        placeholder="Select Referral" // Placeholder text
        className="react-select-container"  // You can style it with Tailwind
        classNamePrefix="react-select" // Custom prefix for custom styles
        styles={style}
        isSearchable={false}
        components={{
            IndicatorSeparator: () => null,
        }}
      />
      
              </div>
              </>
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
                onClick={() =>{ 
                  NoUser ? setShowUserDetailsModal(true) : setshowMakePaymentModal(true)
                  
                  }}
              >
                Make Payment
              </Button>
            )}
            {userData?.subscription_status === "EXPIRED" && (
              <Button
                className="bg-[#099976] h-[2.8125rem] text-white  text-xs font-medium"
                onClick={handleRenewOneActionOnSelected}
              >
                Renew plan
              </Button>
            )}
            {userData?.subscription_status === "SUCCESS" && (
              <Button
                className="bg-[#099976] md:h-[2.8125rem] text-white text-xs font-medium"
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

{showDurationModal && (
        <SelectDurationModal
          isSelectPlanModalOpen={showDurationModal}
          setSelectPlanModal={setShowDurationModal}
          beneficiariesList={beneficiariesList}
          selectedPlan={plansData && plansData[1]?.data}
          planType={"INDIVIDUAL"}
          actionType="renewal"
    
setShowProcessingModal={setShowProcessingModal}
          
        />
      )}

{showUserDetailsModal && <UpdateUserAccount
      openUpdateDetails={showUserDetailsModal}
      setOpenUpdateDetails={setShowUserDetailsModal}
      // planType="family"
      setOpenPlanModal={setshowMakePaymentModal}
      userData={userData}
      />}

{showProcessingModal&&<ShowProcessingModal
      showProcessing={showProcessingModal}
      setShowProcessing={setShowProcessingModal}
      
      />}
    </div>

    
  );
};

export default DashboardPlanHeader;
