"use client";
import React from "react";
import { OnboardingPageWrapper } from "../misc";
import UpdatePassword from "./components/UpdatePassword";

const page = () => {
  return (
    <div className="w-full">
      <OnboardingPageWrapper
        heading="Create New Password"
        subHeading="Your new password must be different from the one previously used. "
      >
        <UpdatePassword />
      </OnboardingPageWrapper>
    </div>
  );
};

export default page;
