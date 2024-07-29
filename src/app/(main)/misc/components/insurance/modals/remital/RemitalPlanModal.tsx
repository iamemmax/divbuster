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
import { Spinner } from "@/icons/core";

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

interface loginSuccess {
  status: boolean;
  user: string;
  access: string;
  refresh: string;
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

  const familyPlanList = [
    {
      duration: 2,
      amount: 24000,
      discount: 18000,
      benefit: "4 people (3 + 1 free)",
    },
    {
      duration: 6,
      amount: 72000,
      discount: 54000,
      benefit: "4 people (3 + 1 free)",
    },
    {
      duration: 12,
      amount: 144000,
      discount: 118000,
      benefit: "4 people (3 + 1 free)",
    },
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

  const user = useDataStore((state) => state?.user);
  const router = useRouter();

  const { mutate: handlePaymentRequest, isLoading } = useMakeRemitalPayment();
  const handlePayment = (plan: plantypes) => {
    handlePaymentRequest(
      {
        duration: plan?.duration,
        userId,
      },
      {
        onSuccess: (data: PaymentSuccessMsg) => {
          if (data?.message === "insurance request sent, please wait") {
            setShowConfirmation(true);
            // setOpenShowRemitalPlan(false);
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
            // setOpenShowRemitalPlan(false);
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
  const { mutate: postLogIn, isLoading: isLoginLoading } = useLogin();

  const updatedData = {
    phone_number: user?.phone_number,
    password: user?.password,
    // device_type: "MOBILE",
  };

  // const
  // const [isLoginLoading, setIsLoginLoading] = useState(false);
  const handleSubmit = () => {
    // setIsLoginLoading(true);
    postLogIn(updatedData, {
      onSuccess: () => {
        setOpenShowRemitalPlan(false);
        router.push("/dashboard");
      },
      onError: (error) => {
        const errorMessage = formatAxiosErrorMessage(error as AxiosError);
        openErrorModalWithMessage(errorMessage as string);
      },
    });
  };
  const tabHeader = ["Individual", "Family", "Corporate"];
  const [selectedTab, setSelectedTab] = useState(tabHeader[0]);
  return (
    <div>
      {isLoginLoading ? (
        <div className="fixed z-[999999999999999999999999] inset-0 bg-white flex justify-center items-center">
          <Spinner color="blue" />
        </div>
      ) : (
        <Dialog open={openRemitalPlan}>
          <DialogContent className="!overflow-hidden rounded-[1.125rem]  min-h-[90vh] max-h-[97vh] px-4 w-full md:min-h-[55rem]">
            <div className="md:w-full flex justify-between items-center">
              <DialogHeader className="bg-[#1B1687]  w-full !justify-between">
                <DialogTitle className="text-[#fff] whitespace-nowrap">
                  {selectedTab} Plan
                </DialogTitle>

                <DialogClose className="rounded-lg">
                  <button
                    onClick={() => {
                      location.reload();
                    }}
                  >
                    Close
                  </button>
                </DialogClose>
              </DialogHeader>
            </div>

            <DialogBody className="bg-[#151D42] w-full rounded-b-[1.125rem] h-full">
              <div className="py-1">
                <div className="text-[#fff] text-center font-semibold text-3xl">
                  <DialogDescription className="text-3xl">
                    Choose Your Plan
                  </DialogDescription>
                </div>
              </div>

              <div className="flex w-full items-center justify-center">
                {selectedTab === "Individual" && (
                  <p className="w-full px-4 md:px-[2rem] text-center  text-base  sm:max-w-[80%] text-[#fff] text-opacity-50 font-medium">
                    Individual plan gives you access to health cover for you
                    only, and you stand a chance to enjoy awesome benefits.
                  </p>
                )}
                {selectedTab === "Family" && (
                  <p className="w-full px-4 md:px-[1.5rem] text-center  text-base sm:max-w-[90%] text-[#fff] text-opacity-50 font-medium">
                    Family plan gives you access to health coverage for your
                    family. When you add up to 3 family member, you get a free
                    plan for the fourth member.
                  </p>
                )}
                {selectedTab === "Corporate" && (
                  <p className="w-full px-4 md:px-[1.5rem] text-center text-base  sm:max-w-[90%] text-[#fff] text-opacity-50 font-medium">
                    Corporate plan gives you access to health coverage for your
                    employees. When you add up to 5 employees, you get a free
                    plan for the sixth member.
                  </p>
                )}
              </div>

              <div className="max-h-[60vh] md:min-h-[409px] rounded-b-lg md:mb-[2rem] md:w-full mt-5 md:mt-6">
                <Tabs
                  className=""
                  defaultValue={selectedTab}
                  onValueChange={(e) => setSelectedTab(e)}
                >
                  <div className="flex w-full px-6 items-center justify-center">
                    <TabsList className="flex w-[98%] justify-center rounded-[.75rem] bg-[#1D2651] md:max-w-[30rem] md:pl-6 lg:pl-0 border border-[#407BFF]">
                      {tabHeader?.map((tab, idx: number) => (
                        <TabsTrigger
                          className="inline-flex w-full items-center justify-center rounded-xl text-lg font-medium text-[#fff] data-[state=active]:shadow-none"
                          value={tab}
                          key={idx}
                        >
                          {tab}
                        </TabsTrigger>
                      ))}
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
                            <div className="border-[0.3px] relative border-[#4760FD] rounded-[1.25rem] bg-[#1A234C]">
                              <div className="w-full py-8  relative">
                                <div className="absolute -top-6 flex justify-center items-center w-full">
                                  <UserIcons width={65} height={65} />
                                </div>
                                <div className="mt-4">
                                  <div className="py-3 px-6">
                                    <p className="text-base text-[#D1D3DB] text-opacity-80 font-normal">
                                      {plan?.duration} Months Plan
                                    </p>
                                    <h1 className="text-white text-[1.5rem] font-bold">
                                      ₦{plan?.amount}
                                    </h1>
                                  </div>
                                  <div className="space-y-4">
                                    {list?.map((list, index: number) => (
                                      <div
                                        className="flex px-6 border-b-[0.1px] pb-2 space-y-1 border-[#ddd] border-opacity-10 items-center gap-2"
                                        key={index}
                                      >
                                        <div className="">
                                          <RemitalListIcon />
                                        </div>
                                        <p className="text-white text-opacity-80 text-xs -mt-1">
                                          {list}
                                        </p>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>

                              <div className="border-[.0313rem] border-[#4760FD] rounded-10 mt-3 flex justify-center items-center w-full py-5">
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
                  </TabsContent>

                  {/* FAMILY PLAN */}

                  <TabsContent
                    className="md:mt-6 mt-3 rounded-10 w-full py-10 lg:py-4"
                    value="Family"
                  >
                    <div className="w-full flex flex-col md:flex-row gap-[1rem] px-6 items-center justify-center">
                      {familyPlanList?.map((plan, idx: number) => (
                        <div
                          className="flex flex-col w-full items-center justify-center"
                          key={idx}
                        >
                          <div className="w-full">
                            <div className="border-[0.3px] relative border-[#4760FD] rounded-[1.25rem] bg-[#1A234C]">
                              <div className="w-full py-8  relative">
                                <div className="absolute -top-6 flex justify-center items-center w-full">
                                  <UserIcons width={65} height={65} />
                                </div>
                                <div className="mt-4">
                                  <div className="py-3 px-6">
                                    <p className="text-base text-[#D1D3DB] text-opacity-80 font-normal">
                                      {plan?.duration} Months Plan
                                    </p>
                                    <div className="flex items-center gap-x-2">
                                      <p className="text-white line-through text-lg text-opacity-80 font-bold">
                                        ₦{plan?.amount}
                                      </p>
                                      <p className="text-white text-lg font-bold">
                                        ₦{plan?.discount}
                                      </p>
                                    </div>
                                    <p className="text-xs py-1 text-[#D1D3DB] text-opacity-80 font-normal">
                                      {plan?.benefit}
                                    </p>
                                  </div>
                                  <div className="space-y-4 mt-1">
                                    {list?.map((list, index: number) => (
                                      <div
                                        className="flex px-6 border-b-[0.1px] pb-2 space-y-1 border-[#ddd] border-opacity-10 items-center gap-2"
                                        key={index}
                                      >
                                        <div className="">
                                          <RemitalListIcon />
                                        </div>
                                        <p className="text-white text-opacity-80 text-xs -mt-1">
                                          {list}
                                        </p>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>

                              <div className="border-[.0313rem] border-[#4760FD] rounded-10 mt-1 flex justify-center items-center w-full py-5">
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
                  </TabsContent>

                  {/* CORPERATE PLAN */}
                  <TabsContent
                    className="md:mt-6 mt-3 rounded-10 w-full py-10 lg:py-4"
                    value="Corporate"
                  >
                    <div className="w-full flex flex-col md:flex-row gap-[1rem] px-6 items-center justify-center">
                      {familyPlanList?.map((plan, idx: number) => (
                        <div
                          className="flex flex-col w-full items-center justify-center"
                          key={idx}
                        >
                          <div className="w-full">
                            <div className="border-[0.3px] relative border-[#4760FD] rounded-[1.25rem] bg-[#1A234C]">
                              <div className="w-full py-8  relative">
                                <div className="absolute -top-6 flex justify-center items-center w-full">
                                  <UserIcons width={65} height={65} />
                                </div>
                                <div className="mt-4">
                                  <div className="py-3 px-6">
                                    <p className="text-base text-[#D1D3DB] text-opacity-80 font-normal">
                                      {plan?.duration} Months Plan
                                    </p>
                                    <div className="flex items-center gap-x-2">
                                      <p className="text-white line-through text-lg text-opacity-80 font-bold">
                                        ₦{plan?.amount}
                                      </p>
                                      <p className="text-white text-lg font-bold">
                                        ₦{plan?.discount}
                                      </p>
                                    </div>
                                    <p className="text-xs py-1 text-[#D1D3DB] text-opacity-80 font-normal">
                                      5 minimum
                                    </p>
                                  </div>
                                  <div className="space-y-4 mt-1">
                                    {list?.map((list, index: number) => (
                                      <div
                                        className="flex px-6 border-b-[0.1px] pb-2 space-y-1 border-[#ddd] border-opacity-10 items-center gap-2"
                                        key={index}
                                      >
                                        <div className="">
                                          <RemitalListIcon />
                                        </div>
                                        <p className="text-white text-opacity-80 text-xs -mt-1">
                                          {list}
                                        </p>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>

                              <div className="border-[.0313rem] border-[#4760FD] rounded-10 mt-1 flex justify-center items-center w-full py-5">
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
                  </TabsContent>
                </Tabs>
                <div
                  className={`flex sm:flex-row justify-between  px-6 w-full pb-1 items-center ${selectedTab === "Individual" ? " mt-[1rem]" : ""} gap-1 flex-nowrap`}
                >
                  <Link href={"#"} className="text-white text-sm">
                    <span className="text-[#747577]">
                      Terms & Conditions Apply:
                    </span>{" "}
                    libertyaasured.com
                  </Link>
                  <Button
                    type="button"
                    className="bg-[#525668] rounded-[1.25rem] px-5 py-3 font-semibold text-white"
                    onClick={handleSubmit}
                  >
                    Skip
                  </Button>
                </div>
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
