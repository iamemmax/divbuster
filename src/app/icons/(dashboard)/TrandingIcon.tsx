import * as React from "react";
import { SVGProps } from "react";

const TradingIcon = ({ fill = "white", stroke, ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    width={17}
    height={15}
    viewBox="0 0 17 15"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M0.667969 14.5002V10.3335H4.0013V14.5002H0.667969ZM1.5013 11.1668V13.6668H3.16797V11.1668H1.5013ZM4.83464 14.5002V7.00016H8.16797V14.5002H4.83464ZM5.66797 7.8335V13.6668H7.33464V7.8335H5.66797ZM9.0013 14.5002V3.66683H12.3346V14.5002H9.0013ZM9.83463 4.50016V13.6668H11.5013V4.50016H9.83463ZM13.168 14.5002V0.333496H16.5013V14.5002H13.168ZM14.0013 1.16683V13.6668H15.668V1.16683H14.0013Z"
      fill={fill}
      stroke={stroke}
    />
  </svg>
);

export default TradingIcon;
