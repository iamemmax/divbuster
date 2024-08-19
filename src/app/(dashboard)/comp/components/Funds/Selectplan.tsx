"use client";
// import React, { useState } from "react";
// import {
//   Button,
//   ClientOnly,
//   Dialog,
//   DialogBody,
//   DialogClose,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   ErrorModal,
//   LinkButton,
//   RadioGroup,
//   RadioGroupItem,
// } from "@/components/core";
// import CopyIcon2 from "../../icons/CopyIcon2";
// import { Label } from "@radix-ui/react-label";
// import { PayStack } from "../../icons";
// import SuccessPaymentModal from "./SuccessPayment";
// import { formatAxiosErrorMessage, formatCurrency } from "@/utils";
// import { useClipboard, useErrorModalState } from "@/hooks";
// import { successProp } from "../plans/SelectDurationModal";
// import { useUser } from "@/app/(auth)/(onboarding)/misc";
// import { useRouter } from "next/navigation";
// import { useQuery } from "react-query";
// import { confirmTransfer } from "@/app/(main)/misc/components/insurance/api/plan/confirmTransfer";
// import toast from "react-hot-toast";
// import { AxiosError } from "axios";
// import { SmallSpinner } from "@/icons/core";

// interface UseBooleanStateControlProps {
//   isSelectPlanModalOpen: boolean;
//   setSelectPlanModal: React.Dispatch<React.SetStateAction<boolean>>;
//   paymentProp: successProp | undefined;
//   heading: string;
//   subsection: string;
//   children?: React.ReactNode;
// }
// function SelectPlanModal({
//   isSelectPlanModalOpen,
//   setSelectPlanModal,
//   paymentProp,
//   heading,
//   subsection,
// }: UseBooleanStateControlProps) {
//   interface data {
//     item: string;
//     value: string;
//   }

//   const [SuccessPayment, setSuccessPayment] = useState(false);

//   const [selectedValue, setSelectedValue] = useState<string>("");

//   const [errorMsg, setErrorMsg] = React.useState("");

//   const {
//     isErrorModalOpen,
//     setErrorModalState,
//     openErrorModalWithMessage,
//     errorModalMessage,
//   } = useErrorModalState();
//   const { data: users, isLoading } = useUser();
//   const router = useRouter();
//   const { refetch } = useQuery({
//     queryFn: () => confirmTransfer(String(users?.phone_number)),
//     queryKey: ["confirm-transfer", users?.phone_number],
//     enabled: false,
//     onSuccess: (data) => {
//       if (data.message !== "success") {
//         toast.success(data?.message);
//         router.push("/dashboard");
//       } else {
//         setErrorMsg(data?.message);
//         openErrorModalWithMessage(String(data?.message));
//       }
//     },
//     onError: (error) => {
//       const errorMessage = formatAxiosErrorMessage(error as AxiosError);
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//   // @ts-expect-error
//       setErrorMsg(error?.response?.data?.error);
//       openErrorModalWithMessage(String(errorMessage));
//     },
//   });
//   const { copy } = useClipboard();
//   return (
//     <div className="rounded-xl">
//       <ClientOnly>
//         <Dialog open={isSelectPlanModalOpen}>
//           <DialogContent className="!overflow-hidden">
//             <DialogHeader className="bg-[#1B1687] ">
//               <DialogTitle className="text-[#fff]">{heading}</DialogTitle>
//               <DialogClose
//                 className="rounded-10 bg-transparent border-[0.3px] border-[#407BFF]"
//                 onClick={() => setSelectPlanModal(false)}
//               >
//                 <button>Close</button>
//               </DialogClose>
//             </DialogHeader>
//             <DialogBody className="bg-[#141B3f]">
//   <article className=" text-sm text-white">
//     <p className="text-white text-sm w-4/5">{subsection}</p>
//     {/* <div className="text-[#FFFFFFCC] text-base gap-y-3 mt-5">
//       <RadioGroup defaultValue={String(paymentOption[0]?.price)}>
//         {paymentOption?.map((payment, idx: number) => (
//           <div
//             className="flex space-x-2 items-center mt-3 bg-[#FFFFFF1A] rounded-10 py-3 pl-4"
//             key={idx}
//           >
//             <RadioGroupItem
//               className="w-4 h-4 p-0 rounded-full border border-[#ffffff] bg-[#141B3F] checked:bg-[#407BFF] checked:border-[#407BFF]"
//               value={String(payment?.price)}
//               id={payment?.duration}
//             />
//             <Label className="text-sm" htmlFor={payment?.duration}>
//               {payment?.duration}
//               <span className="text-white  pl-2 font-bold text-sm">
//                 {formatCurrency(payment?.price)}
//               </span>
//             </Label>
//           </div>
//         ))}
//       </RadioGroup>
//     </div> */}
//     <div className="flex justify-center items-center gap-x-2 py-3">
//       <div className=" border-dashed border border-[#9F9F9F] w-[120px] h-[1px]"></div>
//       <div className="text-sm">Payment Option</div>
//       <div className=" border-dashed border border-[#9F9F9F] w-[120px] h-[1px]"></div>
//     </div>
//     <div className="bg-[#FFFFFF1A] rounded-2xl pt-4 pb-3 px-6 mt-5">
//       <p className="pb-4">Make payment via transfer</p>
//       <div className="border-b-[0.3px] border-[#FFFFFF1A]"></div>
//       <article className="flex justify-between">
//         <div className="grid grid-cols-2 py-5 gap-5 w-full">
//           <div className=" w-full">
//             <p className="text-[#FFFFFF99] text-xs">Account name</p>
//             <p className="font-sans font-medium">
//               {paymentProp?.account_name ?? "Nil"}
//             </p>
//           </div>
//           <div className=" w-full">
//             <p className="text-[#FFFFFF99] text-xs">Account no</p>

//             <div className=" flex items-center gap-3">
//               <p className="font-sans font-medium">
//                 {paymentProp?.account_number}
//               </p>
//               <CopyIcon2
//                 onClick={() =>
//                   copy(String(paymentProp?.account_number))
//                 }
//               />
//             </div>
//           </div>
//           <div className="gap-x-4 col-span-2">
//             <p className="text-[#FFFFFF99] text-xs">Bank name</p>
//             <p className="font-sans font-medium">
//               {paymentProp?.bank_name}
//             </p>
//           </div>
//         </div>
//       </article>
//     </div>
//     <div className="mt-4">
//       <RadioGroup
//         value={selectedValue}
//         onValueChange={setSelectedValue}
//       >
//         <div className="flex items-center space-x-2 bg-[#FFFFFF1A] rounded-10 py-3 pl-4">
//           <RadioGroupItem
//             value=""
//             id="r1"
//             className={`w-4 h-4 p-0 rounded-full border
//   ${selectedValue === "" ? "bg-[#407BFF] border-[#407BFF]" : "bg-[#141B3F] border-[#ffffff]"}
// `}
//             aria-labelledby="r1-label"
//           />
//           <label
//             id="r1-label"
//             htmlFor="r1"
//             className="flex justify-between gap-20 cursor-pointer"
//           >
//             <div>Main wallet Balance:</div>
//             <div className="font-medium">
//               {formatCurrency(Number(paymentProp?.wallet_balance))}
//             </div>
//           </label>
//         </div>
//         {/* Add more RadioGroup.Item components here if needed */}
//       </RadioGroup>
//     </div>
//     <div className="pb-6">
//       <LinkButton
//         href={paymentProp?.paystack_link ?? ""}
//         className="border-[0.3px] border-[#407BFF] py-4 gap-2 w-full mt-10 rounded-10"
//         //   onClick={() => setSuccessPayment(true)}
//       >
//         <div>
//           <PayStack />
//         </div>
//         <div className="font-sans font-medium">
//           Pay with paystack{" "}
//         </div>
//       </LinkButton>
{
  /* <Button
  className="w-full text-[#1B1687] bg-white py-3.5 font-medium text-sm mt-6"
  onClick={() => refetch()}
>
  I have made payment {isLoading && <SmallSpinner />} */
}
// </Button>;
//     </div>
//   </article>
//             </DialogBody>
//           </DialogContent>
//         </Dialog>
//       </ClientOnly>
//       {SuccessPayment && (
//         <SuccessPaymentModal
//           isSuccessPaymentModalOpen={SuccessPayment}
//           setSuccessPaymentModal={setSuccessPayment}
//           subsection="Application Successful"
//           heading={""}
//         />
//       )}
//       <ErrorModal
//         isErrorModalOpen={isErrorModalOpen}
//         setErrorModalState={() => {
//           setErrorModalState(false);
//         }}
//         subheading={
//           errorModalMessage ||
//           errorMsg ||
//           "Please check your inputs and try again."
//         }
//       ></ErrorModal>
//     </div>
//   );
// }
// export default SelectPlanModal;

import React, { useState } from "react";
import {
  Button,
  ClientOnly,
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  ErrorModal,
  LinkButton,
  RadioGroup,
  RadioGroupItem,
} from "@/components/core";
import CopyIcon2 from "../../icons/CopyIcon2";
import { PayStack } from "../../icons";
import SuccessPaymentModal from "./SuccessPayment";
import { formatAxiosErrorMessage, formatCurrency } from "@/utils";
import { useClipboard, useErrorModalState } from "@/hooks";
import { successProp } from "../plans/SelectDurationModal";
import { useUser } from "@/app/(auth)/(onboarding)/misc";
import { useRouter } from "next/navigation";
import { useQuery } from "react-query";
import { confirmTransfer } from "@/app/(main)/misc/components/insurance/api/plan/confirmTransfer";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { SmallSpinner } from "@/icons/core";

interface UseBooleanStateControlProps {
  isSelectPlanModalOpen: boolean;
  setSelectPlanModal: React.Dispatch<React.SetStateAction<boolean>>;
  paymentProp: successProp | undefined;
  heading: string;
  subsection: string;
  children?: React.ReactNode;
}

function SelectPlanModal({
  isSelectPlanModalOpen,
  setSelectPlanModal,
  paymentProp,
  heading,
  subsection,
}: UseBooleanStateControlProps) {
  const [SuccessPayment, setSuccessPayment] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string>("transfer"); // Default to Transfer
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
      //    @ts-expect-error
      setErrorMsg(error?.response?.data?.error);
      openErrorModalWithMessage(String(errorMessage));
    },
  });
  const { copy } = useClipboard();
console.log(paymentProp,"paymentProp");

  return (
    <div className="rounded-xl">
      <ClientOnly>
        <Dialog open={isSelectPlanModalOpen}>
          <DialogContent className="!overflow-hidden">
            <DialogHeader className="bg-[#1B1687]">
              <DialogTitle className="text-[#fff]">{heading}</DialogTitle>
              <DialogClose
                className="rounded-10 bg-transparent border-[0.3px] border-[#407BFF]"
                onClick={() => setSelectPlanModal(false)}
              >
                <button>Close</button>
              </DialogClose>
            </DialogHeader>
            <DialogBody className="bg-[#141B3f]">
              <article className="text-sm text-white pb-6">
                <p className="text-white text-sm w-4/5">{subsection}</p>
                <div className="flex justify-center items-center gap-x-2 py-3">
                  <div className="border-dashed border border-[#9F9F9F] w-[120px] h-[1px]"></div>
                  <div className="text-sm">Payment Option</div>
                  <div className="border-dashed border border-[#9F9F9F] w-[120px] h-[1px]"></div>
                </div>

                {/* Payment Option Details */}
                {selectedValue === "transfer" && (
                  <div className="bg-[#FFFFFF1A] rounded-2xl pt-4 pb-3 px-6 mt-5">
                    <p className="pb-4">Make payment via transfer</p>
                    <div className="border-b-[0.3px] border-[#FFFFFF1A]"></div>
                    <article className="flex justify-between">
                      <div className="grid grid-cols-2 py-5 gap-5 w-full">
                        <div className="w-full">
                          <p className="text-[#FFFFFF99] text-xs">
                            Account name
                          </p>
                          <p className="font-sans font-medium">
                            {paymentProp?.account_name ?? "Nil"}
                          </p>
                        </div>
                        <div className="w-full">
                          <p className="text-[#FFFFFF99] text-xs">Account no</p>
                          <div className="flex items-center gap-3">
                            <p className="font-sans font-medium">
                              {paymentProp?.account_number}
                            </p>
                            <CopyIcon2
                              onClick={() =>
                                copy(String(paymentProp?.account_number))
                              }
                            />
                          </div>
                        </div>
                        <div className="gap-x-4 col-span-2">
                          <p className="text-[#FFFFFF99] text-xs">Bank name</p>
                          <p className="font-sans font-medium">
                            {paymentProp?.bank_name}
                          </p>
                        </div>
                      </div>
                    </article>
                  </div>
                )}

                <div className="mt-4">
                  <RadioGroup
                    value={selectedValue}
                    onValueChange={setSelectedValue}
                  >
                    {/* Transfer Option */}
                    <div className="flex items-center space-x-2 bg-[#FFFFFF1A] rounded-10 py-3 pl-4">
                      <RadioGroupItem
                        value="transfer"
                        id="transfer"
                        className={`w-4 h-4 p-0 rounded-full border
              ${selectedValue === "transfer" ? "bg-[#407BFF] border-[#407BFF]" : "bg-[#141B3F] border-[#ffffff]"}
            `}
                        aria-labelledby="transfer-label"
                      />
                      <label
                        id="transfer-label"
                        htmlFor="transfer"
                        className="flex justify-between gap-20 cursor-pointer"
                      >
                        <div>Transfer</div>
                      </label>
                    </div>

                    {/* Main Wallet Option */}
                    <div className="flex items-center space-x-2 bg-[#FFFFFF1A] rounded-10 py-3 pl-4">
                      <RadioGroupItem
                        value="main"
                        id="main"
                        className={`w-4 h-4 p-0 rounded-full border
              ${selectedValue === "main" ? "bg-[#407BFF] border-[#407BFF]" : "bg-[#141B3F] border-[#ffffff]"}
            `}
                        aria-labelledby="main-label"
                      />
                      <label
                        id="main-label"
                        htmlFor="main"
                        className="flex justify-between gap-20 cursor-pointer"
                      >
                        <div>Main wallet Balance:</div>
                        <div className="font-medium">
                          {formatCurrency(Number(paymentProp?.wallet_balance))}
                        </div>
                      </label>
                    </div>

                    {/* Paystack Option */}
                    <div className="flex items-center space-x-2 bg-[#FFFFFF1A] rounded-10 py-3 pl-4 mt-3">
                      <RadioGroupItem
                        value="paystack"
                        id="paystack"
                        className={`w-4 h-4 p-0 rounded-full border
              ${selectedValue === "paystack" ? "bg-[#407BFF] border-[#407BFF]" : "bg-[#141B3F] border-[#ffffff]"}
            `}
                        aria-labelledby="paystack-label"
                      />
                      <label
                        id="paystack-label"
                        htmlFor="paystack"
                        className="flex justify-between gap-20 cursor-pointer"
                      >
                        <div>Pay with Paystack</div>
                      </label>
                    </div>

                    {/* Paystack Button */}
                    {selectedValue === "paystack" && (
                      <div className="pb-3">
                        <LinkButton
                          href={paymentProp?.paystack_link ?? ""}
                          className="border-[0.3px] border-[#407BFF] py-4 gap-2 w-full mt-10 rounded-10"
                        >
                          <div>
                            <PayStack />
                          </div>
                          <div className="font-sans font-medium">
                            Pay with Paystack
                          </div>
                        </LinkButton>
                      </div>
                    )}
                  </RadioGroup>
                </div>

                {/* Button to Confirm Transfer */}
                {selectedValue === "main" && (
                  <Button
                    className="w-full text-[#1B1687] bg-white py-3.5 font-medium text-sm mt-6 mb-4"
                    // onClick={() => refetch()}
                  >
                    Continue {isLoading && <SmallSpinner />}
                  </Button>
                )}
                {selectedValue === "transfer" && (
                  <Button
                    className="w-full text-[#1B1687] mb-4 bg-white py-3.5 font-medium text-sm mt-6"
                    onClick={() => refetch()}
                  >
                    I have made payment {isLoading && <SmallSpinner />}
                  </Button>
                )}
              </article>
            </DialogBody>
          </DialogContent>
        </Dialog>
      </ClientOnly>
      {SuccessPayment && (
        <SuccessPaymentModal
          isSuccessPaymentModalOpen={SuccessPayment}
          setSuccessPaymentModal={setSuccessPayment}
          subsection="Application Successful"
          heading={""}
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
}

export default SelectPlanModal;
