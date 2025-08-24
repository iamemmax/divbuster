import * as React from "react";
import { SVGProps } from "react";
const ClockIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={24}
    height={23}
    viewBox="0 0 24 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M14.6048 18.7918L16.6882 20.8752L21.3757 16.1877M22.4018 12.073C22.4121 11.8833 22.4173 11.6924 22.4173 11.5002C22.4173 5.7472 17.7536 1.0835 12.0007 1.0835C6.24768 1.0835 1.58398 5.7472 1.58398 11.5002C1.58398 17.162 6.10118 21.7689 11.7282 21.9133M12.0007 5.25016V11.5002L15.8948 13.4472"
      stroke="#132346"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default ClockIcon;
