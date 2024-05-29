'use client';

import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './Dialog';

interface SuccessModalProps {
  isSuccessModalOpen: boolean;
  setSuccessModalState: React.Dispatch<React.SetStateAction<boolean>>;
  heading?: string;
  subheading: string;
  children?: React.ReactNode;
}

export function SuccessModalWithLink({
  isSuccessModalOpen,
  setSuccessModalState,
  heading = 'Success.',
  subheading,
  children,
}: SuccessModalProps) {
  return (
    <Dialog open={isSuccessModalOpen} onOpenChange={setSuccessModalState}>
      <DialogContent>
        <DialogHeader className="bg-green-100">
          <DialogClose className="ml-auto">Close</DialogClose>
        </DialogHeader>

        <DialogBody className="p-0 text-center">
          <div className="px-8 pb-6 pt-10">
            <DialogTitle className="font-heading text-xl text-green-900">
              {heading}
            </DialogTitle>
            <DialogDescription className="text-green-400">
              {subheading}
            </DialogDescription>
          </div>

          {children}
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
}
