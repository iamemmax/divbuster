import * as React from "react";
import { SVGProps } from "react";

interface SVGComponentProps extends SVGProps<SVGSVGElement> {
  color1?: string;
  color2?: string;
  color3?: string;
}

const CopyIcon3 = ({
  color1 = "white",
  color2 = "white",
  color3 = "white",
  ...props
}: SVGComponentProps) => (
  <svg
    width={12}
    height={12}
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      opacity={0.4}
      d="M7.75 6.575H6.665C5.775 6.575 5.05 5.855 5.05 4.96V3.875C5.05 3.67 4.885 3.5 4.675 3.5H3.09C1.935 3.5 1 4.25 1 5.59V8.91C1 10.25 1.935 11 3.09 11H6.035C7.19 11 8.125 10.25 8.125 8.91V6.95C8.125 6.74 7.955 6.575 7.75 6.575Z"
      fill={color1}
    />
    <path
      opacity={0.2}
      d="M8.90988 1H7.92488H7.37988H5.96488C4.83488 1 3.91988 1.72 3.87988 3.005C3.90988 3.005 3.93488 3 3.96488 3H5.37988H5.92488H6.90988C8.06488 3 8.99988 3.75 8.99988 5.09V6.075V7.43V8.415C8.99988 8.445 8.99488 8.47 8.99488 8.495C10.1099 8.46 10.9999 7.72 10.9999 6.415V5.43V4.075V3.09C10.9999 1.75 10.0649 1 8.90988 1Z"
      fill={color2}
    />
    <path
      d="M5.99031 3.57512C5.83531 3.42012 5.57031 3.52512 5.57031 3.74012V5.05012C5.57031 5.60012 6.03531 6.05012 6.60531 6.05012C6.96031 6.05512 7.45531 6.05512 7.88031 6.05512C8.09531 6.05512 8.20531 5.80512 8.05531 5.65512C7.51031 5.11012 6.54031 4.13512 5.99031 3.57512Z"
      fill={color3}
    />
  </svg>
);

export default CopyIcon3;
