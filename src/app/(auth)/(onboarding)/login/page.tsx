'use client'
import * as React from 'react';
import { OnboardingPageWrapper } from '../misc';
import { PhoneLoginForm } from './misc/components/NewLoginForm';

export default function Login() {

    return (
        <>

            <OnboardingPageWrapper
                heading="Welcome back! 👋"
                subHeading="Enter your enrollment phone number to login "
            >
                <PhoneLoginForm />
            </OnboardingPageWrapper>
        </>
    );
}
