import * as React from "react";
import { SVGProps } from "react";
const CircleArrow = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M11.769 21.5837C16.9507 21.5837 21.1513 17.2931 21.1513 12.0003C21.1513 6.7076 16.9507 2.41699 11.769 2.41699C6.58731 2.41699 2.38672 6.7076 2.38672 12.0003C2.38672 17.2931 6.58731 21.5837 11.769 21.5837Z"
      stroke="#292D32"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.48438 12H14.1137"
      stroke="#292D32"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.2383 14.875L15.053 12L12.2383 9.125"
      stroke="#292D32"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default CircleArrow;
