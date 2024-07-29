import * as React from "react";
import { SVGProps } from "react";

interface SVGComponentProps extends SVGProps<SVGSVGElement> {
  color?: string;
}

const ActiveIcon = ({ color = "#12B669", ...props }: SVGComponentProps) => (
    <svg
    width={10}
    height={10}
    viewBox="0 0 10 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx={5} cy={5} r={5} fill={color} />
    <path
      d="M4.58224 7.17C4.49378 7.17 4.40975 7.13462 4.34783 7.0727L3.09619 5.82106C2.96794 5.6928 2.96794 5.48051 3.09619 5.35225C3.22445 5.22399 3.43675 5.22399 3.56501 5.35225L4.58224 6.36948L6.85553 4.09619C6.98378 3.96794 7.19608 3.96794 7.32434 4.09619C7.4526 4.22445 7.4526 4.43675 7.32434 4.56501L4.81664 7.0727C4.75472 7.13462 4.67069 7.17 4.58224 7.17Z"
      fill="white"
    />
  </svg>
);

export default ActiveIcon;