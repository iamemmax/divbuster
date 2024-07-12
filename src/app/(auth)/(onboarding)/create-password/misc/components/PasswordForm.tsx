"use client";

import { Label } from "@radix-ui/react-label";

import * as React from "react";

import { Button } from "@/components/core/Button";
import { ErrorModal } from "@/components/core/ErrorModal";
import { Input } from "@/components/core/Input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderModal } from "@/components/core/LoaderModal";
import { useBooleanStateControl, useErrorModalState } from "@/hooks";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { FormError } from "@/components/core";
import EyeIcon from "@/app/(main)/misc/icons/EyeIcon";
import { useRouter, useSearchParams } from "next/navigation";
import { useChangePassword } from "../../../api/createPassword";

interface GetStartedProps {
  referral_code?: string | null;
}

export function PasswordForm({}: GetStartedProps) {
  const { state: isLoaderModalOpen, setTrue: _openLoaderModal } =
    useBooleanStateControl();

  const PasswordFormSchema = z.object({
    passwordData: z
      .object({
        email: z
          .string({ required_error: "Please enter your email." })
          .trim()
          .min(1, { message: "invalid email." })
          .email(),
        password: z
          .string({ required_error: "Please enter your password." })
          .trim()
          .min(1, { message: "password must be at least 1 characters." }),

        confirmpassword: z
          .string({ required_error: "Please enter your password." })
          .trim()
          .min(1, { message: "Password must be at least 1 characters." }),
      })
      .refine((data) => data?.password === data?.confirmpassword, {
        message: "Passwords don't match",
        path: ["confirmpassword"],
      }),
  });

  type passwordformProps = z.infer<typeof PasswordFormSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<passwordformProps>({
    resolver: zodResolver(PasswordFormSchema),
    defaultValues: {
      passwordData: {
        email: "",
        password: "",
        confirmpassword: "",
      },
    },

    mode: "onChange",
  });

  const {
    isErrorModalOpen,
    setErrorModalState,
    closeErrorModal,
    errorModalMessage,
  } = useErrorModalState();

  const [passwordShown, setPasswordShown] = React.useState(false);
  const router = useRouter();
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  const search = useSearchParams();
  const phone = search?.get("phone");
  const { mutate: handleChangePassword } = useChangePassword();
  const onsubmit = ({
    passwordData: { confirmpassword, email, password },
  }: passwordformProps) => {
    handleChangePassword(
      {
        confirmpassword,
        email,
        password,
        phone: String(phone),
      },
      {
        onSuccess: () => {
          router?.push("/");
        },
      }
    );
  };

  return (
    <>
      <LoaderModal isOpen={isLoaderModalOpen} />

      <form className="relative z-10" onSubmit={handleSubmit(onsubmit)}>
        <Label className="text-white font-sans text-sm mb-1" htmlFor="phone">
          Email
        </Label>
        <Input
          className="login-autofill-text mt-2 login-no-chrome-autofill-bg h-auto rounded-lg  !bg-white/10 px-6 py-3.5 outline-none text-sm font-sans font-medium text-white placeholder:text-white focus:!bg-white/30 "
          id="email"
          placeholder="Enter email"
          type="email"
          {...register("passwordData.email")}
        />

        {errors?.passwordData?.email && (
          <FormError
            className="bg-red-900/40 text-white"
            errorMessage={errors.passwordData.email.message}
          />
        )}

        <div className="mt-4">
          <div>
            <Label
              className="text-white font-sans text-sm mb-2"
              htmlFor="password"
            >
              Password
            </Label>

            <div className="flex items-center w-full  pr-10 md:pr-16 !bg-white/10 rounded-lg h-[3rem] ">
              <Input
                className="login-autofill-text  pr-7 login-no-chrome-autofill-bg h-full  outline-none border-none  rounded-lg bg-transparent  px-6 py-3.5 text-sm font-sans font-medium text-white placeholder:text-white  focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#403C3A]"
                id="password"
                placeholder="Enter password"
                type={passwordShown ? "text" : "password"}
                {...register("passwordData.password")}
              />

              <button
                type="button"
                className="absolute right-5"
                onClick={togglePassword}
              >
                <EyeIcon />
              </button>
            </div>

            {errors?.passwordData?.password && (
              <FormError
                className="mt-3 bg-red-900/40 text-white"
                errorMessage={errors.passwordData.password.message}
              />
            )}
          </div>
        </div>

        <div className="mt-4">
          <Label
            className="text-white font-sans text-sm mb-2"
            htmlFor="password"
          >
            Confirm Pasword
          </Label>

          <div className="flex items-center relative w-full pr-10 md:pr-16  !bg-white/10 rounded-lg h-[3rem] ">
            <Input
              className="login-autofill-text !outline-none !border-none login-no-chrome-autofill-bg h-full rounded-lg bg-transparent px-6 py-3.5 text-sm font-sans font-medium text-white placeholder"
              id="password"
              placeholder="Enter password"
              type={passwordShown ? "text" : "password"}
              {...register("passwordData.confirmpassword")}
              style={{ outline: "none", border: "none" }}
            />

            {/* <div> */}
            <button
              type="button"
              className="absolute right-5"
              onClick={togglePassword}
            >
              <EyeIcon />
            </button>
            {/* </div> */}
          </div>
          {errors?.passwordData?.confirmpassword && (
            <FormError
              className="mt-3 bg-red-900/40 text-white"
              errorMessage={errors?.passwordData?.confirmpassword?.message}
            />
          )}
        </div>

        <Button
          className="my-6 mt-16 block w-full rounded-[20px] text-[#1B1687] font-sans py-[.9375rem] text-base leading-[normal]"
          type="submit"
          variant="white"
        >
          Go To Dashboard
        </Button>
      </form>

      <ErrorModal
        isErrorModalOpen={isErrorModalOpen}
        setErrorModalState={setErrorModalState}
        subheading={
          errorModalMessage || "Please check your inputs and try again."
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
