"use client";
import { OnboardingPageWrapper } from "@/app/(auth)/(onboarding)/misc";
import { LinkButton } from "@/components/core";
import React, { useState } from "react";
import CreateReferralPasswordModal from "../../../(main)/misc/components/insurance/modals/referral/CreateReferralPassword";

const Page = () => {
  return (
    <>
      <OnboardingPageWrapper
        heading="Create Password"
        subHeading="Enter your unique password for security reasons "
      >
        <CreateReferralPasswordModal />
      </OnboardingPageWrapper>
    </>
  );
};

export default Page;
