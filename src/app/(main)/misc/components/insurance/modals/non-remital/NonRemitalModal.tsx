"use client";
import React, { Dispatch, SetStateAction } from "react";
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

interface Prop {
  openNonRemitalDetailModal: boolean;
  setPhoneNumberCheckResponse: Dispatch<
    SetStateAction<{
      full_name: string;
      ministry: string;
      state: string;
    }>
  >;
  setOpenNonRemitalDetailModal: Dispatch<SetStateAction<boolean>>;
  setOpenRemitalUserDetail: Dispatch<SetStateAction<boolean>>;
  verifiedPhoneNumber: string;
}

const contactSchema = z.object({
  phone_number: z
    .string({ required_error: "Enter your phone number" })
    .trim()
    .min(10, { message: "Phone number should be at least 11 digits" }),
  nin: z
    .string()
    .trim()
    .min(10, { message: "Nin should be at least 11 digits" }),
  email: z.string().email().min(1, { message: "Enter email" }),
});

interface successResponseType {
  existing_user: boolean;
  is_from_remita: boolean;
  user_details: Userdetails;
}

interface Userdetails {
  full_name: string;
  ministry: string;
  state: string;
}
export type detailRequestNiNType = z.infer<typeof contactSchema>;

const NonRemitalModal = ({
  verifiedPhoneNumber,
  openNonRemitalDetailModal,
  setOpenNonRemitalDetailModal,
  setPhoneNumberCheckResponse,
  setOpenRemitalUserDetail,
}: Prop) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<detailRequestNiNType>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      phone_number: verifiedPhoneNumber,
      email: "",
      nin: "",
    },

    mode: "onChange",
  });
  const { mutate: handleCheckNin, isLoading } = useCheckNinUser();
  const onsubmit = (data: detailRequestNiNType) => {
    handleCheckNin(data, {
      onSuccess: (data: successResponseType) => {
        // console.log(data);

        setPhoneNumberCheckResponse({
          full_name: data?.user_details?.full_name,
          ministry: data?.user_details?.ministry,
          state: data?.user_details?.state,
        });
        // if (data?.is_from_remita) {
        setOpenRemitalUserDetail(true);
        // } else {
        //   setOpenNonRemitalDetailModal(true);
        // }
        setOpenNonRemitalDetailModal(false);
      },
    });
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
                    Phone Number
                  </Label>

                  <div className={`relative mt-[.25rem] `}>
                    <Input2
                      className={`${errors?.phone_number?.message ? "border border-red-700" : ""} text-[#fff]`}
                      placeholder="Enter your phone number"
                      type="number"
                      id="phone"
                      disabled
                      {...register("phone_number")}
                    />
                  </div>
                </div>
                <div className="w-full mt-[1rem] text-sm font-normal">
                  <Label
                    className="mb-1 block text-xs  text-[#fff]"
                    htmlFor="nin"
                  >
                    (Dial *346# on your phone to get your NIN)
                  </Label>

                  <div className={`relative mt-[.25rem] `}>
                    <Input2
                      className={`${errors?.nin?.message ? "border border-red-700" : ""} text-[#fff]`}
                      placeholder="Enter  NIN"
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
    </div>
  );
};

export default NonRemitalModal;
