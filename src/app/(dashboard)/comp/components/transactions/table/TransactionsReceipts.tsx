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

interface data {
  trans: {
    item: string;
    value: string;
  }[];
  wallet: {
    item: string;
    value: string;
  }[];
  other: {
    item: string;
    value: string;
  }[];
}

const data: data[] = [
  {
    trans: [
      {
        item: "₦10,000.00",
        value: "successful",
      },
    ],
    wallet: [
      {
        item: "Wallet type",
        value: "Main Wallet",
      },
      {
        item: "Transaction type",
        value: "Credit",
      },
      {
        item: "Paid by",
        value: "Olamide Keulere",
      },
      {
        item: "Narration",
        value: "Your Health Cover",
      },
    ],

    other: [
      {
        item: "Transaction ref",
        value: "NF20394029DG",
      },
      {
        item: "Transaction status",
        value: "Successful",
      },
      {
        item: "Date",
        value: "Jul 16 2024",
      },
      {
        item: "Time",
        value: "8:01am",
      },
    ],
  },
];

function TransactionReceivedModal({
  transDetails,
  isTransactionDetailsModalOpen,
  setTransactionDetailsModal,
  userData,
  heading,
  subsection,

  // children,
}: UseBooleanStateControlProps) {
  const data: data[] = [
    {
      trans: [
        {
          item: "₦10,000.00",
          value: "successful",
        },
      ],
      wallet: [
        {
          item: "Wallet type",
          value: "Main Wallet",
        },
        {
          item: "Transaction type",
          value: "Credit",
        },
        {
          item: "Paid by",
          value: `${userData?.first_name} ${userData?.last_name}`,
        },
        {
          item: "Narration",
          value: "Your Health Cover",
        },
      ],

      other: [
        {
          item: "Transaction ref",
          value: "NF20394029DG",
        },
        {
          item: "Transaction status",
          value: "Successful",
        },
        {
          item: "Date",
          value: "Jul 16 2024",
        },
        {
          item: "Time",
          value: "8:01am",
        },
      ],
    },
  ];
  return (
    <div className="rounded-xl">
      <ClientOnly>
        <Dialog open={isTransactionDetailsModalOpen}>
          <DialogContent className="!overflow-hidden">
            <DialogHeader className="bg-[#1B1687] ">
              <DialogTitle className="text-[#fff]">{heading}</DialogTitle>

              <DialogClose className="rounded-10 bg-transparent border-[0.3px] border-[#407BFF]">
                <button onClick={() => setTransactionDetailsModal(false)}>
                  close
                </button>
              </DialogClose>
            </DialogHeader>

            <DialogBody className="bg-[#141B3f]">
              <article className=" text-sm pb-5">
                <div>
                  {data.map((item, index) => (
                    <div key={index}>
                      <div>
                        <p className="text-[#FFFFFF99] text-sm">Amount:</p>
                        <div>
                          <div key={index} className="grid grid-cols-2">
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
                                  transDetails?.status?.toLocaleLowerCase() ??
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
                            {capitalizeFirstLetter(String(transDetails?.mode))}
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
                        <div key={index} className="grid grid-cols-2 py-2">
                          <p className="text-[#FFFFFF99]">Time</p>
                          <p className="text-[#FFFFFFCC] text-xs">
                            {moment(transDetails?.["date/time"]).format(
                              " h:mm:ss a"
                            )}
                          </p>
                        </div>
                        <div key={index} className="grid grid-cols-2 py-2">
                          <p className="text-[#FFFFFF99]">Date</p>
                          <p className="text-[#FFFFFFCC] text-xs">
                            {moment(transDetails?.["date/time"]).format(
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
                  ))}
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

function setTransactionDetailsModal(arg0: boolean) {
  throw new Error("Function not implemented.");
}

// import {  Button, Modal } from '@/components/core'
// import { useBooleanStateControl } from '@/hooks'
// import React, { useState } from 'react'

// interface data {
//     trans: {
//         item: string;
//         value: string
//     }[];
//     wallet: {
//         item: string;
//         value: string
//     }[];
//     other: {
//         item: string
//         value: string
//     }[]
// }

// const TransactionsReceipts = () => {

//     const [transactionDetails, setTransactionDetails] = useState(false)

//     const data: data[] = [{
//         trans: [
//             {
//                 item: "₦10,000.00",
//                 value: "successful"
//             }
//         ],
//         wallet: [
//             {
//                 item: "Wallet type",
//                 value: "Main Wallet"
//             },
//             {
//                 item: "Transaction type",
//                 value: "Credit"
//             },
//             {
//                 item: "Paid by",
//                 value: "Olamide Keulere"
//             },
//             {
//                 item: "Narration",
//                 value: "Your Health Cover"
//             },],

//         other: [
//             {
//                 item: "Transaction ref",
//                 value: "NF20394029DG"
//             },
//             {
//                 item: "Transaction status",
//                 value: "Successful"
//             },
//             {
//                 item: "Date",
//                 value: "Jul 16 2024"
//             },
//             {
//                 item: "Time",
//                 value: "8:01am"
//             },
//         ]
//     }
//     ]
//     const {
//         state: isModalOpen,
//         setTrue: openModal,
//         setFalse: closeModal
//     } = useBooleanStateControl()
//     return (
//         <div>

//             <Modal
//                 isModalOpen={isModalOpen}
//                 closeModal={closeModal}
//                 label='Transaction Details'
//                 width='500px'
//                 allowDismiss
//                 className='bg-[#080D27] border-[0.3px] border-[#407BFF] w-full rounded-b-2xl'
//             >
//                 <div className='bg-[#1B1687] flex justify-between items-center text-white pt-3 pb-2 px-8'>
//                     <p>Transaction Details</p>
//                     <button className='border-[0.3px] border-[#407BFF] px-6 py-2 rounded-10 text-sm' onClick={closeModal}>
//                         close
//                     </button>
//                 </div>
//                 <article className='pl-8 pr-10 text-xs'>
//                     <div >
//                         {
//                             data.map((item, index) =>
//                                 <div key={index}>
//                                     <div>
//                                         <p className='text-[#FFFFFF99] text-sm pt-6'>Amount:</p>
//                                         <div>{item?.trans?.map((items, index) =>
//                                             <div key={index} className='flex justify-between items-center'>
//                                                 <p className='text-xl font-bold text-[#FFFFFFCC]'>{items?.item}</p>
//                                                 <p className='rounded-full bg-[#FFFFFF1A] text-white px-6 py-2 text-xs'>{items?.value}</p>
//                                             </div>
//                                         )}
//                                         </div>
//                                     </div>
//                                     <div className='mt-5'>
//                                         {item?.wallet?.map((items, index) =>
//                                             <div key={index} className='flex justify-between items-center py-2'>
//                                                 <p className='text-[#FFFFFF99]'>{items?.item}</p>
//                                                 <p className='text-[#FFFFFFCC] text-start'>{items?.value}</p>
//                                             </div>
//                                         )}
//                                     </div>
//                                     <p className='text-[#FFFFFFCC] mt-5 text-sm'>Other details</p>
//                                     <div className='mt-5'>
//                                         {item?.other?.map((items, index) =>
//                                             <div key={index} className='flex justify-between items-center py-2'>
//                                                 <p className='text-[#FFFFFF99]'>{items?.item}</p>
//                                                 <p className='text-[#FFFFFFCC]'>{items?.value}</p>
//                                             </div>
//                                         )}
//                                     </div>
//                                     <div className='flex justify-between my-3'>
//                                         <Button className='rounded-full border-[0.3px] border-white py-3.5 px-7'>Download receipts</Button>
//                                         <Button className='rounded-full border-[0.3px] border-white py-3.5 px-7'>Share receipts</Button>
//                                     </div>
//                                 </div>
//                             )
//                         }
//                     </div>
//                 </article>
//             </Modal>
//         </div>
//     )
// }

// export default TransactionsReceipts
