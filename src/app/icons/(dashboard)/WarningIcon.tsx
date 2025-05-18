import * as React from "react";
import { SVGProps } from "react";

interface CustomSVGProps extends SVGProps<SVGSVGElement> {
  color?: string;
}

const WarningIcon = ({ color = "#AAAFB5", ...props }: CustomSVGProps) => (
  <svg
    width={18}
    height={18}
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.61049 2.19248C7.66546 0.341278 10.334 0.341277 11.389 2.19247L17.6269 13.1384C18.6717 14.9716 17.3478 17.25 15.2377 17.25H2.76187C0.651775 17.25 -0.672153 14.9716 0.372609 13.1384L6.61049 2.19248ZM8.99971 10.8333C9.50597 10.8333 9.91638 10.4229 9.91638 9.91662V5.33329C9.91638 4.82703 9.50597 4.41663 8.99971 4.41663C8.49345 4.41663 8.08304 4.82703 8.08304 5.33329V9.91662C8.08304 10.4229 8.49345 10.8333 8.99971 10.8333ZM8.99971 14.5C9.50597 14.5 9.91638 14.0896 9.91638 13.5833C9.91638 13.077 9.50597 12.6666 8.99971 12.6666C8.49345 12.6666 8.08304 13.077 8.08304 13.5833C8.08304 14.0896 8.49345 14.5 8.99971 14.5Z"
      fill={color}
    />
  </svg>
);

export default WarningIcon;
