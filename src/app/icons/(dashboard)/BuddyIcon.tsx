import { cn } from "@/utils/classNames";
import * as React from "react";
import { SVGProps } from "react";

const BuddyIcon = ({ color,className, ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    width={18}
    height={19}
    viewBox="0 0 18 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
        className={cn("text-[#F7931D] dark:text-white", className)}
    
    {...props}
  >
    <g clipPath="url(#clip0_1765_7020)">
      <path
        d="M8.99998 18.5C13.9706 18.5 18 14.4706 18 9.49998C18 4.52941 13.9706 0.5 8.99998 0.5C4.02941 0.5 0 4.52941 0 9.49998C0 14.4706 4.02941 18.5 8.99998 18.5ZM7.20797 7.70797L13.5992 4.90068L10.792 11.2919L4.40081 14.0992L7.20797 7.70797Z"
        fill={color || "currentColor"}
      />
      <path
        d="M8.99924 10.4297C9.56945 10.4297 10.0317 9.96745 10.0317 9.39725C10.0317 8.82705 9.56945 8.36481 8.99924 8.36481C8.42904 8.36481 7.9668 8.82705 7.9668 9.39725C7.9668 9.96745 8.42904 10.4297 8.99924 10.4297Z"
        fill={color || "currentColor"}
      />
    </g>
    <defs>
      <clipPath id="clip0_1765_7020">
        <rect
          width={18}
          height={18}
          fill="white"
          transform="translate(0 0.5)"
        />
      </clipPath>
    </defs>
  </svg>
);

export default BuddyIcon;
