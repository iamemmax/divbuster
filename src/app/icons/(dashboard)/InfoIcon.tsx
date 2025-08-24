import * as React from "react";
import { SVGProps } from "react";
const InfoIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M8 13.625C11.1066 13.625 13.625 11.1066 13.625 8C13.625 4.8934 11.1066 2.375 8 2.375C4.8934 2.375 2.375 4.8934 2.375 8C2.375 11.1066 4.8934 13.625 8 13.625Z"
      stroke="#F7931D"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.53125 7.53125C7.65557 7.53125 7.7748 7.58064 7.86271 7.66854C7.95061 7.75645 8 7.87568 8 8V10.3438C8 10.4681 8.04939 10.5873 8.13729 10.6752C8.2252 10.7631 8.34443 10.8125 8.46875 10.8125"
      stroke="#F7931D"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.76562 6.125C8.15395 6.125 8.46875 5.8102 8.46875 5.42188C8.46875 5.03355 8.15395 4.71875 7.76562 4.71875C7.3773 4.71875 7.0625 5.03355 7.0625 5.42188C7.0625 5.8102 7.3773 6.125 7.76562 6.125Z"
      fill="#F7931D"
    />
  </svg>
);
export default InfoIcon;
