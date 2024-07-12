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
import { useCheckNinUser } from "../../api/non-remital/check-nin";
import { formatAxiosErrorMessage } from "@/utils";
import { AxiosError } from "axios";
import { useErrorModalState } from "@/hooks";

interface Prop {
  openNonRemitalDetailModal: boolean;
  setPhoneNumberCheckResponse: Dispatch<
    SetStateAction<{
      id: string;
      phone_number: string;
      full_name: string;
      ministry: string;
      state: string;
    }>
  >;

  setOpenNonRemitalDetailModal: Dispatch<SetStateAction<boolean>>;
  setOpenRemitalUserDetail: Dispatch<SetStateAction<boolean>>;
  setOpenRemitalDetailModal: Dispatch<SetStateAction<boolean>>;
  verifiedPhoneNumber: string;
  userId: string;
  verifyResponse: {
    nin: string;
    address: string;
    email: string;
    id: string;
  };
}

const contactSchema = z.object({
  address: z
    .string({ required_error: "Enter your phone number" })
    .trim()
    .min(2, { message: "Enter Address" }),
  nin: z
    .string()
    .trim()
    .min(10, { message: "Nin should be at least 11 digits" }),
  email: z.string().email().min(1, { message: "Enter email" }),
  //   id: z.string().optional(),
});

interface successResponseType {
  "user:": User;
  sms_sent: boolean;
}

interface User {
  id: string;
  first_name: null;
  last_name: null;
  phone_number: string;
  organization: null;
  gender: string;
  has_set_password: boolean;
  hospital: null;
  phone_verified: boolean;
  nin: string;
  email: string;
  address: string;
}
export type detailRequestNiNType = z.infer<typeof contactSchema>;

const NonRemitalModal = ({
  verifiedPhoneNumber,
  openNonRemitalDetailModal,
  setOpenNonRemitalDetailModal,
  setPhoneNumberCheckResponse,
  setOpenRemitalUserDetail,
  setOpenRemitalDetailModal,

  verifyResponse,
  userId,
}: Prop) => {
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
  } = useForm<detailRequestNiNType>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      address: verifyResponse?.address,
      email: verifyResponse?.email,
      nin: verifyResponse?.nin,
    },

    mode: "onChange",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const { mutate: handleCheckNin, isLoading } = useCheckNinUser();
  const onsubmit = (data: detailRequestNiNType) => {
    handleCheckNin(
      {
        userId,
        email: data?.email,
        address: data?.address,
        nin: data?.nin,
      },
      {
        onSuccess: (data: successResponseType) => {
          // console.log(data);

          setPhoneNumberCheckResponse({
            full_name: `${data?.["user:"]?.first_name} ${data?.["user:"]?.last_name}`,
            ministry: "",
            state: data?.["user:"]?.organization ?? "",
            id: data?.["user:"]?.id,
            phone_number: data?.["user:"]?.phone_number,
          });
          if (data?.["user:"]?.phone_verified) {
            setOpenRemitalUserDetail(true);
            setOpenNonRemitalDetailModal(false);
          } else {
            setOpenRemitalDetailModal(true);
            setOpenNonRemitalDetailModal(false);
          }

          setOpenNonRemitalDetailModal(false);
        },
        onError: (error) => {
          const errorMessage = formatAxiosErrorMessage(error as AxiosError);
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-expect-error
          setErrorMsg(error?.response?.data?.error);

          openErrorModalWithMessage(String(errorMessage));
        },
      }
    );
  };

  return (
    <div className="">
      {/* <ClientOnly> */}
      <Dialog
        open={openNonRemitalDetailModal}
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
              <button onClick={() => setOpenNonRemitalDetailModal(false)}>
                Close
              </button>
            </DialogClose>
          </DialogHeader>

          <DialogBody className="bg-[#151D42] w-full ">
            <div className="">
              <p className="text-sm font-medium text-white font-sans">
                Kindly enter your details below to process your application.
              </p>
              <form className="mt-8" onSubmit={handleSubmit(onsubmit)}>
                <div className="w-full mt-[1rem] text-sm font-normal">
                  <Label
                    className="mb-1 block text-xs  text-[#fff]"
                    htmlFor="phone"
                  >
                    Address
                  </Label>

                  <div className={`relative mt-[.25rem] `}>
                    <Input2
                      className={`${errors?.address?.message ? "border border-red-700" : ""} text-[#fff]`}
                      placeholder="Enter your address"
                      type="text"
                      id="phone"
                      //   disabled
                      {...register("address")}
                    />
                  </div>
                </div>
                <div className="w-full mt-[1rem] text-sm font-normal">
                  <Label
                    className="mb-1 block text-xs  text-[#fff]"
                    htmlFor="nin"
                  >
                    (Dial *346# on your phone to get your nin)
                  </Label>

                  <div className={`relative mt-[.25rem] `}>
                    <Input2
                      className={`${errors?.nin?.message ? "border border-red-700" : ""} text-[#fff]`}
                      placeholder="Enter  nin"
                      type="number"
                      id="nin"
                      {...register("nin")}
                    />
                  </div>
                </div>
                <div className="w-full mt-[1rem] text-sm font-normal">
                  <Label
                    className="mb-1 block text-xs  text-[#fff]"
                    htmlFor="email"
                  >
                    Email
                  </Label>

                  <div className={`relative mt-[.25rem] `}>
                    <Input2
                      className={`${errors?.email?.message ? "border border-red-700" : ""} text-[#fff]`}
                      placeholder="Enter  email"
                      type="text"
                      id="nin"
                      {...register("email")}
                    />
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

export default NonRemitalModal;
