"use client";

import Home from "@/app/(main)/page";
import {
  Button,
  ClientOnly,
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/core";
import { Input2 } from "@/components/core/Input2";
import { useBooleanStateControl } from "@/hooks";
import { RightUpArrow } from "@/icons/core";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface UseBooleanStateControlProps {
  isDetailsRequestModalOpen: boolean;
  setDetailsRequestModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSecondModal: React.Dispatch<React.SetStateAction<boolean>>;
  heading: string;
  subheading: string;
  inputTitle: string;
  closeButtonReplacement?: React.ReactNode;
  children?: React.ReactNode;
}

function DetailsRequestModal({
  isDetailsRequestModalOpen,
  setDetailsRequestModal,
  setSecondModal,
  heading,
  subheading,
  closeButtonReplacement,
  inputTitle,
  children,
}: UseBooleanStateControlProps) {
  const Router = useRouter();

  const handleClose = () => {
    setDetailsRequestModal(false);
    Router.back();
  };

  return (
    <div className="">
      <ClientOnly>
        <Dialog
          open={isDetailsRequestModalOpen}
          onOpenChange={setDetailsRequestModal}
        >
          <DialogTrigger className="bg-white text-black flex items-center justify-between text-[0.865rem] text-left py-1.5 pr-1.5 pl-4 mt-7 rounded-full max-w-max font-display">
            Get insurance
            <span className="flex items-center justify-center p-2 rounded-full bg-main-light ml-7">
              <RightUpArrow className="" width={12} height={12} />
            </span>
          </DialogTrigger>

          <DialogContent className="!overflow-hidden ">
            <DialogHeader className="bg-[#1B1687] ">
              <DialogTitle className="text-[#fff]">{heading}</DialogTitle>

              

              <DialogClose className="rounded-full">
                <button onClick={handleClose}>close</button>
              </DialogClose>
            </DialogHeader>

            <DialogBody className="bg-[#151D42] w-full ">
              <div className="py-1">
                <div className="text-[#fff] font-light">
                  <DialogDescription>{subheading}</DialogDescription>
                </div>

                <div className="my-5">
                  <form action="">
                    <div className="flex flex-col gap-1 ">
                      <p className="text-[#FFFFFF]">{inputTitle}</p>
                      <Input2
                        className="text-[#fff]"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    <div className="mt-6 md:mt-12">
                    
                      <button
                        className=" font-display focus:shadow-outline w-full rounded-2xl bg-[#fff] p-4 py-3 font-semibold tracking-wide
        shadow-lg transition-colors delay-150 ease-in-out hover:bg-slate-300 focus:outline-none text-[#1B1687]"
        onClick={()=>{
            setSecondModal(true)
            setDetailsRequestModal(false)

        }}
                      >
                        Continue
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </DialogBody>
          </DialogContent>
        </Dialog>
      </ClientOnly>
    </div>
  );
}

export default DetailsRequestModal;
