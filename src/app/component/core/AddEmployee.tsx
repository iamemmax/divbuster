import React from 'react';
import { Button } from './Button';



interface AddPayDetailsProps {
  onClickAddPay: () => void;
}

const AddEmployee = () => {
  return (
    <Button className="flex w-full flex-row items-center justify-center rounded-lg bg-main-solid px-3 py-2 md:w-44">
      <div className="mr-2 flex h-6 w-6 items-center justify-center rounded-full border border-dashed border-white">
        <svg
          fill="none"
          height={9}
          viewBox="0 0 9 9"
          width={9}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.20693 1.5299e-8L4.20693 9"
            stroke="#fff"
            strokeWidth={0.7}
          />
          <path d="M9 4.20718L0 4.20718" stroke="#fff" strokeWidth={0.7} />
        </svg>
      </div>
      <p className="text-sm text-white">Add Employees</p>
    </Button>
  );
};

const AddPayDetails = ({ onClickAddPay }: AddPayDetailsProps) => {
  return (
    <button
      className="flex w-full flex-row items-center justify-center rounded-lg border-[0.5px] border-[#032282] px-3 py-2 md:w-44"
      onClick={onClickAddPay}
    >
      <div className="mr-2 flex h-6 w-6 items-center justify-center rounded-full border border-dashed border-main-solid">
        <svg
          fill="none"
          height={9}
          viewBox="0 0 9 9"
          width={9}
          xmlns="http://www.w3.org/2000/svg"
        >
          <line
            stroke="#032282"
            strokeWidth={0.7}
            x1={4.20693}
            x2={4.20693}
            y1={1.5299e-8}
            y2={9}
          />
          <line
            stroke="#032282"
            strokeWidth={0.7}
            x1={9}
            y1={4.20693}
            y2={4.20693}
          />
        </svg>
      </div>
      <p className="text-sm text-main-solid">Add pay details</p>
    </button>
  );
};

export { AddEmployee, AddPayDetails };
