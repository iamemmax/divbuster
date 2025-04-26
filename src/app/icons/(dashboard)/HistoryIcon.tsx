import * as React from "react";
import { SVGProps } from "react";

const HistoryIcon = ({ stroke = "white", ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M16.6654 16.6668H3.33203V3.3335"
      stroke={stroke}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3.33203 13.75L9.9987 7.5L12.4987 10L16.2487 6.25"
      stroke={stroke}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default HistoryIcon;
