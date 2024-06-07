'use client';

import { usePathname } from 'next/navigation';

export function ModalConditionalRenderer({
  children,
  pathsWithoutModal,
}: {
  children: React.ReactNode;
  pathsWithoutModal: string[];
}) {
  const pathname = usePathname();

  const isModalRendered =
    !pathsWithoutModal.includes(pathname) &&
    !pathsWithoutModal.some(pathWithoutModal => {
      return pathname.includes(pathWithoutModal);
    });

  return <>{isModalRendered && children}</>;
}
