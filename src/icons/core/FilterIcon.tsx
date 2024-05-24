import * as React from 'react';
import { SVGProps } from 'react';

const FilterIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    height={24}
    width={25}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M5.111 9.575h14.597v1.432H5.111V9.575Zm3.284 4.534h8.029v1.432H8.395v-1.432Zm2.19 4.534h3.65v1.432h-3.65v-1.432ZM2.921 5.04h18.977v1.432H2.921V5.04Z"
      fill="#032282"
    />
  </svg>
);
export default FilterIcon;
