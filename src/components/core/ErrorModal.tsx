/* eslint-disable react/jsx-sort-props */
"use client";

import CloseIcon from "@/app/(main)/misc/icons/CLoseIcon";
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
            width="70"
            height="70"
            viewBox="0 0 50 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="25" cy="25" r="25" fill="#FFEBEB" />
            <path
              opacity="0.4"
              d="M25 38.3327C32.3638 38.3327 38.3333 32.3631 38.3333 24.9993C38.3333 17.6356 32.3638 11.666 25 11.666C17.6362 11.666 11.6667 17.6356 11.6667 24.9993C11.6667 32.3631 17.6362 38.3327 25 38.3327Z"
              fill="#EF4444"
            />
            <path
              d="M25 27.3327C25.5467 27.3327 26 26.8793 26 26.3327V19.666C26 19.1193 25.5467 18.666 25 18.666C24.4533 18.666 24 19.1193 24 19.666V26.3327C24 26.8793 24.4533 27.3327 25 27.3327Z"
              fill="#EF4444"
            />
            <path
              d="M26.2267 29.8259C26.16 29.6659 26.0667 29.5192 25.9467 29.3859C25.8133 29.2659 25.6667 29.1725 25.5067 29.1059C25.1867 28.9725 24.8133 28.9725 24.4933 29.1059C24.3333 29.1725 24.1867 29.2659 24.0533 29.3859C23.9333 29.5192 23.84 29.6659 23.7733 29.8259C23.7067 29.9859 23.6667 30.1592 23.6667 30.3325C23.6667 30.5059 23.7067 30.6792 23.7733 30.8392C23.84 31.0125 23.9333 31.1459 24.0533 31.2792C24.1867 31.3992 24.3333 31.4925 24.4933 31.5592C24.6533 31.6259 24.8267 31.6659 25 31.6659C25.1733 31.6659 25.3467 31.6259 25.5067 31.5592C25.6667 31.4925 25.8133 31.3992 25.9467 31.2792C26.0667 31.1459 26.16 31.0125 26.2267 30.8392C26.2933 30.6792 26.3333 30.5059 26.3333 30.3325C26.3333 30.1592 26.2933 29.9859 26.2267 29.8259Z"
              fill="#EF4444"
            />
          </svg>
          <DialogClose className="ml-auto bg-[#F2F5FF] rounded  text-red-900  flex justify-center items-center">
            <CloseIcon />
          </DialogClose>
        </DialogHeader>

        <DialogBody className="p-0 text-left">
          <div className="px-8 pb-6 ">
            <DialogTitle className="font-heading  text-[#EF4444] w-4/5 font-nunito text-lg font-medium">
              {heading}
            </DialogTitle>
            <DialogDescription className="text-[#667085] text-sm font-nunito py-2">
              {subheading}
            </DialogDescription>
          </div>

          {children}
          <div className="px-8 pb-12">
            <Button
              className="grow bg-[#EF4444] px-1.5 sm:text-sm w-full md:px-[3.1875rem]"
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
