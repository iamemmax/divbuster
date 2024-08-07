import React, { useState } from "react";
import {
  Dialog,
  DialogBody,
  DialogContent,
} from "@/components/core/DialogClone";
import { useCreatePlanRequest } from "../../api/remital/createPlan";
import { SmallSpinner } from "@/icons/core";
import { useMakeRemitalPayment } from "../../api/remital/remitalpayment";
import Link from "next/link";
import { Button, LinkButton } from "@/components/core";

interface prop {
  setShowConfirmation: React.Dispatch<React.SetStateAction<boolean>>;
  setShowPaymentModal: React.Dispatch<React.SetStateAction<boolean>>;
  showConfirmation: boolean;
  ConfirmationMessage: string;
  checkUserHasPassword: boolean | undefined;
}

const PlanComfirmationModal = ({
  ConfirmationMessage,
  showConfirmation,
  checkUserHasPassword,
}: prop) => {
  return (
    <Dialog
      open={showConfirmation}
      // onOpenChange={setSixMonthIndividualPlanModal}
    >
      <DialogContent className="!overflow-hidden min-h-[30rem]  max-sm:w-[97%] ">
        <DialogBody className="bg-[#141B3f] px-6 w-full rounded-[1.125rem] border-[0.01px] border-[#407BFF]  border-opacity-50">
          <div className="py-1 px-6">
            <div className="flex items-center justify-center w-full">
              <svg
                width={101}
                height={101}
                viewBox="0 0 101 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width={100.32} height={100.32} rx={50.16} fill="#fff" />
                <path
                  d="M47 34a3 3 0 0 1 6 0v22a3 3 0 0 1-6 0zm0 32a3 3 0 1 1 6 0 3 3 0 0 1-6 0Z"
                  stroke="#1B1687"
                  strokeWidth={2}
                />
              </svg>
            </div>

            <div className="py-5">
              <p className="text-white text-sm">{ConfirmationMessage}</p>
            </div>
            <div className="py-3 mt-2">
              <LinkButton
                href={checkUserHasPassword ? "/login" : "/"}
                className="w-full bg-white py-4 rounded-10 text-sm font-bold text-[#000] flex justify-center items-center"
              >
                Continue
              </LinkButton>
            </div>
          </div>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default PlanComfirmationModal;
