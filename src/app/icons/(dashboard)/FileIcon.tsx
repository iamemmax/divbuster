import * as React from "react";
import { SVGProps } from "react";

interface Props extends SVGProps<SVGSVGElement> {
  color?: string;
}

const FileIcon = ({ color = "#F7931D", ...props }: Props) => (
  <svg
    width={12}
    height={16}
    viewBox="0 0 12 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M6.66602 1.3335H1.99935C1.64573 1.3335 1.30659 1.47397 1.05654 1.72402C0.806491 1.97407 0.666016 2.31321 0.666016 2.66683V13.3335C0.666016 13.6871 0.806491 14.0263 1.05654 14.2763C1.30659 14.5264 1.64573 14.6668 1.99935 14.6668H9.99935C10.353 14.6668 10.6921 14.5264 10.9422 14.2763C11.1922 14.0263 11.3327 13.6871 11.3327 13.3335V6.00016M6.66602 1.3335L11.3327 6.00016M6.66602 1.3335V6.00016H11.3327"
      stroke={color}
      strokeWidth={1.33333}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default FileIcon;
