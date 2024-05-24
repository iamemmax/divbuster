'use client';

import Image from 'next/image';

import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/core';

interface SuccessModalProps {
  isSuccessModalOpen: boolean;
  setSuccessModalState: React.Dispatch<React.SetStateAction<boolean>>;
  heading: string;
  subheading: string;
  closeButtonReplacement?: React.ReactNode;
  children?: React.ReactNode;
}

export function SuccessModal({
  isSuccessModalOpen,
  setSuccessModalState,
  heading,
  subheading,
  closeButtonReplacement,
  children,
}: SuccessModalProps) {
  return (
    <Dialog open={isSuccessModalOpen} onOpenChange={setSuccessModalState}>
      <DialogContent>
        <DialogHeader>
          {closeButtonReplacement || (
            <DialogClose className="ml-auto">Close</DialogClose>
          )}
        </DialogHeader>

        <DialogBody className="p-0 text-center">
          <div className="px-8 pb-6 pt-10">
            <Image
              alt={heading}
              className="mx-auto mb-4"
              height={132}
              src="/images/success-illustrations/create-company-success.png"
              width={175}
            />

            <DialogTitle className="font-heading text-xl">
              {heading}
            </DialogTitle>
            <DialogDescription className="">{subheading}</DialogDescription>
          </div>

          {children}
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
}
