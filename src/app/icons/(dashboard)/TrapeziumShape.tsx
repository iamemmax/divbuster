import * as React from "react";
import { SVGProps } from "react";
const TrapeziumShape = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 400 200"
    className="absolute inset-0"
    {...props}
  >
    {"\n            {/* Trapezoid path */}\n            "}
    <path
      d="M 0 0 L 50 0 L 80 160 L 320 160 L 350 0 L 400 0"
      fill="none"
      stroke="#374151"
      strokeWidth={2}
    />
    {"\n            {/* Fill the underwater area */}\n            "}
    <path
      d="M 50 0 L 80 160 L 320 160 L 350 0 Z"
      fill="none"
      fillOpacity={0.3}
    />
  </svg>
);
export default TrapeziumShape;
