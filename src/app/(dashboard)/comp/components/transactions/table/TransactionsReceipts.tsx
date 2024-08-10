"use client";
import React from "react";
import {
  Button,
  ClientOnly,
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/core";
import { TransactionTypes } from "@/app/(dashboard)/dashboard/api/fetchTransaction";
import {
  capitalizeFirstLetter,
  formatCurrency,
  removeCommaFromPrice,
} from "@/utils";
import moment from "moment";
import { UserDataTypes } from "@/app/(auth)/(onboarding)/misc";

interface UseBooleanStateControlProps {
  isTransactionDetailsModalOpen: boolean;
  setTransactionDetailsModal: React.Dispatch<React.SetStateAction<boolean>>;
  transDetails: TransactionTypes | undefined;
  heading: string;
  subsection: string;
  children?: React.ReactNode;
  userData: UserDataTypes | undefined;
}


function TransactionReceivedModal({
  transDetails,
  isTransactionDetailsModalOpen,
  setTransactionDetailsModal,
  userData,
  heading,
  subsection,

  // children,
}: UseBooleanStateControlProps) {
 
  return (
    <div className="rounded-xl">
      <ClientOnly>
        <Dialog open={isTransactionDetailsModalOpen}>
          <DialogContent className="!overflow-hidden">
            <DialogHeader className="bg-[#1B1687] ">
              <DialogTitle className="text-[#fff]">{heading}</DialogTitle>

              <DialogClose className="rounded-10 bg-transparent border-[0.3px] border-[#407BFF]" onClick={() => setTransactionDetailsModal(false)}>
                <button>
                  Close
                </button>
              </DialogClose>
            </DialogHeader>

            <DialogBody className="bg-[#141B3f]">
              <article className=" text-sm pb-5">
                <div>
                 
                    <div>
                      <div>
                        <p className="text-[#FFFFFF99] text-sm">Amount:</p>
                        <div>
                          <div className="grid grid-cols-2">
                            <p className="text-xl font-bold text-[#FFFFFFCC]">
                              {formatCurrency(
                                Number(
                                  removeCommaFromPrice(
                                    String(transDetails?.amount)
                                  )
                                )
                              )}
                            </p>
                            <div>
                              <Button className="rounded-full bg-[#FFFFFF1A]  text-white px-6 block py-2 text-xs">
                                {capitalizeFirstLetter(
                                  transDetails?.transaction_status?.toLocaleLowerCase() ??
                                    ""
                                )}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-5">
                        <div className="grid grid-cols-2 py-2">
                          <p className="text-[#FFFFFF99]">Transaction Type</p>
                          <p className="text-[#FFFFFFCC] text-start">
                            {capitalizeFirstLetter(String(transDetails?.transaction_type))}
                          </p>
                        </div>
                        <div className="grid grid-cols-2 py-2">
                          <p className="text-[#FFFFFF99]">Paid by</p>
                          <p className="text-[#FFFFFFCC] text-start">
                            {`${capitalizeFirstLetter(String(userData?.first_name))} ${capitalizeFirstLetter(String(userData?.last_name))}`}
                            {/* {userData?.} */}
                          </p>
                        </div>
                      </div>
                      <p className="text-[#FFFFFFCC] mt-5 text-sm">
                        {subsection}
                      </p>
                      <div className="mt-5">
                      <div className="grid grid-cols-2 py-2">
                          <p className="text-[#FFFFFF99]">Transaction ref</p>
                          <p className="text-[#FFFFFFCC] text-start" style={{wordBreak:"break-word"}}>
                            {`${capitalizeFirstLetter(String(transDetails?.transaction_reference))}`}
                            {/* {userData?.} */}
                          </p>
                        </div>
                      <div className="grid grid-cols-2 py-2">
                          <p className="text-[#FFFFFF99]">Transaction status</p>
                          <p className="text-[#FFFFFFCC] text-start" >
                            {`${capitalizeFirstLetter(String(transDetails?.transaction_status))}`}
                            {/* {userData?.} */}
                          </p>
                        </div>
                        <div className="grid grid-cols-2 py-2">
                          <p className="text-[#FFFFFF99]">Time</p>
                          <p className="text-[#FFFFFFCC] text-xs">
                            {moment(transDetails?.created_at).format(
                              " h:mm:ss a"
                            )}
                          </p>
                        </div>
                        <div className="grid grid-cols-2 py-2">
                          <p className="text-[#FFFFFF99]">Date</p>
                          <p className="text-[#FFFFFFCC] text-xs">
                            {moment(transDetails?.created_at).format(
                              "dddd, MMMM Do YYYY,"
                            )}
                          </p>
                        </div>
                      </div>
                      {/* <div className="grid grid-cols-2 my-12">
                        <div>
                          <Button className="rounded-[20px] border-[0.3px] border-[#FFFFFF99] py-3.5 px-7">
                            Download receipts
                          </Button>
                        </div>
                        <div>
                          <Button className="rounded-[20px] border-[0.3px] border-[#FFFFFF99] py-3.5 px-10">
                            Share receipts
                          </Button>
                        </div>
                      </div> */}
                    </div>
                
                </div>
              </article>
            </DialogBody>
          </DialogContent>
        </Dialog>
      </ClientOnly>
    </div>
  );
}

export default TransactionReceivedModal;
