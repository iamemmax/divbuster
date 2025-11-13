import * as React from "react";
import { SVGProps } from "react";

const BottleIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={25}
    height={24}
    viewBox="0 0 25 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="stroke-[#132346] dark:stroke-white transition-colors duration-300"
    {...props}
  >
    <path
      d="M16.25 22.5H10.25C10.0511 22.5 9.86032 22.421 9.71967 22.2803C9.57902 22.1397 9.5 21.9489 9.5 21.75V9.75C9.5 8.75544 9.89509 7.80161 10.5983 7.09835C11.3016 6.39509 12.2554 6 13.25 6C14.2446 6 15.1984 6.39509 15.9017 7.09835C16.6049 7.80161 17 8.75544 17 9.75V21.75C17 21.9489 16.921 22.1397 16.7803 22.2803C16.6397 22.421 16.4489 22.5 16.25 22.5Z"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.92773 15.75H16.7849"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13.25 6V3"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.5 3.42871H15.9286"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default BottleIcon;
