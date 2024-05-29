import * as React from 'react';
import { SVGProps } from 'react';

const RadioCheckIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    height={13}
    width={13}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx={6.5} cy={6.5} r={6} stroke="#0934F6" />
    <circle cx={6.5} cy={6.5} fill="#032282" r={4.5} />
  </svg>
);
export default RadioCheckIcon;
