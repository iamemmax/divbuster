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
import CopyIcon2 from "../../icons/CopyIcon2";
import { useClipboard } from "@/hooks";
import { useUser } from "@/app/(auth)/(onboarding)/misc";

interface UseBooleanStateControlProps {
  isAddFundModalOpen: boolean;
  setAddFundModal: React.Dispatch<React.SetStateAction<boolean>>;

  heading: string;
  subsection: string;
  children?: React.ReactNode;
}
function AddFundModal({
  isAddFundModalOpen,
  setAddFundModal,

  heading,
  subsection,
}: UseBooleanStateControlProps) {
  interface data {
    item: string;
    value: string;
  }

  const FundDetails: data[] = [
    {
      item: "Account name",
      value: "Olamide Adewale",
    },
    {
      item: "Account no",
      value: "0182492011",
    },
    {
      item: "Bank name",
      value: "Wema Bank",
    },
  ];
  const { copy } = useClipboard();
  const { data: userData, isLoading } = useUser();

  return (
    <div className="rounded-xl">
      <ClientOnly>
        <Dialog open={isAddFundModalOpen}>
          <DialogContent className="!overflow-hidden">
            <DialogHeader className="bg-[#1B1687] ">
              <DialogTitle className="text-[#fff]">{heading}</DialogTitle>

              <DialogClose className="rounded-10 bg-transparent border-[0.3px] border-[#407BFF]">
                <button onClick={() => setAddFundModal(false)}>close</button>
              </DialogClose>
            </DialogHeader>

            <DialogBody className="bg-[#141B3f]">
              <article className=" text-sm text-white">
                <p className="text-white text-sm">{subsection}</p>
                <div className="bg-[#FFFFFF1A] rounded-2xl border-dashed border border-[#9F9F9F] pt-4 pb-5 px-6 mt-5">
                  <p className="pb-4">Fund wallet with transfer</p>
                  <div className="border-b-[0.3px] border-[#FFFFFF1A]"></div>
                  <article className="flex justify-between">
                    <div className="grid grid-cols-2 py-5 gap-5 ">
                      <div className="gap-x-4">
                        <p className="text-[#FFFFFF99] text-xs">Account name</p>
                        <p className="font-sans font-medium flex items-center gap-x-3">
                          {userData?.first_name} {userData?.last_name}
                        </p>
                      </div>
                      <div className="gap-x-4">
                        <p className="text-[#FFFFFF99] text-xs">Account no</p>
                        <div className="flex items-center gap-x-2">
                          <p className="font-sans font-medium ">
                            {" "}
                            {userData?.account_number}
                          </p>

                          <Button
                            className="mt-5 bg-transparent"
                            onClick={() => copy(userData?.account_number ?? "")}
                          >
                            <CopyIcon2 />
                          </Button>
                        </div>
                      </div>
                      <div className="gap-x-4">
                        <p className="text-[#FFFFFF99] text-xs">Bank name</p>
                        <p className="font-sans font-medium">Wema</p>
                      </div>
                    </div>
                  </article>
                </div>
              </article>
            </DialogBody>
          </DialogContent>
        </Dialog>
      </ClientOnly>
    </div>
  );
}

export default AddFundModal;
