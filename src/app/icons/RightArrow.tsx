import * as React from "react";
import { SVGProps } from "react";

interface CustomSVGProps extends SVGProps<SVGSVGElement> {
  background?: string; // Background color for the circle
  color?: string; // Color for the arrow
}

const RightArrowIcon = ({
  background = "transparent", // Default background color for the circle
  color = "#2B3AA6", // Default color for the arrow
  ...props
}: CustomSVGProps) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {/* Circle background with customizable color */}
    <circle cx={12} cy={12} r={12} fill={background} />
    
    {/* Arrow path with customizable color */}
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.735 8.73504C12.8053 8.66481 12.9006 8.62537 13 8.62537C13.0994 8.62537 13.1947 8.66481 13.265 8.73504L16.265 11.735C16.3352 11.8053 16.3747 11.9007 16.3747 12C16.3747 12.0994 16.3352 12.1947 16.265 12.265L13.265 15.265C13.2307 15.3019 13.1893 15.3314 13.1433 15.3519C13.0973 15.3724 13.0476 15.3834 12.9973 15.3843C12.9469 15.3852 12.8969 15.376 12.8502 15.3571C12.8035 15.3382 12.7611 15.3102 12.7255 15.2746C12.6899 15.2389 12.6618 15.1965 12.6429 15.1498C12.6241 15.1031 12.6148 15.0531 12.6157 15.0028C12.6166 14.9524 12.6276 14.9028 12.6481 14.8568C12.6686 14.8108 12.6982 14.7694 12.735 14.735L15.095 12.375H8C7.90054 12.375 7.80516 12.3355 7.73483 12.2652C7.66451 12.1949 7.625 12.0995 7.625 12C7.625 11.9006 7.66451 11.8052 7.73483 11.7349C7.80516 11.6645 7.90054 11.625 8 11.625H15.095L12.735 9.26504C12.6648 9.19472 12.6253 9.09941 12.6253 9.00004C12.6253 8.90066 12.6648 8.80535 12.735 8.73504Z"
      fill={color} // Arrow color is now customizable
    />
  </svg>
);

export default RightArrowIcon;

