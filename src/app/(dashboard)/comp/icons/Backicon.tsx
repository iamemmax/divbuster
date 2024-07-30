import * as React from "react";
import { SVGProps } from "react";
const BackIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={42}
    height={41}
    viewBox="0 0 42 41"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect
      x={1}
      y={0.613159}
      width={40}
      height={39.6132}
      rx={19.8066}
      stroke="white"
    />
    <mask
      id="mask0_4951_2525"
      style={{
        maskType: "luminance",
      }}
      maskUnits="userSpaceOnUse"
      x={1}
      y={0}
      width={40}
      height={41}
    >
      <rect
        x={1}
        y={0.613159}
        width={40}
        height={39.6132}
        rx={19.8066}
        fill="white"
      />
    </mask>
    <g mask="url(#mask0_4951_2525)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.1716 23.4416C16.6615 21.9316 16.6112 19.5146 18.0206 17.9441L18.1716 17.7847L22.291 13.9061C22.6815 13.5155 23.3147 13.5155 23.7052 13.9061C24.0657 14.2665 24.0934 14.8338 23.7884 15.2261L23.7052 15.3203L19.5858 19.1989C18.8458 19.9389 18.8069 21.1144 19.469 21.9002L19.5858 22.0274L23.7052 25.9061C24.0958 26.2966 24.0958 26.9297 23.7052 27.3203C23.3447 27.6807 22.7775 27.7085 22.3852 27.4035L22.291 27.3203L18.1716 23.4416Z"
        fill="white"
      />
    </g>
  </svg>
);
export default BackIcon;
