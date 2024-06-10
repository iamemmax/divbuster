import * as React from "react";
import { SVGProps } from "react";
const SVGComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={23}
    height={22}
    viewBox="0 0 23 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.5231 12.6741C13.1274 14.0583 10.8935 14.1044 9.44196 12.8125L9.29466 12.6741L5.70976 8.89795C5.34881 8.53997 5.34881 7.95957 5.70976 7.60159C6.04294 7.27115 6.56721 7.24573 6.92978 7.52533L7.01686 7.60159L10.6018 11.3777C11.2857 12.056 12.3721 12.0917 13.0984 11.4848L13.216 11.3777L16.8009 7.60159C17.1618 7.24361 17.747 7.24361 18.108 7.60159C18.4411 7.93203 18.4668 8.45199 18.1848 8.8116L18.108 8.89795L14.5231 12.6741Z"
      fill="white"
    />
  </svg>
);
export default SVGComponent;
