import * as React from 'react';

import { cn } from '@/utils/classNames';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input2 = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        className={cn(
          'flex h-10 w-full rounded-md bg-[#2c3352] px-5 py-2 text-xs transition duration-300 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-input-placeholder focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        type={type}
        {...props}
      />
    );
  }
);
Input2.displayName = 'Input2';
