import * as React from "react";
import { SVGProps } from "react";
const UpArrow = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={20}
    height={20}
    viewBox="0 0 10 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M5 8.5V1.5M5 1.5L1.5 5M5 1.5L8.5 5"
      stroke="#12B76A"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default UpArrow;
