'use client';

import { usePathname } from 'next/navigation';
import React from 'react';

export function ModalRouteConditionalRenderer({
  children,
  pathsWithModal,
}: {
  children: React.ReactNode;
  pathsWithModal: string[];
}) {
  const pathname = usePathname();

  const isModalRendered = React.useMemo(
    () =>
      pathsWithModal.includes(pathname) &&
      pathsWithModal.some(pathWithoutModal => {
        return pathname.includes(pathWithoutModal);
      }),
    [pathname, pathsWithModal]
  );

  return <>{isModalRendered && children}</>;
}
