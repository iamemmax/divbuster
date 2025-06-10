import * as React from "react";
import { SVGProps } from "react";
const HeartIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={20}
    height={18}
    viewBox="0 0 20 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M16.2182 2.32846C13.9834 0.957691 12.033 1.51009 10.8613 2.39001C10.3809 2.7508 10.1407 2.93119 9.99935 2.93119C9.85802 2.93119 9.61781 2.7508 9.13739 2.39001C7.9657 1.51009 6.01525 0.957691 3.78055 2.32846C0.847739 4.12745 0.184116 10.0624 6.94896 15.0695C8.23745 16.0232 8.88169 16.5 9.99935 16.5C11.117 16.5 11.7613 16.0232 13.0497 15.0695C19.8146 10.0624 19.151 4.12745 16.2182 2.32846Z"
      stroke="#344054"
      strokeWidth={1.5}
      strokeLinecap="round"
    />
  </svg>
);
export default HeartIcon;
