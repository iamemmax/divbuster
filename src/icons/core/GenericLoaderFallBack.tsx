import { cn } from '@/utils/classNames';

import { Spinner } from './Spinner';

interface GenericLoaderFallbackProps {
  className?: string;
}

export default function GenericLoaderFallback({
  className,
}: GenericLoaderFallbackProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-md bg-white p-6',
        className
      )}
    >
      <p className="sr-only">Loading</p>
      <Spinner />
    </div>
  );
}
