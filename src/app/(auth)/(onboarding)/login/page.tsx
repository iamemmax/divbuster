"use client";
import React, { useState } from "react";
import { OnboardingPageWrapper } from "../misc";
import { PhoneLoginForm } from "./misc/components/NewLoginForm";
import { z } from "zod";
import { Label } from "@radix-ui/react-label";
import { Input2 } from "@/components/core/Input2";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, ErrorModal, LinkButton } from "@/components/core";
import { useCheckUserLoginStatus } from "../api/checkuserStatus";
import { formatAxiosErrorMessage } from "@/utils";
import { AxiosError } from "axios";
import { useErrorModalState } from "@/hooks";
import { SmallSpinner } from "@/icons/core";
import { userStatusTypes } from "../types/userStatusTypes";
import { useRouter } from "next/navigation";

const contactSchema = z.object({
  phone_number: z
    .string({ required_error: "Enter your phone number" })
    .trim()
    .min(10, { message: "Phone number should be at least 11 digits" }),
});
export type userStatusType = z.infer<typeof contactSchema>;

export default function Login() {
  const {
    isErrorModalOpen,
    setErrorModalState,
    // closeErrorModal,
    openErrorModalWithMessage,
    errorModalMessage,
  } = useErrorModalState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<userStatusType>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      phone_number: "",
    },

    mode: "onChange",
  });
  const router = useRouter();
  const [returninguser, setReturninguser] = useState(false);
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const [userPasswordNotSet, setUserPasswordNotSet] = useState(false);
  const { mutate: handleCheckStatus, isLoading } = useCheckUserLoginStatus();
  const onsubmit = ({ phone_number }: userStatusType) => {
    handleCheckStatus(phone_number, {
      onSuccess: (data: userStatusTypes) => {
        if (data?.has_set_password) {
          setReturninguser(true);
        } else {
          setUserPasswordNotSet(true);
        }
        setUserPhoneNumber(data?.phone_number);
      },
      onError: (error) => {
        const errorMessage = formatAxiosErrorMessage(error as AxiosError);
        if (errorModalMessage === "User not found") {
          router.push("/?get-started=true");
        }
        openErrorModalWithMessage(String(errorMessage));
      },
    });
  };

  return (
    <>
      <OnboardingPageWrapper
        heading="Welcome back! 👋"
        subHeading="Enter your enrollment phone number to login "
      >
        {!returninguser ? (
          <>
            <form className="mt-8" onSubmit={handleSubmit(onsubmit)}>
              <div className="w-full mt-[1rem] text-sm font-normal">
                <Label
                  className="mb-1 block text-xs  text-[#fff]"
                  htmlFor="phone"
                >
                  Phone Number
                </Label>

                <div className={`relative mt-[.25rem] `}>
                  <Input2
                    className={`${errors?.phone_number?.message ? "border border-red-700" : ""} h-12 rounded-lg text-[#fff]`}
                    placeholder="Enter your phone number"
                    type="number"
                    id="phone"
                    {...register("phone_number")}
                  />

                  {!userPasswordNotSet ? (
                    <div className="pb-[2rem]">
                      <Button
                        className=" mt-[3rem] flex items-center justify-center gap-x-2 font-display focus:shadow-outline w-full rounded-2xl bg-[#fff] p-4 py-3 font-semibold tracking-wide
                                    shadow-lg transition-colors delay-150 ease-in-out hover:bg-slate-300 focus:outline-none text-[#1B1687]"
                        type="submit"
                      >
                        Continue {isLoading && <SmallSpinner color="blue" />}
                      </Button>
                    </div>
                  ) : (
                    <LinkButton
                      className=" mt-[3rem] h-12 text-white border-[.0187rem] border-opacity-60 border-white flex items-center justify-center gap-x-2 font-display focus:shadow-outline w-full  bg-transparent p-4 py-3 font-semibold tracking-wide
                                 rounded-[1.25rem]   shadow-lg transition-colors delay-150 ease-in-out  focus:outline-none "
                      variant={"outlined"}
                      href={`/create-password?phone=${userPhoneNumber}`}
                    >
                      <p className="text-xxs font-normal">
                        Don’t have a password ?
                      </p>{" "}
                      Create password
                    </LinkButton>
                  )}
                </div>
              </div>
            </form>
          </>
        ) : (
          <PhoneLoginForm userPhoneNumber={userPhoneNumber} />
        )}

        {errorModalMessage !== "User not found" && (
          <ErrorModal
            isErrorModalOpen={isErrorModalOpen}
            setErrorModalState={() => {
              if (errorModalMessage === "User not found") {
                router.push("/?get-started=true");
              } else {
                setErrorModalState(false);
              }
            }}
            subheading={
              errorModalMessage || "Please check your inputs and try again."
            }
          ></ErrorModal>
        )}
      </OnboardingPageWrapper>
    </>
  );
}
