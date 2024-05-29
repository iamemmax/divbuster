'use client';

import {
  Dialog,
  DialogBody,
  DialogContent,
} from '@/components/core';

interface LogOutModalProps {
  isLogOutModalOpen: boolean;
  setLogOutModalState: React.Dispatch<React.SetStateAction<boolean>>;
  heading: string;
  subheading: string;
  closeButtonReplacement?: React.ReactNode;
  children?: React.ReactNode;
}

export function LogOutModal({
  isLogOutModalOpen,
  setLogOutModalState,
  children,
}: LogOutModalProps) {
  return (
    <Dialog open={isLogOutModalOpen} onOpenChange={setLogOutModalState}>
      <DialogContent>
        {/* <DialogHeader>
          {closeButtonReplacement || (
            <DialogClose className="ml-auto">Close</DialogClose>
          )}
        </DialogHeader> */}

        <DialogBody className="p-0 text-center">
          {/* <div className="px-8 pb-6 pt-10">
            <Image
              alt={heading}
              className="mx-auto mb-4"
              height={132}
              src="/images/LogOut-illustrations/create-company-LogOut.png"
              width={175}
            />

            <DialogTitle className="font-heading text-xl">
              {heading}
            </DialogTitle>
            <DialogDescription className="">{subheading}</DialogDescription>
          </div> */}

          <div className="flex flex-col px-8 pb-6 pt-10 items-center justify-center rounded-xl bg-white p-4">
            <div className="caution">
              <svg
                fill="none"
                height="119"
                viewBox="0 0 119 119"
                width="119"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="58.8978"
                  cy="60.1009"
                  fill="#EF5448"
                  fillOpacity="0.2"
                  r="51.6869"
                />
                <circle
                  cx="59.5"
                  cy="59.5"
                  fill="#EF5448"
                  fillOpacity="0.1"
                  r="59.5"
                />
                <path
                  clipRule="evenodd"
                  d="M99 60C99 70.6087 94.7858 80.7828 87.2843 88.2843C79.7828 95.7858 69.6087 100 59 100C48.3914 100 38.2172 95.7858 30.7157 88.2843C23.2143 80.7828 19 70.6087 19 60C19 49.3914 23.2143 39.2172 30.7157 31.7157C38.2172 24.2143 48.3914 20 59 20C69.6087 20 79.7828 24.2143 87.2843 31.7157C94.7858 39.2172 99 49.3914 99 60ZM59 45C58.1215 44.9992 57.2583 45.2298 56.4973 45.6687C55.7362 46.1075 55.1043 46.7392 54.665 47.5C54.3478 48.0894 53.9156 48.6091 53.3938 49.0283C52.8721 49.4475 52.2715 49.7577 51.6276 49.9405C50.9837 50.1233 50.3097 50.175 49.6455 50.0924C48.9813 50.0099 48.3405 49.7949 47.7609 49.4601C47.1814 49.1253 46.675 48.6775 46.2717 48.1434C45.8684 47.6092 45.5764 46.9995 45.4132 46.3504C45.2499 45.7013 45.2186 45.0261 45.3211 44.3647C45.4236 43.7033 45.6579 43.0692 46.01 42.5C47.6611 39.6406 50.2096 37.4058 53.2601 36.1423C56.3107 34.8788 59.693 34.6572 62.8824 35.5118C66.0717 36.3664 68.89 38.2495 70.9001 40.869C72.9103 43.4885 73.9999 46.6981 74 50C74.0009 53.1031 73.0397 56.1301 71.2488 58.6643C69.4579 61.1984 66.9254 63.115 64 64.15V65C64 66.3261 63.4732 67.5979 62.5355 68.5356C61.5979 69.4732 60.3261 70 59 70C57.6739 70 56.4022 69.4732 55.4645 68.5356C54.5268 67.5979 54 66.3261 54 65V60C54 58.6739 54.5268 57.4022 55.4645 56.4645C56.4022 55.5268 57.6739 55 59 55C60.3261 55 61.5979 54.4732 62.5355 53.5355C63.4732 52.5979 64 51.3261 64 50C64 48.6739 63.4732 47.4022 62.5355 46.4645C61.5979 45.5268 60.3261 45 59 45ZM59 85C60.3261 85 61.5979 84.4732 62.5355 83.5356C63.4732 82.5979 64 81.3261 64 80C64 78.6739 63.4732 77.4022 62.5355 76.4645C61.5979 75.5268 60.3261 75 59 75C57.6739 75 56.4022 75.5268 55.4645 76.4645C54.5268 77.4022 54 78.6739 54 80C54 81.3261 54.5268 82.5979 55.4645 83.5356C56.4022 84.4732 57.6739 85 59 85Z"
                  fill="#FF3B3B"
                  fillRule="evenodd"
                />
              </svg>
            </div>

            <div className="mt-5 flex w-full flex-col items-center justify-center">
              {/* <h1
                className="text text-lg 
            font-medium"
              >
                Confirm
              </h1> */}
              <p className="mt-[10px] max-w-[213px] text-center text-xs text-[#646464]">
                Oops looks like your session as expired! please click button below to Login again
              </p>

            </div>
            {children}
          </div>

        </DialogBody>
      </DialogContent>
    </Dialog>
  );
}
