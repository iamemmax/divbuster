import * as React from "react";
import { SVGProps } from "react";

const TransactionIcon = ({ stroke = "white", fill = "none", ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill={fill}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M4.58333 7.08317C5.04357 7.08317 5.41667 6.71007 5.41667 6.24984C5.41667 5.7896 5.04357 5.4165 4.58333 5.4165C4.1231 5.4165 3.75 5.7896 3.75 6.24984C3.75 6.71007 4.1231 7.08317 4.58333 7.08317Z"
      stroke={stroke}
    />
    <path
      d="M7.08203 5.4165H16.2487M7.08203 7.08317H12.082"
      stroke={stroke}
      strokeLinecap="round"
    />
    <path
      d="M4.58333 10.8332C5.04357 10.8332 5.41667 10.4601 5.41667 9.99984C5.41667 9.5396 5.04357 9.1665 4.58333 9.1665C4.1231 9.1665 3.75 9.5396 3.75 9.99984C3.75 10.4601 4.1231 10.8332 4.58333 10.8332Z"
      stroke={stroke}
    />
    <path
      d="M7.08203 9.1665H13.7487M7.08203 10.8332H12.9154"
      stroke={stroke}
      strokeLinecap="round"
    />
    <path
      d="M4.58333 14.5832C5.04357 14.5832 5.41667 14.2101 5.41667 13.7498C5.41667 13.2896 5.04357 12.9165 4.58333 12.9165C4.1231 12.9165 3.75 13.2896 3.75 13.7498C3.75 14.2101 4.1231 14.5832 4.58333 14.5832Z"
      stroke={stroke}
    />
    <path
      d="M7.08203 12.9165H14.9987M7.08203 14.5832H10.4154"
      stroke={stroke}
      strokeLinecap="round"
    />
  </svg>
);

export default TransactionIcon;
