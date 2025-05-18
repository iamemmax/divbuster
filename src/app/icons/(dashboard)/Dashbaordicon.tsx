import * as React from "react";
import { SVGProps } from "react";
import { cn } from "@/utils/classNames";

interface CustomSVGProps extends SVGProps<SVGSVGElement> {
  color?: string;
  className?: string;
}

const DashboardIcon = ({ color, className, ...props }: CustomSVGProps) => {
  
  return (
    <svg
      width={20}
      height={21}
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-[#F7931D] dark:text-blue-400", className)}
      {...props}
    >
      <path
        d="M18.3333 7.60002V3.81669C18.3333 2.64169 17.8 2.16669 16.475 2.16669H13.1083C11.7833 2.16669 11.25 2.64169 11.25 3.81669V7.59169C11.25 8.77502 11.7833 9.24169 13.1083 9.24169H16.475C17.8 9.25002 18.3333 8.77502 18.3333 7.60002Z"
        fill={color || "currentColor"}
      />
      <path
        d="M18.3333 16.975V13.6083C18.3333 12.2833 17.8 11.75 16.475 11.75H13.1083C11.7833 11.75 11.25 12.2833 11.25 13.6083V16.975C11.25 18.3 11.7833 18.8333 13.1083 18.8333H16.475C17.8 18.8333 18.3333 18.3 18.3333 16.975Z"
        fill={color || "currentColor"}
      />
      <path
        d="M8.74935 7.60002V3.81669C8.74935 2.64169 8.21602 2.16669 6.89102 2.16669H3.52435C2.19935 2.16669 1.66602 2.64169 1.66602 3.81669V7.59169C1.66602 8.77502 2.19935 9.24169 3.52435 9.24169H6.89102C8.21602 9.25002 8.74935 8.77502 8.74935 7.60002Z"
        fill={color || "currentColor"}
      />
      <path
        d="M8.74935 16.975V13.6083C8.74935 12.2833 8.21602 11.75 6.89102 11.75H3.52435C2.19935 11.75 1.66602 12.2833 1.66602 13.6083V16.975C1.66602 18.3 2.19935 18.8333 3.52435 18.8333H6.89102C8.21602 18.8333 8.74935 18.3 8.74935 16.975Z"
        fill={color || "currentColor"}
      />
    </svg>
  );
};

export default DashboardIcon;
