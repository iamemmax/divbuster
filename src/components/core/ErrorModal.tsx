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
import ErrorIcon from "@/app/icons/ErrorIcon";

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
      <DialogContent className="bg-white dark:bg-gray-900">
        <DialogHeader className="bg-white dark:bg-gray-900 flex justify-between items-start">
          <ErrorIcon/>

          <DialogClose className="ml-auto bg-[#F2F5FF] dark:bg-gray-700 rounded text-red-900 dark:text-red-400 flex justify-center items-center">
            <CloseIcon color="black" className="text-black dark:text-white" />
          </DialogClose>
        </DialogHeader>

        <DialogBody className="p-0 text-left bg-white dark:bg-gray-900">
          <div className="px-8 pb-6">
            <DialogTitle className="font-heading text-[#F7931D] dark:text-orange-400 w-4/5 font-nunito text-lg font-medium">
              {heading}
            </DialogTitle>
            <DialogDescription className="text-[#667085] dark:text-gray-300 text-sm font-nunito py-2">
              {subheading}
            </DialogDescription>
          </div>

          {children}
          <div className="px-8 pb-12">
            <Button
              className="grow bg-[#F7931D] dark:bg-orange-500 hover:bg-orange-600 dark:hover:bg-orange-600 px-1.5 sm:text-sm w-full md:px-[3.1875rem] text-white"
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