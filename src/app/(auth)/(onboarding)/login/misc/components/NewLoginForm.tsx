"use client";

import { Label } from "@radix-ui/react-label";
import { useRouter } from "next/navigation";
import * as React from "react";

import { Button } from "@/components/core/Button";
import { ErrorModal } from "@/components/core/ErrorModal";
import { Input } from "@/components/core/Input";

import { LoaderModal } from "@/components/core/LoaderModal";
import { useBooleanStateControl, useErrorModalState } from "@/hooks";
import { getInputValueFromForm } from "@/utils/forms";
import { useLogin } from "../../../misc";

import { AxiosError } from "axios";
import { formatAxiosErrorMessage } from "@/utils";
import { LinkButton } from "@/components/core";

interface GetStartedProps {
  referral_code?: string | null;
}

const PasswordInput: React.FunctionComponent = () => {
  const { state: isShown, toggle: toggleShow } = useBooleanStateControl();

  return (
    <div className="mt-3 flex items-center overflow-hidden rounded-lg !bg-white/30 transition duration-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 focus-within:ring-offset-[#403C3A]">
      <input
        className="login-autofill-text login-no-chrome-autofill-bg h-auto min-w-0 grow !bg-transparent py-3.5 pl-6 text-base font-medium text-white placeholder:text-white focus-visible:outline-none"
        id="password"
        // inputMode="numeric"
        name="password"
        // pattern="[0-9]*"
        placeholder="Passcode"
        type={isShown ? "text" : "password"}
        required
      />
      <Button
        className="bg-transparent px-6 py-3.5"
        size="unstyled"
        type="button"
        variant="unstyled"
        onClick={toggleShow}
      >
        <svg
          fill="none"
          height={20}
          viewBox="0 0 20 20"
          width={20}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M.833 9.63S4.167 3.21 10 3.21s9.167 6.42 9.167 6.42-3.334 6.42-9.167 6.42S.833 9.63.833 9.63Z"
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10 12.037c1.38 0 2.5-1.078 2.5-2.407 0-1.33-1.12-2.408-2.5-2.408S7.5 8.3 7.5 9.63c0 1.33 1.12 2.407 2.5 2.407Z"
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Button>
    </div>
  );
};

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
    const phone = getInputValueFromForm(form, "phone");
    const password = getInputValueFromForm(form, "password");

    // console.log(email, password)
    const updatedData = {
      phone_number: phone,
      password: password,
      device_type: "MOBILE",
    };

    postLogIn(updatedData, {
      onSuccess: () => {
        router.push("/dashboard");
      },
      onError: (error) => {
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

        <div className="mt-3">
          <Label
            className="text-white font-sans text-sm mb-2"
            htmlFor="password"
          >
            Password
          </Label>
          <PasswordInput />
        </div>

        <Button
          className="my-6 mt-16 block w-full rounded-[20px] text-[#1B1687] font-sans py-[.9375rem] text-base leading-[normal]"
          disabled={isLoginLoading}
          type="submit"
          variant="white"
        >
          {isLoginLoading ? "Loading" : "Login"}
        </Button>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-[9px]">
            <Input
              className="h-3 w-3"
              id="keep_me_logged"
              type="checkbox"
              value="yes"
            />
            <label
              className="select-none font-sans text-xs text-white"
              htmlFor="keep_me_logged"
            >
              Keep me logged in
            </label>
          </div>
          <div className="">
            <LinkButton
              href={"/forget-password"}
              className="text-white text-xs bg-transparent"
            >
              Forget Password?
            </LinkButton>
          </div>
        </div>
      </form>

      <ErrorModal
        isErrorModalOpen={isErrorModalOpen}
        setErrorModalState={setErrorModalState}
        subheading={
          errorModalMessage || "Please check your inputs and try again."
        }
      >
        {/* <div className="flex gap-3 rounded-2xl bg-red-50 px-8 py-6">
          <Button
            className="grow bg-red-950 px-1.5 sm:text-sm md:px-6"
            size="lg"
            type="button"
            onClick={closeErrorModal}
          >
            Okay
          </Button>
        </div> */}
      </ErrorModal>
    </>
  );
}
