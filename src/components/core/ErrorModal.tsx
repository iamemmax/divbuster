/* eslint-disable react/jsx-sort-props */
"use client";

import CloseIcon from "@/app/icons/CloseIcon";
import { Button } from "./Button";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./Dialog";

interface ErrorModalProps {
  isErrorModalOpen: boolean;
  setErrorModalState: React.Dispatch<React.SetStateAction<boolean>>;
  heading?: string;
  subheading: string;
  children?: React.ReactNode;
}

export function ErrorModal({
  isErrorModalOpen,
  setErrorModalState,
  heading = "An error occurred.",
  subheading,
  children,
}: ErrorModalProps) {
  return (
    <Dialog open={isErrorModalOpen} onOpenChange={setErrorModalState}>
      <DialogContent>
        <DialogHeader className="bg-white flex justify-between items-start">
          <svg
            width="56"
            height="56"
            viewBox="0 0 56 56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="4" y="4" width="48" height="48" rx="24" fill="#FEE4E2" />
            <rect
              x="4"
              y="4"
              width="48"
              height="48"
              rx="24"
              stroke="#FEF3F2"
              stroke-width="8"
            />
            <path
              d="M28 24V28M28 32H28.01M38 28C38 33.5228 33.5228 38 28 38C22.4772 38 18 33.5228 18 28C18 22.4772 22.4772 18 28 18C33.5228 18 38 22.4772 38 28Z"
              stroke="#D92D20"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <DialogClose className="ml-auto bg-[#F2F5FF] rounded  text-red-900  flex justify-center items-center">
            <CloseIcon  color="black" className="text-black dark:text-white" />
          </DialogClose>
        </DialogHeader>

        <DialogBody className="p-0 text-left">
          <div className="px-8 pb-6 ">
            <DialogTitle className="font-heading  text-[#F7931D] w-4/5 font-nunito text-lg font-medium">
              {heading}
            </DialogTitle>
            <DialogDescription className="text-[#667085] text-sm font-nunito py-2">
              {subheading}
            </DialogDescription>
          </div>

          {children}
          <div className="px-8 pb-12">
            <Button
              className="grow bg-[#F7931D] px-1.5 sm:text-sm w-full md:px-[3.1875rem]"
              size="lg"
              type="button"
              onClick={() => {
                setErrorModalState(false);
                // setOpenConfirmDisbursedMadal(false)
              }}
            >
              Okay
            </Button>
          </div>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
}
