import clsx from 'clsx';
import * as React from 'react';

interface ModalCloseButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

export const ModalCloseButton: React.FunctionComponent<
  ModalCloseButtonProps
> = ({ onClick, className }) => {
  return (
    <button
      className={clsx(
        'focus:ring/30 mb-7 ml-auto block rounded-[5px] transition duration-500 ease-in-out hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-white active:scale-[0.95]',
        className
      )}
      onClick={onClick}
    >
      <>
        <svg
          className="md:hidden"
          fill="none"
          height={34}
          role="img"
          viewBox="0 0 34 34"
          width={34}
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect fill="#FFE1E1" height={34} rx={5} width={34} />
          <path
            d="m17 17 5.244 5.244m-10.486 0L17 17l-5.243 5.243Zm10.486-10.486L17 17l5.244-5.243ZM17 17l-5.242-5.243L17 17Z"
            stroke="red"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
          />
        </svg>

        <svg
          className="hidden md:block"
          fill="none"
          height="33"
          viewBox="0 0 51 33"
          width="51"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect fill="#FFE1E1" height="33" rx="5" width="51" />
          <path
            d="M27.1393 16.2349L31.3107 20.7067M22.9678 20.7067L27.1393 16.2349L22.9678 20.7067ZM31.3107 11.763L27.1385 16.2349L31.3107 11.763ZM27.1385 16.2349L22.9678 11.763L27.1385 16.2349Z"
            stroke="#FF0000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </svg>
      </>
    </button>
  );
};
