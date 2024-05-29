'use client';

import { clsx } from 'clsx';
import { useState } from 'react';
import { Drawer } from 'vaul';

export const BottomSheetVault = ({
  children,
  open,
  snapPoints = ['350px', '450px', 1],
  onClose,
}: {
  children: React.ReactNode;
  open: boolean;
  snapPoints?: Array<string | number>;
  onClose: () => void;
}) => {
  const [snap, setSnap] = useState<number | string | null>('148px');

  return (
    <Drawer.Root
      activeSnapPoint={snap}
      open={open}
      setActiveSnapPoint={setSnap}
      snapPoints={snapPoints}
      onClose={onClose}
    >
      {/* <Drawer.Trigger asChild>
        <button>Open Drawer</button>
      </Drawer.Trigger> */}
      <Drawer.Overlay className="fixed inset-0 bg-black/40" />
      <Drawer.Portal>
        <Drawer.Content className="border-b-none fixed inset-x-0 bottom-0 -mx-px flex h-full max-h-[96%] flex-col rounded-t-[10px] border border-gray-200 bg-white">
          <div className="mx-auto my-4 h-1.5 w-12 shrink-0 rounded-full bg-zinc-300" />

          <div
            className={clsx(
              'mx-auto mb-5 flex h-[300px] w-full max-w-md flex-col overflow-y-auto p-4 pb-6 pt-5'
            )}
          >
            {children}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};
