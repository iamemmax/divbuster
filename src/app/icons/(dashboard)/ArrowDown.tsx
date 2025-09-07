import * as React from "react";
import { SVGProps } from "react";
const ArrowDown = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={10}
    height={10}
    viewBox="0 0 10 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M5 1.5V8.5M5 8.5L8.5 5M5 8.5L1.5 5"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default ArrowDown;
