"use client";
import React from "react";
import { OnboardingPageWrapper } from "../misc";
import { ForgetPasswordForm } from "./components/ForgetPassWordForm";

const page = () => {
  return (
    <OnboardingPageWrapper
      heading="Forgot Password?"
      subHeading="Enter your phone number and we will send an otp  to reset your password. "
    >
      <ForgetPasswordForm />
    </OnboardingPageWrapper>
  );
};

export default page;
