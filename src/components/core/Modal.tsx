import React from 'react';

import { Dialog, DialogBody, DialogContent } from '@/components/core';
import { cn } from '@/utils/classNames';

interface ModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
  children: React.ReactNode;
  label: string;
  width: string;
  className?: string;
  allowDismiss?: boolean;
  showZigZag?: boolean;
  minHeight?: string;
}
export const Modal: React.FunctionComponent<ModalProps> = ({
  isModalOpen,
  children,
  label,
  width = '500px',
  className = '',
  closeModal,
  showZigZag = false,
  allowDismiss = false,
  minHeight = '400px',
}) => {
  return (
    <Dialog modal={true} open={isModalOpen} >
      <DialogContent
        aria-label={label}
        className={cn(
          showZigZag
            ? 'zig-zag-top zig-zag-bottom !my-0 !rounded-none'
            : 'rounded-[10px]',
          'my-6 bg-white'
        )}
        style={{
          width: '92.5%',
          minWidth: '300px',
          maxWidth: width,
          minHeight: minHeight,
        }}
        onPointerDownOutside={allowDismiss ? closeModal : () => null}
      >
        <DialogBody className={cn('!py-0')}>
          <div
            className={cn(
              !showZigZag && 'rounded-[10px] border-black/50',
              'overflow-auto',
              className
            )}
          >
            {children}
          </div>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};
