'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import { VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/utils/classNames';

import { buttonVariants } from './Button';

const DialogAlign = DialogPrimitive.Root;

const DialogTriggerAlign = ({
  className,
  variant,
  size,
  children,
  ...props
}: DialogPrimitive.DialogTriggerProps &
  VariantProps<typeof buttonVariants>) => {
  return (
    <DialogPrimitive.Trigger
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </DialogPrimitive.Trigger>
  );
};
DialogTriggerAlign.displayName = DialogPrimitive.Trigger.displayName;

const DialogCloseAlign = ({
  className,
  children,
  ...props
}: DialogPrimitive.DialogCloseProps & VariantProps<typeof buttonVariants>) => {
  return (
    <DialogPrimitive.Close
      className={cn(
        'bg-[#2D4696] px-6 py-2',
        buttonVariants({ variant: 'unstyled', size: 'unstyled', className })
      )}
      {...props}
    >
      {children}
    </DialogPrimitive.Close>
  );
};
DialogCloseAlign.displayName = DialogPrimitive.Close.displayName;

const DialogPortal = ({
  // className,
  children,
  ...props
}: DialogPrimitive.DialogPortalProps) => {
  return (
    <DialogPrimitive.Portal /*className={className}*/ {...props}>
      <div className="fixed inset-0 z-50 flex items-start justify-center sm:items-center">
        {children}
      </div>
    </DialogPrimitive.Portal>
  );
};
DialogPortal.displayName = DialogPrimitive.Portal.displayName;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => {
  return (
    <DialogPrimitive.Overlay
      className={cn(
        'fixed inset-0 z-50 bg-black/80 backdrop-blur-md transition-all duration-100 data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in',
        className
      )}
      {...props}
      ref={ref}
    />
  );
});
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

interface CustomDialogContentProps {
  overlayClassName?: string;
}

const DialogContentAlign = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> &
    CustomDialogContentProps
>(({ className, children, overlayClassName, ...props }, ref) => {
  return (
    <DialogPortal>
      <DialogOverlay
        className={cn(
          'fixed inset-0 grid place-items-end sm:overflow-y-auto',
          overlayClassName
        )}
      >
        <DialogPrimitive.Content
          className={cn(
            'fixed bottom-0 z-50 h-max max-h-modal-content w-full gap-4  rounded-t-[1.125rem] bg-white animate-in data-[state=open]:fade-in-90 data-[state=open]:slide-in-from-bottom-10 sm:static sm:max-h-none sm:max-w-[26.75rem] sm:overflow-visible sm:rounded-[1.125rem] sm:zoom-in-90 data-[state=open]:sm:slide-in-from-bottom-0 md:max-h-full',
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </DialogPrimitive.Content>
      </DialogOverlay>
    </DialogPortal>
  );
});
DialogContentAlign.displayName = DialogPrimitive.Content.displayName;

const DialogHeaderAlign = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        'flex items-center justify-between gap-4 rounded-t-[1.125rem] bg-main-solid px-8 py-4 text-white',
        className
      )}
      {...props}
    />
  );
};
DialogHeaderAlign.displayName = 'DialogHeader';

const DialogBodyAlign = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        'max-h-modal-body overflow-y-auto px-8 py-6 sm:overflow-y-visible md:max-h-none',
        className
      )}
      {...props}
    />
  );
};
DialogBodyAlign.displayName = 'DialogBody';

const DialogFooterAlign = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
        className
      )}
      {...props}
    />
  );
};
DialogFooterAlign.displayName = 'DialogFooter';

const DialogTitleAlign = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => {
  return (
    <DialogPrimitive.Title
      className={cn('text-base font-semibold', className)}
      ref={ref}
      {...props}
    />
  );
});
DialogTitleAlign.displayName = DialogPrimitive.Title.displayName;

const DialogDescriptionAlign = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => {
  return (
    <DialogPrimitive.Description
      className={cn('text-sm', className)}
      ref={ref}
      {...props}
    />
  );
});
DialogDescriptionAlign.displayName = DialogPrimitive.Description.displayName;

export {
  DialogAlign,
  DialogTriggerAlign,
  DialogCloseAlign,
  DialogContentAlign,
  DialogHeaderAlign,
  DialogBodyAlign,
  DialogFooterAlign,
  DialogTitleAlign,
  DialogDescriptionAlign,
};
