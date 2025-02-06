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
import { PaymentSuccessMsg } from "../remital/RemitalSubmitPlan";
import { AxiosError } from "axios";
import { useClipboard, useErrorModalState } from "@/hooks";
import { tokenStorage, useUser } from "@/app/(auth)/(onboarding)/misc";
import { useRouter } from "next/navigation";
import { useQuery } from "react-query";
import { confirmTransfer } from "../../api/plan/confirmTransfer";
import { formatAxiosErrorMessage } from "@/utils";
import toast from "react-hot-toast";
import PendingToastContainer from "@/app/(dashboard)/comp/components/loading/PendingLoading";

interface Prop {
  //   userId?: string;
  PaymentInfo?: {
    account_name: string;
    account_no: string;
    amount: string;
    bank_name: string;
    paystack_link: string;
    phone_number: string;
  };
  showReferralPayment: true;
  setShowReferralPayment: React.Dispatch<React.SetStateAction<boolean>>;
  setShowReferralPasswordModal: React.Dispatch<React.SetStateAction<boolean>>;
  //   setShowSuccessModal?: React.Dispatch<React.SetStateAction<boolean>>;
  //   planType?: {
  //     duration: number;
  //     amount: string;
  //     userId: string;
  //     play_type: string;
  //   };
}

const ReferralPlanPayment = ({
  setShowReferralPayment,
  showReferralPayment,
  PaymentInfo,
  setShowReferralPasswordModal,

  //   planType,
  //   userId,
  //   setShowSuccessModal,
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
    queryFn: () => confirmTransfer(String(PaymentInfo?.phone_number)),
    queryKey: ["confirm-transfer", PaymentInfo?.phone_number],
    enabled: false,
    onSuccess: (data) => {
      if (data.message_code === "001") {
        tokenStorage.clearReferral()
        toast.success(data?.message);
        router.push("/login");
      } else {
        // setErrorMsg(data?.message);
        // openErrorModalWithMessage(String(data?.message));
        toast.custom(() => <PendingToastContainer message={data?.message} />, {
          id: 'pending-toast', // Using the same ID ensures only one "pending-toast" exists
        });
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
  // console.log(PaymentInfo, "paymennt");

  const { copy } = useClipboard();
  return (
    <div className="!z-[99999999999999999999999999999999999]">
      <Dialog
        open={showReferralPayment}
        // onOpenChange={setRemitaDetailsModal}
      >
        <DialogContent className="!overflow-hidden max-h-[94vh]  md:w-[28.75rem]">
          <DialogHeader className="bg-[#1B1687] ">
            <DialogTitle className="text-[#fff]">Payment</DialogTitle>

            <DialogClose
              className="rounded-full"
              onClick={() => setShowReferralPayment(false)}
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
                {/* <p className="text-sm text-white font-sans font-medium">
                  {planType?.duration} Month {planType?.play_type} Health Cover
                </p> */}
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
                      <CopyIcon
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
                {/* <Link href={""}> */}
                <Button
                  className="w-full bg-white py-4 rounded-10 text-sm space-x-3 font-bold text-[#1B1687] flex justify-center items-center"
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

export default ReferralPlanPayment;
