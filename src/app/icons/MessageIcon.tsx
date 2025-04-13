import * as React from "react";
import { SVGProps } from "react";

interface SVGComponentProps extends SVGProps<SVGSVGElement> {
  color?: string; // Color for paths
  background?: string; // Background circle color
}

const MessageIcon = ({ color = "#1B1687", background = "white", ...props }: SVGComponentProps) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {/* Background circle with dynamic color */}
    <circle cx={8} cy={8} r={8} fill={background} />

    {/* Path with dynamic color */}
    <path
      opacity={0.6}
      d="M4.66797 8.32317V6.32984C4.66797 5.40984 5.41464 4.6665 6.33464 4.6665H9.66797C10.588 4.6665 11.3346 5.40984 11.3346 6.32984V8.6565C11.3346 9.57317 10.588 10.3165 9.66797 10.3165H9.16797C9.06464 10.3165 8.96464 10.3665 8.9013 10.4498L8.4013 11.1132C8.1813 11.4065 7.8213 11.4065 7.6013 11.1132L7.1013 10.4498C7.04797 10.3765 6.92797 10.3165 6.83464 10.3165H6.33464C5.41464 10.3165 4.66797 9.57317 4.66797 8.6565V8.32317Z"
      fill={color}
    />
    {/* Eyes with dynamic white color */}
    <path
      d="M8.0013 8.00016C7.81464 8.00016 7.66797 7.85016 7.66797 7.66683C7.66797 7.4835 7.81797 7.3335 8.0013 7.3335C8.18464 7.3335 8.33464 7.4835 8.33464 7.66683C8.33464 7.85016 8.18797 8.00016 8.0013 8.00016Z"
      fill="white"
    />
    <path
      d="M9.33333 8.00016C9.14667 8.00016 9 7.85016 9 7.66683C9 7.4835 9.15 7.3335 9.33333 7.3335C9.51667 7.3335 9.66667 7.4835 9.66667 7.66683C9.66667 7.85016 9.52 8.00016 9.33333 8.00016Z"
      fill="white"
    />
    <path
      d="M6.66536 8.00016C6.4787 8.00016 6.33203 7.85016 6.33203 7.66683C6.33203 7.4835 6.48203 7.3335 6.66536 7.3335C6.8487 7.3335 6.9987 7.4835 6.9987 7.66683C6.9987 7.85016 6.85203 8.00016 6.66536 8.00016Z"
      fill="white"
    />
  </svg>
);

export default MessageIcon;
