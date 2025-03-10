"use client";
import React from "react";
import { OnboardingPageWrapper } from "../misc";
import SignupForm from "./components/SignupForm";

const page = () => {
  return (
    <OnboardingPageWrapper
      heading="Let’s Get Started"
      subHeading="Kindly fill the details below to create your Libertylife account. "
    >
<SignupForm/>
    </OnboardingPageWrapper>
  );
};

export default page;
