'use client';

import * as React from 'react';

interface ClientOnlyProps {
  children: React.ReactNode;
  className?: string;
}

export function ClientOnly({ children, ...props }: ClientOnlyProps) {
  const [hasMounted, setHasMounted] = React.useState(false);

  React.useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <div {...props}>{children}</div>;
}
