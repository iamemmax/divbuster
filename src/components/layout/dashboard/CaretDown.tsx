import * as React from "react";
import { SVGProps } from "react";
const CaretDown = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.3569 11.5221C11.0986 12.7805 9.08445 12.8224 7.77571 11.6479L7.6429 11.5221L4.41066 8.08924C4.08523 7.7638 4.08523 7.23616 4.41066 6.91072C4.71107 6.61032 5.18376 6.58721 5.51067 6.8414L5.58917 6.91072L8.82141 10.3436C9.43802 10.9602 10.4176 10.9927 11.0724 10.441L11.1784 10.3436L14.4107 6.91072C14.7361 6.58529 15.2637 6.58529 15.5892 6.91072C15.8896 7.21113 15.9127 7.68382 15.6585 8.01073L15.5892 8.08924L12.3569 11.5221Z"
      fill="white"
    />
  </svg>
);
export default CaretDown;
