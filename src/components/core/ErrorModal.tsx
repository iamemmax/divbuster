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
  heading = 'An error occurred.',
  subheading,
  children,
}: ErrorModalProps) {
  return (
    <Dialog open={isErrorModalOpen} onOpenChange={setErrorModalState}>
      <DialogContent>
        <DialogHeader className="bg-red-100">
          <DialogClose className="ml-auto bg-white text-red-900">
            Close
          </DialogClose>
        </DialogHeader>

        <DialogBody className="p-0 text-center">
          <div className="px-8 pb-6 pt-10">
            <DialogTitle className="font-heading text-xl text-red-900">
              {heading}
            </DialogTitle>
            <DialogDescription className="text-red-400">
              {subheading}
            </DialogDescription>
          </div>

          {children}
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
}
