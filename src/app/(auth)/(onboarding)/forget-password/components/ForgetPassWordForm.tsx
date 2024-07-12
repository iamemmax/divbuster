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
import { useForm } from "react-hook-form";
import { FormError, LinkButton } from "@/components/core";
import { useRouter, useSearchParams } from "next/navigation";
import { useForgetPassword } from "../../api/forgetPassword";
import { formatAxiosErrorMessage } from "@/utils";
import { AxiosError } from "axios";
import { SmallSpinner } from "@/icons/core";

// import { useChangePassword } from "../../api/createPassword";
interface successsProp {
  message: string;
  phone_number: string;
}
export function ForgetPasswordForm() {
  const { state: isLoaderModalOpen, setTrue: _openLoaderModal } =
    useBooleanStateControl();

  const PasswordFormSchema = z.object({
    phone_number: z.string().min(5),
  });

  type passwordformProps = z.infer<typeof PasswordFormSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<passwordformProps>({
    resolver: zodResolver(PasswordFormSchema),
    defaultValues: {
      phone_number: "",
    },

    mode: "onChange",
  });

  const {
    isErrorModalOpen,
    setErrorModalState,
    // closeErrorModal,
    openErrorModalWithMessage,
    errorModalMessage,
  } = useErrorModalState();

  const [errorMsg, setErrorMsg] = React.useState("");
  const router = useRouter();
  // const search = useSearchParams();
  // const phone = search?.get("phone");
  const { mutate: handleResetPassword, isLoading } = useForgetPassword();
  const onsubmit = ({ phone_number }: passwordformProps) => {
    handleResetPassword(phone_number, {
      onSuccess: (data: successsProp) => {
        if (data) {
          router.push(`/update-password?phone=${data?.phone_number}`);
        }
      },
      onError: (error) => {
        const errorMessage = formatAxiosErrorMessage(error as AxiosError);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        setErrorMsg(error?.response?.data?.error);

        openErrorModalWithMessage(String(errorMessage));
      },
    });
  };

  return (
    <>
      <LoaderModal isOpen={isLoaderModalOpen} />

      <form className="relative z-10" onSubmit={handleSubmit(onsubmit)}>
        <div className="mt-4">
          <Label className="text-white font-sans text-sm mb-2" htmlFor="phone">
            Phone Number
          </Label>

          <Input
            className="login-autofill-text mt-2 login-no-chrome-autofill-bg h-auto rounded-lg  !bg-white/10 px-6 py-3.5 outline-none text-sm font-sans font-medium text-white placeholder:text-white focus:!bg-white/30 "
            id="phone"
            placeholder="Enter Phone no"
            type="text"
            {...register("phone_number")}
          />

          {errors?.phone_number && (
            <FormError
              className="mt-3 bg-red-900/40 text-white"
              errorMessage={errors?.phone_number?.message}
            />
          )}
        </div>

        <div className="">
          <Button
            className="my-6 mt-16  w-full flex items-center  justify-center rounded-[20px] text-[#1B1687] font-sans py-[.9375rem] text-base leading-[normal]"
            type="submit"
            variant="white"
          >
            {isLoading ? <SmallSpinner className="" color="#1B1687" /> : "Done"}
          </Button>
          <LinkButton
            href={"/login"}
            className="my-6 mt-6 block w-full rounded-[20px] bg-[#080D27]  border-[0.5px] border-white border-opacity-40 text-[#fff] font-sans py-[.9375rem] text-base leading-[normal]"
            type="submit"
            variant="white"
          >
            Back to Login
          </LinkButton>
        </div>
      </form>

      <ErrorModal
        isErrorModalOpen={isErrorModalOpen}
        setErrorModalState={() => {
          setErrorModalState(false);
        }}
        subheading={
          errorModalMessage ||
          errorMsg ||
          "Please check your inputs and try again."
        }
      ></ErrorModal>
    </>
  );
}
