"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  ErrorModal,
  FormError,
} from "@/components/core";
import { RightUpArrow, SmallSpinner } from "@/icons/core";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { Input2 } from "@/components/core/Input2";
import { useCheckRemitalUser } from "../api/detailRequest";
import { formatAxiosErrorMessage } from "@/utils";
import { AxiosError } from "axios";
import { useErrorModalState } from "@/hooks";
import { useRouter } from "next/navigation";

interface Prop {
  setOpenCheckPhoneNumberModal: Dispatch<SetStateAction<boolean>>;
  openCheckPhoneNumberModal: boolean;
  setPhoneNumberCheckResponse: Dispatch<
    SetStateAction<{
      id: string;
      address: string;
      full_name: string;
      ministry: string;
      state: string;
    }>
  >;
  setUserEmail: Dispatch<SetStateAction<string>>;
  setUserId: Dispatch<SetStateAction<string>>;
  setVerifiedPhoneNumber: Dispatch<SetStateAction<string>>;
  setOpenRemitalDetailModal: Dispatch<SetStateAction<boolean>>;
  setOpenNonRemitalDetailModal: Dispatch<SetStateAction<boolean>>;
  setOpenRemitalUserDetail: Dispatch<SetStateAction<boolean>>;
  setShowPasswordModal: Dispatch<SetStateAction<boolean>>;
  setVerifyResponse: Dispatch<
    SetStateAction<{
      nin: string;
      bvn: string;
      address: string;
      email: string;
      id: string;
    }>
  >;
}

const contactSchema = z.object({
  phone_number: z
    .string({ required_error: "Enter your phone number" })
    .trim()
    .min(10, { message: "Phone number should be at least 11 digits" }),
});

interface successResponseType {
  is_eligible: boolean;
  "user:": User;
}

interface User {
  id: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  organization: null;
  gender: string;
  has_set_password: boolean;
  hospitals: Hospitals;
  phone_verified: boolean;
  nin: null;
  bvn: string;
  email: string;
  address: string;
}

interface Hospitals {
  lga: string;
  state: string;
  hospital: string;
  provider_id: string;
}

export type detailRequestType = z.infer<typeof contactSchema>;

const CheckPhoneNumber = ({
  openCheckPhoneNumberModal,
  setOpenCheckPhoneNumberModal,
  setPhoneNumberCheckResponse,
  setOpenNonRemitalDetailModal,
  setOpenRemitalUserDetail,
  setOpenRemitalDetailModal,
  setVerifiedPhoneNumber,
  setUserId,
  setVerifyResponse,
  setUserEmail,
  setShowPasswordModal,
}: Prop) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<detailRequestType>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      phone_number: "",
    },

    mode: "onChange",
  });

  const [errorMsg, setErrorMsg] = useState("");

  const {
    isErrorModalOpen,
    setErrorModalState,
    // closeErrorModal,
    openErrorModalWithMessage,
    errorModalMessage,
  } = useErrorModalState();
  const { mutate: handleCheckNumber, isLoading } = useCheckRemitalUser();
  const router = useRouter();

  const onsubmit = (data: detailRequestType) => {
    setVerifiedPhoneNumber(data?.phone_number);
    handleCheckNumber(data, {
      onSuccess: (result) => {
        const { status, data: mydata } = result;
        // console.log(status);
        let data: successResponseType = mydata;
        setUserEmail(data?.["user:"]?.email);
        setPhoneNumberCheckResponse({
          full_name:
            `${data?.["user:"]?.first_name ?? ""} ${data?.["user:"]?.last_name ?? ""}`.trim() ||
            "",
          ministry: "",
          state: data?.["user:"].organization ?? "",
          id: data?.["user:"].id,
          address: data?.["user:"]?.address,
        });

        setVerifyResponse({
          address: data?.["user:"]?.address ?? "",
          nin: data?.["user:"]?.nin ?? "",
          bvn: data?.["user:"]?.bvn ?? "",
          email: data?.["user:"]?.email ?? "",
          id: data?.["user:"]?.id ?? "",
        });

        if (data?.["user:"]?.has_set_password) {
          router?.push("/login");
        } else {
          const userData = data?.["user:"];
          if (data?.is_eligible) {
            setUserId(data?.["user:"]?.id);
            if (!userData?.email || !userData?.address) {
              // One or more fields are empty
              setOpenNonRemitalDetailModal(true);
            } else {
              if (
                data?.["user:"]?.hospitals?.hospital ||
                data?.["user:"]?.hospitals?.state ||
                data?.["user:"]?.hospitals?.lga
              ) {
                setShowPasswordModal(true);
              } else {
                setOpenRemitalUserDetail(true);
              }
            }
            setOpenCheckPhoneNumberModal(false);
          } else {
            setUserId(data?.["user:"]?.id);
            // data.is_eligible is false
            if (status === 200) {
              // Check if any of the required fields (nin, email, address) are missing
              if (!userData?.email || !userData?.address) {
                setOpenNonRemitalDetailModal(true);
              } else {
                if (userData?.phone_verified) {
                  if (
                    data?.["user:"]?.hospitals?.hospital ||
                    data?.["user:"]?.hospitals?.state ||
                    data?.["user:"]?.hospitals?.lga
                  ) {
                    setShowPasswordModal(true);
                  } else {
                    setOpenRemitalUserDetail(true);
                  }
                }
              }
              setOpenCheckPhoneNumberModal(false);
            }
            // Perform actions for the case where user is not eligible
          }
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
    <div className="">
      {/* <ClientOnly> */}
      <Dialog
        open={openCheckPhoneNumberModal}
        //   onOpenChange={()=>setOpenCheckPhoneNumberModal(true)}
      >
        <DialogTrigger className="bg-white text-black flex items-center justify-between text-[0.865rem] text-left py-1.5 pr-1.5 pl-4 mt-7 rounded-full max-w-max font-display">
          Get insurance
          <span className="flex items-center justify-center p-2 rounded-full bg-main-light ml-7">
            <RightUpArrow className="" width={12} height={12} />
          </span>
        </DialogTrigger>

        <DialogContent className="!overflow-hidden ">
          <DialogHeader className="bg-[#1B1687] ">
            <DialogTitle className="text-[#fff]">Details Request</DialogTitle>

            <DialogClose className="rounded-full">
              <button onClick={() => setOpenCheckPhoneNumberModal(false)}>
                Close
              </button>
            </DialogClose>
          </DialogHeader>

          <DialogBody className="bg-[#151D42] w-full ">
            <div className="">
              <p className="text-sm font-medium text-white font-sans">
                Kindly enter your phone number to process <br />
                your application.
              </p>
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
                      className={`${errors?.phone_number?.message ? "border border-red-700" : ""} text-[#fff]`}
                      placeholder="Enter your phone number"
                      type="number"
                      id="phone"
                      {...register("phone_number")}
                    />
                    {/* 
                      {errors?.phone_number && (
                        <FormError
                          className="bg-red-900/40 text-white"
                          errorMessage={errors?.phone_number?.message}
                        />
                      )} */}
                    {isLoading && (
                      <div className=" absolute top-[1.3rem] transform -translate-y-1/2 right-[1rem]">
                        <SmallSpinner className="" color="#fff" />
                      </div>
                    )}
                  </div>
                </div>
                <div className="pb-[2rem]">
                  <button
                    className=" mt-[3rem] font-display focus:shadow-outline w-full rounded-2xl bg-[#fff] p-4 py-3 font-semibold tracking-wide
                                    shadow-lg transition-colors delay-150 ease-in-out hover:bg-slate-300 focus:outline-none text-[#1B1687]"
                    type="submit"
                  >
                    Continue
                  </button>
                </div>
              </form>
            </div>
          </DialogBody>
        </DialogContent>
      </Dialog>
      {/* </ClientOnly> */}

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
    </div>
  );
};

export default CheckPhoneNumber;
