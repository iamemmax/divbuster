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
import { convertToTitleCase, maskPhoneNumber } from "@/utils/strings";
import PinInput from "react-pin-input";
import REsetOtpIcon from "../../icons/ResentOtpIcon";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Countdown from "../../util/Countdown";
import { useCheckRemitalOtp } from "../../api/remital/remitalDetails";

interface prop {
  setOpenRemitalDetailModal: Dispatch<SetStateAction<boolean>>;
  openRemitalDetailModal: boolean;
  phoneNumberCheckResponse: {
    full_name: string;
    ministry: string;
    state: string;
  };
  verifiedPhoneNumber: string;
  setOpenRemitalUserDetail: Dispatch<SetStateAction<boolean>>;
}

// Define the Zod schema
const schema = z.object({
  pin: z
    .string()
    .length(6, "PIN must be exactly 6 digits")
    .regex(/^\d+$/, "PIN must be numeric"),
});
export type pinType = z.infer<typeof schema>;

const RemitalModalDetails = ({
  setOpenRemitalDetailModal,
  openRemitalDetailModal,
  phoneNumberCheckResponse,
  verifiedPhoneNumber,
  setOpenRemitalUserDetail,
}: prop) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<pinType>({
    resolver: zodResolver(schema),
    defaultValues: {
      pin: "",
    },

    mode: "onChange",
  });

  const { mutate: handleVerifyOtp } = useCheckRemitalOtp();
  const onSubmit = (data: pinType) => {
    setOpenRemitalUserDetail(true);
    setOpenRemitalDetailModal(false);
    handleVerifyOtp(data, {
      onSuccess: () => {},
    });
  };
  return (
    <Dialog
      open={openRemitalDetailModal}
      // onOpenChange={setRemitaDetailsModal}
    >
      <DialogContent className="!overflow-hidden sm:w-[28.75rem]">
        <DialogHeader className="bg-[#1B1687] ">
          <DialogTitle className="text-[#fff]">Remita Details</DialogTitle>

          <DialogClose className="rounded-full">
            <button onClick={() => setOpenRemitalDetailModal(false)}>
              Close
            </button>
          </DialogClose>
        </DialogHeader>

        <DialogBody className="bg-[#141B3f] w-full">
          <div className="py-1">
            <div className="text-[#fff] font-light text-sm font-sans">
              Kindly confirm your remita details and dial the USSD code for OTP
              verification.
            </div>

            <div className="bg-[#2D3455] w-full p-6 mt-6 flex flex-col text-white space-y-3  rounded-xl">
              <div className="flex gap-[0.3rem] font-sans">
                <p className=" text-sm">Full Name: </p>
                <p className="capitalize text-sm">
                  {convertToTitleCase(phoneNumberCheckResponse?.full_name)}
                </p>
              </div>

              <div className="flex w-full gap-[0.8rem] text-[#fff] font-sans flex-nowrap">
                <p className=" text-sm">Ministry: </p>
                <p className="capitalize text-sm">
                  {convertToTitleCase(phoneNumberCheckResponse?.ministry)}
                </p>
              </div>

              <div className="flex gap-[3rem]">
                <p className=" text-sm">State : </p>
                <p className="capitalize text-sm">
                  {convertToTitleCase(phoneNumberCheckResponse?.state)}
                </p>
              </div>
            </div>

            <div className="mt-4 bg-[#2B3151] text-[#fff]  rounded-lg">
              <p className="text-[.8125rem]  py-4 px-6 font-sans font-medium">
                Kindly dial *123*304# on your phone to get an OTP.
              </p>
            </div>

            <div className="mt-6  text-[#fff] w-full font-medium font-sans">
              <p className="w-full text-xs font-medium">
                Kindly enter the OTP code has sent to your number{" "}
                {maskPhoneNumber(verifiedPhoneNumber)}
              </p>
            </div>

            <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="w-full ">
                <div className="">
                  <Controller
                    name="pin"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <PinInput
                        {...field}
                        autoSelect={false}
                        initialValue=""
                        inputFocusStyle={{
                          border: "none",
                          background: "#1E2753",
                          boxShadow: "0 0 0 4.5px #fff, 0 0 0 5.8px #032282",
                        }}
                        inputMode="number"
                        inputStyle={{
                          background: "#ffffff",
                          borderRadius: "10px",
                          border: "transparent",
                          fontSize: ".875rem",
                          transition: "all 0.45s ease-in-out",
                        }}
                        length={6}
                        style={{
                          display: "flex",
                          flexWrap: "nowrap",
                          gap: ".625rem",
                          margin: "auto",
                        }}
                        type="numeric"
                        secret={true}
                      />
                    )}
                  />
                  {errors?.pin && (
                    <p className="text-red-500 mt-4 text-xs">
                      {errors.pin.message}
                    </p>
                  )}
                </div>

                <div className="flex w-full mt-3 items-center justify-between px-4">
                  <div className="text-white text-xs">
                    <Countdown />
                  </div>
                  <button className="flex items-center gap-[.3125rem] text-white text-[.625rem]">
                    <REsetOtpIcon /> Resend OTP
                  </button>
                </div>

                <div className="">
                  <button
                    className="mt-[5rem] font-display focus:shadow-outline w-full rounded-2xl bg-[#fff] p-4 py-3 font-semibold tracking-wide
                    shadow-lg transition-colors delay-150 ease-in-out hover:bg-slate-300 focus:outline-none text-[#1B1687] mb-[3rem]"
                    type="submit"
                  >
                    Continue
                  </button>
                </div>
              </div>
            </form>
          </div>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default RemitalModalDetails;
