import * as React from "react";
import { SVGProps } from "react";

interface CustomSVGProps extends SVGProps<SVGSVGElement> {
  color?: string;
}

const Moonicon = ({ color = "#4F4F4F", ...props }: CustomSVGProps) => (
  <svg
    width={18}
    height={18}
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M15.5658 15.3272C16.8024 14.0906 17.6092 12.587 17.9863 11.0019C18.0944 10.5478 17.5363 10.2413 17.2072 10.5721C17.2031 10.5762 17.1991 10.5803 17.195 10.5843C14.4436 13.3358 9.94955 13.2827 7.26525 10.4252C4.73457 7.7311 4.76779 3.5486 7.33766 0.891907C7.37007 0.858413 7.40272 0.825313 7.43564 0.792608C7.76573 0.464666 7.45721 -0.0907949 7.00452 0.0167842C5.43353 0.390127 3.94243 1.18535 2.7118 2.40286C-0.886352 5.96273 -0.906618 11.7344 2.66754 15.3183C6.22607 18.8865 12.0035 18.8895 15.5658 15.3272Z"
      fill={color}
    />
  </svg>
);

export default Moonicon;
