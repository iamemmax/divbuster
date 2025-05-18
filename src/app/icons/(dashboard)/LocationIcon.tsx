import * as React from "react";
import { SVGProps } from "react";

const LocationIcon = ({ color = "#4F4F4F", ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    width={13}
    height={19}
    viewBox="0 0 13 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M6.47149 0.5C2.89368 0.5 0 3.39368 0 6.97149C0 10.8267 4.08629 16.1425 5.76887 18.1672C6.13867 18.6109 6.81356 18.6109 7.18336 18.1672C8.8567 16.1425 12.943 10.8267 12.943 6.97149C12.943 3.39368 10.0493 0.5 6.47149 0.5ZM6.47149 9.28274C5.19568 9.28274 4.16025 8.2473 4.16025 6.97149C4.16025 5.69569 5.19568 4.66025 6.47149 4.66025C7.7473 4.66025 8.78274 5.69569 8.78274 6.97149C8.78274 8.2473 7.7473 9.28274 6.47149 9.28274Z"
      fill={color}
    />
  </svg>
);

export default LocationIcon;
