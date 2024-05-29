import { VariantProps } from 'class-variance-authority';
import Link, { LinkProps } from 'next/link';
import * as React from 'react';

import { cn } from '@/utils/classNames';

import { buttonVariants } from './Button';

type NextLinkProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  keyof LinkProps
> &
  LinkProps & {
    children?: React.ReactNode;
  } & React.RefAttributes<HTMLAnchorElement>;

export interface LinkButtonProps
  extends NextLinkProps,
    VariantProps<typeof buttonVariants> {}

const LinkButton = React.forwardRef<HTMLAnchorElement, LinkButtonProps>(
  ({ className, variant, size, href, ...props }, ref) => {
    return (
      <Link
        href={href}
        {...props}
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
      />
    );
  }
);
LinkButton.displayName = 'LinkButton';

export { LinkButton };
