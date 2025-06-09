import * as React from "react";
import { SVGProps } from "react";

interface PlusIconProps extends SVGProps<SVGSVGElement> {
  color?: string;
}

const PlusIcon = ({ color = "white", ...props }: PlusIconProps) => (
  <svg
    width={14}
    height={14}
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M6.99935 1.16669V12.8334M1.16602 7.00002H12.8327"
      stroke={color}
      strokeWidth={1.67}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default PlusIcon;
