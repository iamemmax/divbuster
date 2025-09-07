import * as React from "react";
import { SVGProps } from "react";
const DiamondIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={36}
    height={36}
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect x={2} y={2} width={32} height={32} rx={16} fill="#FFECD5" />
    <rect
      x={2}
      y={2}
      width={32}
      height={32}
      rx={16}
      stroke="#FFF7EE"
      strokeWidth={4}
    />
    <path
      d="M11.332 19.6667L17.9987 23L24.6654 19.6667M17.9987 13L11.332 16.3333L17.9987 19.6667L24.6654 16.3333L17.9987 13Z"
      stroke="#F7931D"
      strokeWidth={1.33333}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default DiamondIcon;
