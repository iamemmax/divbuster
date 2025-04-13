import * as React from "react";
import { SVGProps } from "react";

interface SVGComponentProps extends SVGProps<SVGSVGElement> {
  color?: string;        // For the path color
  background?: string;   // For the background circle color
}

const PlayIcon: React.FC<SVGComponentProps> = ({
  color = "#2B3AA6",    // Default path color
  background = "white", // Default background color
  ...props
}) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx={12} cy={12} r={12} fill={background} /> {/* Use background color */}
    <path
      d="M9.33203 7.42664V16.76L16.6654 12.0933L9.33203 7.42664Z"
      fill={color} // Use color prop for path
    />
  </svg>
);

export default PlayIcon;
