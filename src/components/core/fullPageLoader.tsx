'use client';

import * as React from 'react';

import { Spinner } from '@/icons/core';

import { Dialog, DialogBody, DialogContent, DialogTitle } from './Dialog';

interface FullPageLoaderProps {
  className?: string;
}

export const FullPageLoader: React.FunctionComponent<
  FullPageLoaderProps
> = () => {
  const [open, _setOpen] = React.useState(true);
  return (
    <Dialog modal={true} open={open}>
      <DialogContent className="w-max">
        <DialogBody className="p-0 text-center">
          <div className="px-8 pb-6 pt-10">
            <DialogTitle className="sr-only font-heading text-xl text-red-900">
              {'Loading...'}
            </DialogTitle>
            <Spinner />
          </div>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};
