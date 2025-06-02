import { cn } from "@/utils/classNames";
import * as React from "react";
import { SVGProps } from "react";

interface ThreeDotProps extends SVGProps<SVGSVGElement> {
  color?: string;
}

const ThreeDot = ({ color, className, ...props }: ThreeDotProps) => (
  <svg
    width={4}
    height={16}
    viewBox="0 0 4 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn("text-[#98A2B3] dark:text-white", className)}
    {...props}
  >
    <path
      d="M1.99935 8.83331C2.45959 8.83331 2.83268 8.46022 2.83268 7.99998C2.83268 7.53974 2.45959 7.16665 1.99935 7.16665C1.53911 7.16665 1.16602 7.53974 1.16602 7.99998C1.16602 8.46022 1.53911 8.83331 1.99935 8.83331Z"
       fill={color || "currentColor"}
      strokeWidth={1.66667}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M1.99935 2.99998C2.45959 2.99998 2.83268 2.62688 2.83268 2.16665C2.83268 1.70641 2.45959 1.33331 1.99935 1.33331C1.53911 1.33331 1.16602 1.70641 1.16602 2.16665C1.16602 2.62688 1.53911 2.99998 1.99935 2.99998Z"
       fill={color || "currentColor"}
      strokeWidth={1.66667}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M1.99935 14.6666C2.45959 14.6666 2.83268 14.2935 2.83268 13.8333C2.83268 13.3731 2.45959 13 1.99935 13C1.53911 13 1.16602 13.3731 1.16602 13.8333C1.16602 14.2935 1.53911 14.6666 1.99935 14.6666Z"
       fill={color || "currentColor"}
      strokeWidth={1.66667}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ThreeDot;
