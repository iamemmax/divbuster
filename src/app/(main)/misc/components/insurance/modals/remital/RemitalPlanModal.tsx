import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Button,
  ClientOnly,
  ErrorModal,
  LinkButton,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/core";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/core/DialogClone";
import RemitalListIcon from "../../icons/RemitalListIcon";
import UserIcons from "../../icons/Usericon";
import Link from "next/link";
import PlanComfirmationModal from "./PlanComfirmationModal";
import PlanPayment from "./PlanPayment";
// import RemitalSuccessModal from "./RemitalSuccessModal";
import { useQuery } from "react-query";
import { getPlan, plantypes } from "../../api/plan/getPlan";
import { useMakeRemitalPayment } from "../../api/remital/remitalpayment";
import { formatAxiosErrorMessage } from "@/utils";
import { AxiosError } from "axios";
import { useErrorModalState } from "@/hooks";
import { useLogin } from "@/app/(auth)/(onboarding)/misc";
import { useRouter } from "next/navigation";
import useDataStore from "@/app/store/useStore";

interface Prop {
  setOpenShowRemitalPlan: Dispatch<SetStateAction<boolean>>;
  openRemitalPlan: boolean;
  userId: string;
}
export interface PaymentSuccessMsg {
  message?: string;
  account_name: string;
  account_no: string;
  bank_name: string;
  paystack_link: string;
  amount: number;

  "user:"?: User;
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
  nin: string;
  email: string;
  address: string;
}

interface Hospitals {
  state: string;
  region: string;
  hospital: string;
  provider_id: string;
}

const RemitalPlanModal = ({
  openRemitalPlan,
  setOpenShowRemitalPlan,
  userId,
}: Prop) => {
  const {
    isErrorModalOpen,
    setErrorModalState,
    openErrorModalWithMessage,
    errorModalMessage,
  } = useErrorModalState();
  const list = [
    "Telemedicine",
    "Surgery Care",
    "Pharmacy Access",
    "Doctor Consultation",
  ];

  const [errorMsg, setErrorMsg] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [PaymentInfo, setPaymentInfo] = useState<PaymentSuccessMsg>();
  const [duration, setDuration] = useState<number>();
  const [ConfirmationMessage, setConfirmationMessage] = useState("");
  const [checkUserHasPassword, setCheckUserHasPassword] = useState<boolean>();
  const { data: plansData } = useQuery({
    queryFn: getPlan,
    queryKey: ["get-plans"],
  });

  const { mutate: handlePaymentRequest, isLoading } = useMakeRemitalPayment();
  const handlePayment = (plan: plantypes) => {
    handlePaymentRequest(
      {
        duration: plan?.duration,
        userId,
      },
      {
        onSuccess: (data: PaymentSuccessMsg) => {
          if (data?.message) {
            setShowConfirmation(true);
            setConfirmationMessage(data?.message);
            setCheckUserHasPassword(data?.["user:"]?.has_set_password);
          } else {
            setPaymentInfo({
              account_name: data?.account_name,
              account_no: data?.account_no,
              bank_name: data?.bank_name,
              paystack_link: data?.paystack_link,
              amount: data?.amount,
            });
            setShowPaymentModal(true);
          }
        },
        onError: (error) => {
          const errorMessage = formatAxiosErrorMessage(error as AxiosError);
          //  eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          setErrorMsg(error?.response?.data?.error);
          openErrorModalWithMessage(String(errorMessage));
        },
      }
    );
  };

  const user = useDataStore((state) => state?.user);
  const router = useRouter();
  const { mutate: postLogIn, isLoading: isLoginLoading } = useLogin();

  const updatedData = {
    phone_number: user?.phone_number,
    password: user?.password,
    // device_type: "MOBILE",
  };

  // const
  const handleSubmit = () => {
    postLogIn(updatedData, {
      onSuccess: () => {
        router.push("/dashboard");
      },
      onError: (error) => {
        const errorMessage = formatAxiosErrorMessage(error as AxiosError);
        openErrorModalWithMessage(errorMessage as string);
      },
    });
  };
  return (
    <div>
      {isLoginLoading ? (
        "Loading"
      ) : (
        <Dialog open={openRemitalPlan}>
          <DialogContent className="!overflow-hidden  min-h-[90vh] max-h-[97vh] px-4 w-full md:min-h-[55rem]">
            <div className="md:w-full flex justify-between items-center">
              <DialogHeader className="bg-[#1B1687] w-full !justify-between">
                <DialogTitle className="text-[#fff] whitespace-nowrap">
                  Individual Plan
                </DialogTitle>

                <DialogClose className="rounded-lg">
                  <button onClick={() => setOpenShowRemitalPlan(false)}>
                    Close
                  </button>
                </DialogClose>
              </DialogHeader>
            </div>

            <DialogBody className="bg-[#151D42] w-full h-full">
              <div className="py-1">
                <div className="text-[#fff] text-center font-semibold text-3xl">
                  <DialogDescription className="text-3xl">
                    Choose Your Plan
                  </DialogDescription>
                </div>
              </div>

              <div className="flex w-full items-center justify-center">
                <p className="w-full px-4 md:px-[2rem] text-center sm:max-w-[80%] text-[#747577] font-medium">
                  Individual plan gives you access to health cover for you only,
                  while the family plan covers for you and your family.
                </p>
              </div>

              <div className="max-h-[60vh] md:min-h-[409px] rounded-b-lg md:mb-[5rem] md:w-full mt-5 md:mt-10">
                <Tabs className="" defaultValue="Individual">
                  <div className="flex w-full px-6 items-center justify-center">
                    <TabsList className="flex w-[98%] justify-center rounded-[.75rem] bg-[#1D2651] md:max-w-[23rem] md:pl-6 lg:pl-0 border border-[#407BFF]">
                      <TabsTrigger
                        className="inline-flex w-full items-center justify-center rounded-xl text-lg font-medium text-[#fff] data-[state=active]:shadow-none"
                        value="Individual"
                      >
                        Individual
                      </TabsTrigger>
                      <TabsTrigger
                        className="inline-flex w-full items-center justify-center rounded-xl text-lg font-medium text-[#fff] data-[state=active]:shadow-none"
                        value="Family"
                      >
                        Family
                      </TabsTrigger>
                    </TabsList>
                  </div>

                  <TabsContent
                    className="md:mt-6 mt-3 rounded-10 w-full py-10 lg:py-4"
                    value="Individual"
                  >
                    <div className="w-full flex flex-col md:flex-row gap-[1rem] px-6 items-center justify-center">
                      {plansData?.map((plan, idx: number) => (
                        <div
                          className="flex flex-col w-full items-center justify-center"
                          key={idx}
                        >
                          <div className="w-full">
                            <div className="border-[0.3px] border-[#4760FD] rounded-lg bg-[#1A234c]">
                              <div className="w-full py-8 px-6">
                                <div className="">
                                  <UserIcons />
                                </div>
                                <div className="py-3">
                                  <p className="text-base text-[#D1D3DB] font-normal">
                                    {plan?.duration} Months Plan
                                  </p>
                                  <h1 className="text-white text-[2.25rem] font-bold">
                                    ₦{plan?.amount}
                                  </h1>
                                </div>
                                <div className="space-y-4">
                                  {list?.map((list, index: number) => (
                                    <div
                                      className="flex border-b-[0.1px] pb-2 space-y-1 border-[#ddd] border-opacity-20 items-center gap-2"
                                      key={index}
                                    >
                                      <div className="">
                                        <RemitalListIcon />
                                      </div>
                                      <p className="text-white text-xs -mt-1">
                                        {list}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              <div className="border-[.0313rem] border-[#4760FD] rounded-10 mt-5 flex justify-center items-center w-full py-5">
                                <button
                                  className="rounded-3xl font-display focus:shadow-outline w-[10rem] bg-[#fff] p-4 py-2 font-semibold tracking-wide shadow-lg transition-colors delay-150 ease-in-out hover:bg-slate-300 focus:outline-none text-[#1B1687]"
                                  onClick={() => {
                                    handlePayment(plan);
                                    setDuration(plan?.duration);
                                  }}
                                >
                                  Get Insurance
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex sm:flex-row justify-between  px-6 w-full  items-center mt-[1.4rem] gap-1 flex-nowrap">
                      <Link href={"#"} className="text-white text-sm">
                        <span className="text-[#747577]">
                          Terms & Conditions Apply:
                        </span>{" "}
                        libertyaasured.com
                      </Link>
                      <Button
                        className="bg-transparent text-white"
                        onClick={handleSubmit}
                      >
                        Skip
                      </Button>
                    </div>
                  </TabsContent>

                  {/* FAMILY PLAN */}

                  <TabsContent
                    className="mt-1 rounded-10 px-6 lg:px-0 lg:py-4"
                    value="Family"
                  >
                    <div className="w-full flex gap-[1rem] items-center justify-center">
                      <h2 className="text-white text-3xl py-6">coming soon</h2>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </DialogBody>
          </DialogContent>
        </Dialog>
      )}
      {showPaymentModal && (
        <PlanPayment
          showPaymentModal={showPaymentModal}
          setShowPaymentModal={setShowPaymentModal}
          userId={userId}
          PaymentInfo={PaymentInfo}
          setShowSuccessModal={setShowSuccessModal}
          duration={duration}
        />
      )}
      {showConfirmation && (
        <PlanComfirmationModal
          showConfirmation={showConfirmation}
          setShowConfirmation={setShowConfirmation}
          ConfirmationMessage={ConfirmationMessage}
          setShowPaymentModal={setShowPaymentModal}
          checkUserHasPassword={checkUserHasPassword}
        />
      )}
      {/* 
      <RemitalSuccessModal
        showSuccessModal={showSuccessModal}
        setShowSuccessModal={setShowSuccessModal}
        userId={userId}
      /> */}

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

export default RemitalPlanModal;
