import * as React from "react";
import { SVGProps } from "react";

interface Props extends SVGProps<SVGSVGElement> {
  color?: string;
}

const VideoIcon = ({ color = "#F7931D", ...props }: Props) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M4.66732 1.3335V14.6668M11.334 1.3335V14.6668M1.33398 8.00016H14.6673M1.33398 4.66683H4.66732M1.33398 11.3335H4.66732M11.334 11.3335H14.6673M11.334 4.66683H14.6673M2.78732 1.3335H13.214C14.0166 1.3335 14.6673 1.98418 14.6673 2.78683V13.2135C14.6673 14.0162 14.0166 14.6668 13.214 14.6668H2.78732C1.98466 14.6668 1.33398 14.0162 1.33398 13.2135V2.78683C1.33398 1.98418 1.98466 1.3335 2.78732 1.3335Z"
      stroke={color}
      strokeWidth={1.33333}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default VideoIcon;
