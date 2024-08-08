import React from "react";
import {
  Dialog,
  DialogBody,
  DialogContent,
} from "@/components/core/DialogClone";
// import { useMakeRemitalPayment } from "../../api/remital/remitalpayment";
import { SmallSpinner } from "@/icons/core";
import {
  Button,
  DialogClose,
  DialogHeader,
  DialogTitle,
  ErrorModal,
} from "@/components/core";
import CopyIcon from "@/app/(dashboard)/comp/icons/CopyIcon";
import PayStatckIcon from "../../icons/PayStackIcon";
import Link from "next/link";
import { PaymentSuccessMsg } from "./RemitalSubmitPlan";
import { useQuery } from "react-query";
import { confirmTransfer } from "../../api/plan/confirmTransfer";
import { useUser } from "@/app/(auth)/(onboarding)/misc";
import { useClipboard, useErrorModalState } from "@/hooks";
import { formatAxiosErrorMessage } from "@/utils";
import { AxiosError } from "axios";
import CopyIcon2 from "@/app/(dashboard)/comp/icons/CopyIcon2";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface Prop {
  setShowPaymentModal: React.Dispatch<React.SetStateAction<boolean>>;
  showPaymentModal: boolean;
  userId: string;
  PaymentInfo: PaymentSuccessMsg | undefined;
  setShowSuccessModal: React.Dispatch<React.SetStateAction<boolean>>;
  planType: {
    duration: number;
    amount: string;
    userId: string;
    play_type: string;
  };
}

const PlanPayment = ({
  setShowPaymentModal,
  showPaymentModal,
  PaymentInfo,
  planType,
  userId,
  setShowSuccessModal,
}: Prop) => {
  // const { mutate: handlePaymentRequest, isLoading } = useMakeRemitalPayment();

  const [errorMsg, setErrorMsg] = React.useState("");

  const {
    isErrorModalOpen,
    setErrorModalState,
    openErrorModalWithMessage,
    errorModalMessage,
  } = useErrorModalState();
  const { data: users, isLoading } = useUser();
  const router = useRouter();
  const { refetch } = useQuery({
    queryFn: () => confirmTransfer(String(users?.phone_number)),
    queryKey: ["confirm-transfer", users?.phone_number],
    enabled: false,
    onSuccess: (data) => {
      if (data.message !== "success") {
        toast.success(data?.message);
        router.push("/dashboard");
      } else {
        setErrorMsg(data?.message);
        openErrorModalWithMessage(String(data?.message));
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
  const { copy } = useClipboard();
  return (
    <div>
      <Dialog
        open={showPaymentModal}
        // onOpenChange={setRemitaDetailsModal}
      >
        <DialogContent className="!overflow-hidden max-h-[94vh]  md:w-[28.75rem]">
          <DialogHeader className="bg-[#1B1687] ">
            <DialogTitle className="text-[#fff]">Payment</DialogTitle>

            <DialogClose
              className="rounded-full"
              onClick={() => setShowPaymentModal(false)}
            >
              <button>Close</button>
            </DialogClose>
          </DialogHeader>

          <DialogBody className="bg-[#141B3f]  md:w-full px-8">
            <div className="py-1  ">
              <div className="text-[#fff] font-light text-sm font-sans">
                Kindly make payment for your health cover via the payment
                options below.
              </div>

              <div className="mt-4 bg-[#2B3151] flex justify-center py-4 items-center flex-col text-[#fff]  rounded-lg">
                <p className="text-sm text-white font-sans font-medium">
                  {planType?.duration} Month {planType?.play_type} Health Cover
                </p>
                <h2 className="text-white text-2xl font-bold py-1">
                  {PaymentInfo?.amount}
                </h2>
              </div>

              <div className="mt-6 bg-[#141B3f] px-6 py-4 rounded-2xl">
                <div className="border-b border-[#eee] border-opacity-20 py-4 w-full">
                  <p className="text-sm text-white">
                    Make payment via transfer
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 items-start mt-5">
                  <div className="">
                    <p className="text-xs text-white text-opacity-70">
                      Account name
                    </p>
                    <h2 className="text-white font-semibold textbase">
                      {PaymentInfo?.account_name}
                    </h2>
                  </div>
                  <div className="">
                    <p className="text-xs text-white text-opacity-70">
                      Account no
                    </p>
                    <h2 className="text-white gap-x-3 flex font-semibold textbase">
                      {" "}
                      {PaymentInfo?.account_no}{" "}
                      <CopyIcon2
                        onClick={() => copy(String(PaymentInfo?.account_no))}
                      />
                    </h2>
                  </div>
                  <div className="">
                    <p className="text-xs text-white text-opacity-70">
                      Bank name
                    </p>
                    <h2 className="text-white font-semibold textbase">
                      {PaymentInfo?.bank_name}
                    </h2>
                  </div>
                </div>
              </div>
              <div className="my-10 flex flex-col space-y-5">
                <Link href={String(PaymentInfo?.paystack_link)}>
                  <Button className="w-full rounded-10 text-sm bg-transparent py-4 font-bold text-white flex justify-center items-center gap-x-2 border border-[#1B1687]">
                    <PayStatckIcon /> Pay with paystack{" "}
                  </Button>
                </Link>
                {/* <Link href={"/login"}> */}
                <Button
                  type="submit"
                  className="w-full bg-white z-[9999] space-x-3 py-4 rounded-10 text-sm font-bold text-[#1B1687] flex justify-center items-center"
                  onClick={() => refetch()}
                >
                  I have made payment {isLoading && <SmallSpinner />}
                </Button>
                {/* </Link> */}
              </div>
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
    </div>
  );
};

export default PlanPayment;
