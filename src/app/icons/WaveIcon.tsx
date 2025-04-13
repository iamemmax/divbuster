import * as React from "react";
import { SVGProps } from "react";

interface SVGComponentProps extends SVGProps<SVGSVGElement> {
  color?: string;        // For the path color
  background?: string;   // For the circle background color
}

const WaveIcon: React.FC<SVGComponentProps> = ({
  color = "#4649E5",    // Default color for the stroke
  background = "#4649E5", // Default background color for the circle
  ...props
}) => (
  <svg
    width={114}
    height={70}
    viewBox="0 0 114 70"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M1 52.2904C1 52.2904 1.82854 36.8415 9 35.2904C17.1687 33.5236 14.1978 49.2946 22 52.2904C36.894 58.0094 21.2221 16.6562 37 14.2904C53.958 11.7477 42.37 64.1093 59 68.2904C80.8489 73.7838 69.1856 -4.33834 91 1.29042C107.278 5.49051 113 54.2904 113 54.2904"
      stroke={color} // Use color prop for stroke
      strokeWidth={2}
    />
    <circle cx={76} cy={29.2891} r={5} fill={background} /> {/* Use background prop for circle fill */}
  </svg>
);

export default WaveIcon;
