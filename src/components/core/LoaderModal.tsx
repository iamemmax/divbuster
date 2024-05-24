'use client';

import * as Dialog from '@radix-ui/react-dialog';
import * as React from 'react';

import { Spinner } from '@/icons/core';

import { ClientOnly } from './ClientOnly';

interface LoaderModalProps {
  isOpen?: boolean;
}

export function LoaderModal({ isOpen = true }: LoaderModalProps) {
  return (
    <ClientOnly>
      <Dialog.Root open={isOpen}>
        <Dialog.Portal /*className="z-[100]"*/>
          <Dialog.Overlay className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md transition-all duration-100 data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in" />
          <Dialog.Content className="max-w-[450px fixed left-[50%] top-[50%] z-[100] max-h-[85vh] w-max translate-x-[-50%] translate-y-[-50%] rounded-full bg-white p-4 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] animate-in focus:outline-none data-[state=open]:fade-in-90 data-[state=open]:slide-in-from-bottom-10">
            <Dialog.Title className="sr-only m-0 text-[17px] font-medium">
              Loading
            </Dialog.Title>
            <Dialog.Description className="sr-only mb-5 mt-[10px] text-[15px] leading-normal">
              Please wait.
            </Dialog.Description>

            <Spinner />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </ClientOnly>
  );
}
