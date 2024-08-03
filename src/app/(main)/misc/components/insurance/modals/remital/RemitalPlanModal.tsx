import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
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
// import PlanComfirmationModal from "./PlanComfirmationModal";
// import PlanPayment from "./PlanPayment";
// import RemitalSuccessModal from "./RemitalSuccessModal";
import { useQuery } from "react-query";
import { getPlan } from "../../api/plan/getPlan";
// import { useMakeRemitalPayment } from "../../api/remital/remitalpayment";
import { formatAxiosErrorMessage } from "@/utils";
import { AxiosError } from "axios";
import { useErrorModalState } from "@/hooks";
import { useLogin } from "@/app/(auth)/(onboarding)/misc";
import { useRouter } from "next/navigation";
import useDataStore from "@/app/store/useStore";
import { Spinner } from "@/icons/core";
import SubmitPlanModal from "./SubmitPlan";

interface Prop {
  setOpenShowRemitalPlan: Dispatch<SetStateAction<boolean>>;
  openRemitalPlan: boolean;
  userId: string;
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

  const [errorMsg, setErrorMsg] = useState("");
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [planType, setPlanType] = useState({
    duration: 0,
    amount: "",
    userId: "",
    play_type: "",
  });
  const { data: plansData, isLoading: loadingPlan } = useQuery({
    queryFn: getPlan,
    queryKey: ["get-plans"],
  });

  const user = useDataStore((state) => state?.user);
  const router = useRouter();

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
  // const tabHeader = ["Individual", "Family", "Corporate"];
  const [selectedTab, setSelectedTab] = useState(
    plansData ? plansData[0]?.package_name : ""
  );

  useEffect(() => {
    if (plansData) {
      setSelectedTab(plansData[0]?.package_name);
    }
  }, [plansData]);

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

                <DialogClose
                  className="rounded-lg"
                  onClick={() => {
                    location.reload();
                  }}
                >
                  <button>Close</button>
                </DialogClose>
              </DialogHeader>
            </div>

            <DialogBody className="bg-[#151D42] w-full rounded-b-[1.125rem] h-full">
              {loadingPlan ? (
                <div className="flex justify-center h-36 items-center">
                  <Spinner color="white" />
                </div>
              ) : (
                <>
                  <div className="py-1">
                    <div className="text-[#fff] text-center font-semibold text-3xl">
                      <DialogDescription className="text-3xl">
                        Choose Your Plan
                      </DialogDescription>
                    </div>
                  </div>

                  <div className="flex w-full items-center justify-center">
                    {selectedTab === "INDIVIDUAL" && (
                      <p className="w-full px-4 md:px-[2rem] text-center  text-base  sm:max-w-[80%] text-[#fff] text-opacity-50 font-medium">
                        Individual plan gives you access to health cover for you
                        only, and you stand a chance to enjoy awesome benefits.
                      </p>
                    )}
                    {selectedTab === "FAMILY" && (
                      <p className="w-full px-4 md:px-[1.5rem] text-center  text-base sm:max-w-[90%] text-[#fff] text-opacity-50 font-medium">
                        Family plan gives you access to health coverage for your
                        family. When you add up to 3 family member, you get a
                        free plan for the fourth member.
                      </p>
                    )}
                    {selectedTab === "CORPERATE" && (
                      <p className="w-full px-4 md:px-[1.5rem] text-center text-base  sm:max-w-[90%] text-[#fff] text-opacity-50 font-medium">
                        Corporate plan gives you access to health coverage for
                        your employees. When you add up to 5 employees, you get
                        a free plan for the sixth member.
                      </p>
                    )}
                  </div>

                  <div className="max-h-[60vh] overflow-y-auto md:min-h-[409px] rounded-b-lg md:mb-[2rem] md:w-full mt-5 md:mt-6">
                    <Tabs
                      className=""
                      defaultValue={selectedTab}
                      onValueChange={(e) => setSelectedTab(e)}
                    >
                      <div className="flex w-full px-6 items-center justify-center">
                        <TabsList className="flex w-[98%] justify-center rounded-[.75rem] bg-[#1D2651] md:max-w-[30rem] md:pl-6 lg:pl-0 border border-[#407BFF]">
                          {plansData?.map((tab, idx: number) => (
                            <TabsTrigger
                              className="inline-flex w-full items-center justify-center rounded-xl text-lg font-medium text-[#fff] data-[state=active]:shadow-none"
                              value={tab?.package_name}
                              key={idx}
                            >
                              {tab?.package_name}
                            </TabsTrigger>
                          ))}
                        </TabsList>
                      </div>

                      {/*  PLAN */}
                      {plansData?.map((healthPlan, idx: number) => (
                        <TabsContent
                          key={idx}
                          className="md:mt-6 mt-3 rounded-10 w-full py-10 lg:py-4"
                          value={healthPlan?.package_name}
                        >
                          <div
                            className={`${healthPlan?.data?.length > 2 ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-y-8  gap-x-[1rem] px-6 " : " w-full flex flex-col md:flex-row gap-[1rem] px-6 items-center justify-center"}`}
                          >
                            {healthPlan?.data?.map((plan, idxx: number) => (
                              <div
                                className="flex flex-col w-full items-center justify-center"
                                key={idxx}
                              >
                                <div className="w-full">
                                  <div className="border-[0.3px] relative border-[#4760FD] rounded-[1.25rem] bg-[#1A234C]">
                                    <div className="w-full py-8  relative">
                                      <div className="absolute -top-6 flex justify-center items-start w-full">
                                        <UserIcons width={65} height={65} />
                                      </div>
                                      <div className="mt-4">
                                        <div className="py-3 px-4">
                                          <p className="text-base text-[#D1D3DB] text-opacity-80 font-normal">
                                            {plan?.plan_duration?.duration}{" "}
                                            Months Plan
                                          </p>
                                          <div className="flex items-center gap-x-2">
                                            {plan?.old_price && (
                                              <p className="text-white line-through text-lg text-opacity-80 font-bold">
                                                ₦{plan?.old_price}
                                              </p>
                                            )}
                                            {plan?.price && (
                                              <p className="text-white text-lg font-bold">
                                                ₦{plan?.price}
                                              </p>
                                            )}
                                          </div>
                                          {healthPlan?.package_name === "FAMILY" && (
  <p className="text-xs py-1 text-[#D1D3DB] text-opacity-80 font-normal">
    3 Individuals (3 + 1 free )
  </p>
)}
                                          {
 healthPlan?.package_name === "CORPERATE" && (
  <p className="text-xs py-1 text-[#D1D3DB] text-opacity-80 font-normal">
    Minimum of {plan?.plan_duration?.min_members} 
  </p>
)}

                                        </div>
                                        <div className="space-y-[10px] mt-1">
                                          {plan?.descriptions?.map(
                                            (list, index: number) => (
                                              <div
                                                className="flex px-4 border-b-[0.1px] pb-2 space-y-1 border-[#ddd] border-opacity-10 items-center gap-2"
                                                key={index}
                                              >
                                                <div className="">
                                                  <RemitalListIcon />
                                                </div>
                                                <p className="text-white text-opacity-80 text-xs -mt-1">
                                                  {list}
                                                </p>
                                              </div>
                                            )
                                          )}
                                        </div>
                                      </div>
                                    </div>

                                    <div className="border-[.0313rem] border-[#4760FD] rounded-10 -mt-1 flex justify-center items-center w-full py-5">
                                      <button
                                        className="rounded-3xl font-display focus:shadow-outline w-[10rem] bg-[#fff] p-4 py-2 font-semibold tracking-wide shadow-lg transition-colors delay-150 ease-in-out hover:bg-slate-300 focus:outline-none text-[#1B1687]"
                                        onClick={() => {
                                          setPlanType({
                                            userId,
                                            duration:
                                              plan?.plan_duration?.duration,
                                            amount: plan?.price,
                                            play_type: healthPlan?.package_name,
                                          });
                                          setShowSubmitModal(true);
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
                      ))}
                    </Tabs>
                  </div>
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
                </>
              )}
            </DialogBody>
          </DialogContent>
        </Dialog>
      )}

      {showSubmitModal && (
        <SubmitPlanModal
          showSubmitModal={showSubmitModal}
          setShowSubmitModal={setShowSubmitModal}
          planType={planType}
        />
      )}
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
