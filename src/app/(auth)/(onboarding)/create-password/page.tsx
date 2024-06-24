

'use client'

import { OnboardingPageWrapper } from "../misc";
import { PasswordForm } from "./misc/components/PasswordForm";





export default function CreatePassword() {

    return (
        <>

            <OnboardingPageWrapper
                heading="Create Password"
                subHeading="Enter your unique password for security reasons "
            >

            <PasswordForm/>
            
            </OnboardingPageWrapper>
        </>
    );
}