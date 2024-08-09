import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  ErrorModal,
} from "@/components/core";
import { convertToTitleCase, maskPhoneNumber } from "@/utils/strings";
import PinInput from "react-pin-input";
import REsetOtpIcon from "../../icons/ResentOtpIcon";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Countdown from "../../util/Countdown";
import { useCheckRemitalOtp } from "../../api/remital/remitalDetails";
import useIsMobile from "../../util/UseMobile";
import { useResentOtp } from "../../api/remital/resendOtp";
import { formatAxiosErrorMessage } from "@/utils";
import { AxiosError } from "axios";
import { useErrorModalState } from "@/hooks";
import { SmallSpinner } from "@/icons/core";

interface prop {
  setOpenRemitalDetailModal: React.Dispatch<React.SetStateAction<boolean>>;
  setUserEmail: React.Dispatch<React.SetStateAction<string>>;

  openRemitalDetailModal: boolean;
  phoneNumberCheckResponse: {
    full_name: string;
    ministry: string;
    state: string;
  };
  verifiedPhoneNumber: string;
  setOpenRemitalUserDetail: React.Dispatch<React.SetStateAction<boolean>>;
}

interface successprop {
  status: string;
  message: string;
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
  setUserEmail,
}: prop) => {
  const {
    isErrorModalOpen,
    setErrorModalState,
    // closeErrorModal,
    openErrorModalWithMessage,
    errorModalMessage,
  } = useErrorModalState();
  const [errorMsg, setErrorMsg] = useState("");
  const [showResendOtpButton, setShowResendOtpButton] = useState(false);
  const [resetTimer, setResetTimer] = useState(false);
  const [pin, setPin] = useState("");

  // const {
  //   control,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<pinType>({
  //   resolver: zodResolver(schema),
  //   defaultValues: {
  //     pin: "",
  //   },
  //   mode: "onChange",
  // });

  const { mutate: handleVerifyOtp, isLoading: loadingSubmit } =
    useCheckRemitalOtp();

  const handleComplete = (pin: string) => {
    setPin(pin);
    handleVerifyOtp(
      {
        pin,
        verifiedPhoneNumber,
      },
      {
        onSuccess: (data: successprop) => {
          if (data?.status) {
            setOpenRemitalUserDetail(true);
            setOpenRemitalDetailModal(false);
            // setOpenRemitalDetailModal(false);
            // setUserEmail(data?.)
          }
        },
        onError: (error) => {
          setPin("");
          const errorMessage = formatAxiosErrorMessage(error as AxiosError);
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-expect-error
          setErrorMsg(error?.response?.data?.error);

          openErrorModalWithMessage(String(errorMessage));
        },
      }
    );
  };
  const onSubmit = (data: pinType) => {};

  const isMobile = useIsMobile();

  const { mutate: resendOtpFunc } = useResentOtp();

  // resend otp
  const handleResendOtp = () => {
    resendOtpFunc(verifiedPhoneNumber, {
      onSuccess: (data) => {
        console.log(data);
        setShowResendOtpButton(false);
      },
      onError: (error) => {
        const errorMessage = formatAxiosErrorMessage(error as AxiosError);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        setErrorMsg(error?.response?.data?.error);

        openErrorModalWithMessage(String(errorMessage));
      },
    });
    setResetTimer(true); // Trigger timer reset
  };

  // show resent otp
  const handleTimeUp = () => {
    setShowResendOtpButton(true);
  };
  useEffect(() => {
    if (resetTimer) {
      setResetTimer(false); // Reset the timer state after updating it
      setShowResendOtpButton(false);
    }
  }, [resetTimer]);

  return (
    <>
      <Dialog open={openRemitalDetailModal}>
        <DialogContent className="!overflow-hidden max-h-[94vh] md:w-[28.75rem]">
          <DialogHeader className="bg-[#1B1687]">
            <DialogTitle className="text-[#fff]">Remita Details</DialogTitle>
            <DialogClose
              className="rounded-full"
              onClick={() => setOpenRemitalDetailModal(false)}
            >
              <button>Close</button>
            </DialogClose>
          </DialogHeader>
          <DialogBody className="bg-[#141B3f] md:w-full">
            <div className="py-1 overflow-y-auto">
              <div className="text-[#fff] font-light text-sm font-sans">
                Please confirm your details below.
              </div>
              {phoneNumberCheckResponse?.full_name ||
              phoneNumberCheckResponse?.ministry ||
              phoneNumberCheckResponse?.state ? (
                <div className="bg-[#2D3455] w-full p-6 mt-6 flex flex-col text-white space-y-3 rounded-xl">
                  {phoneNumberCheckResponse?.full_name && (
                    <div className="flex gap-[0.3rem] font-sans">
                      <p className="text-sm">Full Name: </p>
                      <p className="capitalize text-sm">
                        {convertToTitleCase(
                          phoneNumberCheckResponse?.full_name
                        )}
                      </p>
                    </div>
                  )}
                  {phoneNumberCheckResponse?.ministry && (
                    <div className="flex w-full gap-[0.8rem] text-[#fff] font-sans flex-nowrap">
                      <p className="text-sm">Ministry: </p>
                      <p className="capitalize text-sm">
                        {convertToTitleCase(phoneNumberCheckResponse?.ministry)}
                      </p>
                    </div>
                  )}
                  {phoneNumberCheckResponse?.state && (
                    <div className="flex gap-[3rem]">
                      <p className="text-sm">State: </p>
                      <p className="capitalize text-sm">
                        {convertToTitleCase(phoneNumberCheckResponse?.state)}
                      </p>
                    </div>
                  )}
                </div>
              ) : null}
              <div className="mt-4 bg-[#2B3151] text-[#fff] rounded-lg">
                <h2 className="text-[.8125rem] font-bold py-4 px-6 font-sans">
                  Dial *347*180*52# to get an OTP.
                </h2>
              </div>
              <div className="mt-6 text-[#fff] w-full font-medium font-sans">
                <p className="w-full text-xs font-medium">
                  Enter the OTP code sent to your number{" "}
                  {maskPhoneNumber(verifiedPhoneNumber)}
                </p>
              </div>
              <form className="mt-6">
                <div className="w-full">
                  <div>
                    <PinInput
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
                        fontSize: isMobile ? "0.75rem" : "0.875rem",
                        transition: "all 0.45s ease-in-out",
                        width: isMobile ? "1.8rem" : "2.5rem",
                        height: isMobile ? "1.8rem" : "2.5rem",
                      }}
                      length={6}
                      style={{
                        display: "flex",
                        flexWrap: "nowrap",
                        gap: isMobile ? "0.4rem" : "0.625rem",
                        margin: "auto",
                      }}
                      type="numeric"
                      secret
                      onComplete={handleComplete}
                    />
                    {/* {errors?.pin && (
                    <p className="text-red-500 mt-4 text-xs">
                      {errors.pin.message}
                    </p>
                  )} */}
                  </div>
                  <div className="flex w-full mt-3 items-center justify-between px-4">
                    <div className="text-white text-xs">
                      {/* <Countdown onTimeUp={handleTimeUp} reset={resetTimer} /> */}
                    </div>
                    {/* {showResendOtpButton && ( */}
                    <button
                      type="button"
                      className="flex items-center gap-[.3125rem] text-white text-[.625rem]"
                      onClick={handleResendOtp}
                    >
                      <REsetOtpIcon /> Resend OTP
                    </button>
                    {/* )} */}
                  </div>
                  <div>
                    <button
                      className="md:mt-[5rem] flex items-center justify-center gap-x-5 mt-4 font-display focus:shadow-outline w-full rounded-2xl bg-[#fff] p-4 py-3 font-semibold tracking-wide shadow-lg transition-colors delay-150 ease-in-out hover:bg-slate-300 focus:outline-none text-[#1B1687] mb-[3rem]"
                      type="submit"
                    >
                      Continue
                      {loadingSubmit && (
                        <SmallSpinner className="" color="#1B1687" />
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </DialogBody>
        </DialogContent>
      </Dialog>

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
};

export default RemitalModalDetails;
