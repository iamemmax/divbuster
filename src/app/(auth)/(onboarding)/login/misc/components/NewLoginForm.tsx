'use client';

import { Label } from '@radix-ui/react-label';
import { useRouter } from 'next/navigation';
import * as React from 'react';

import { Button } from '@/components/core/Button';
import { ErrorModal } from '@/components/core/ErrorModal';
import { Input } from '@/components/core/Input';
import { LinkButton } from '@/components/core/LinkButton';
import { LoaderModal } from '@/components/core/LoaderModal';
import { useBooleanStateControl, useErrorModalState } from '@/hooks';
import { getInputValueFromForm } from '@/utils/forms';
import { useLogin } from '../../../misc';

import { AxiosError } from 'axios';
import { formatAxiosErrorMessage } from '@/utils';

interface GetStartedProps {
  referral_code?: string | null
}


export function PhoneLoginForm({ }: GetStartedProps) {
  const router = useRouter();
  const { state: isLoaderModalOpen, setTrue: _openLoaderModal } =
    useBooleanStateControl();
  const {
    isErrorModalOpen,
    setErrorModalState,
    closeErrorModal,
    openErrorModalWithMessage,
    errorModalMessage,
  } = useErrorModalState();

  const { mutate: postLogIn, isLoading: isLoginLoading } = useLogin();

  // Ensure old cookies get cleared out when users get redirected to login.

  async function handleSignIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const phone = getInputValueFromForm(form, 'phone');

    // console.log(email, password)
    const updatedData = {
      phone: phone,
      device_type: 'MOBILE'
    };

    postLogIn(updatedData, {
      onSuccess: () => {
        router.push('/dashboard');
      },
      onError: error => {

        const errorMessage = formatAxiosErrorMessage(error as AxiosError);
        openErrorModalWithMessage(errorMessage as string);

      },
    });
  }

  return (
    <>
      <LoaderModal isOpen={isLoaderModalOpen} />

      <form className="relative z-10" onSubmit={handleSignIn}>
        <Label className="text-white font-sans text-sm mb-2" htmlFor="phone">
          Phone Number
        </Label>
        <Input
          className="login-autofill-text mt-2 login-no-chrome-autofill-bg h-auto rounded-lg  !bg-white/10 px-6 py-3.5 text-sm font-sans font-medium text-white placeholder:text-white focus:!bg-white/30 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#403C3A]"
          id="phone"
          name="phone"
          placeholder="Enter phone number"
          type="tel"
          required
        />

        <Button
          className="my-6 mt-16 block w-full rounded-[20px] text-[#1B1687] font-sans py-[.9375rem] text-base leading-[normal]"
          disabled={isLoginLoading}
          type="submit"
          variant="white"
        >
          {isLoginLoading ? 'Loading' : 'Login'}

        </Button>
      </form>

      <ErrorModal
        isErrorModalOpen={isErrorModalOpen}
        setErrorModalState={setErrorModalState}
        subheading={
          errorModalMessage || 'Please check your inputs and try again.'
        }
      >
        <div className="flex gap-3 rounded-2xl bg-red-50 px-8 py-6">
          <Button
            className="grow bg-red-950 px-1.5 sm:text-sm md:px-6"
            size="lg"
            type="button"
            onClick={closeErrorModal}
          >
            Okay
          </Button>
        </div>
      </ErrorModal>
    </>
  );
}
