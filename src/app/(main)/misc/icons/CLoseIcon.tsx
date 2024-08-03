import * as React from "react";
import { SVGProps } from "react";

interface CloseIconProps extends SVGProps<SVGSVGElement> {
  color?: string;
}

const CloseIcon = ({ color = "blue", ...props }: CloseIconProps) => (
  <svg
    fill="none"
    height={16}
    viewBox="0 0 16 16"
    width={16}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M4.26671 12.6673L3.33337 11.734L7.06671 8.00065L3.33337 4.26732L4.26671 3.33398L8.00004 7.06732L11.7334 3.33398L12.6667 4.26732L8.93337 8.00065L12.6667 11.734L11.7334 12.6673L8.00004 8.93398L4.26671 12.6673Z"
      fill={color}
    />
  </svg>
);

export default CloseIcon;
