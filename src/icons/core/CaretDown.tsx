import * as React from 'react';
import { SVGProps } from 'react';

const CaretDownIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    height={20}
    width={19}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      clipRule="evenodd"
      d="M11.436 11.45c-1.087 1.199-2.827 1.238-3.958.12l-.115-.12-2.792-3.27a.852.852 0 0 1 0-1.122.672.672 0 0 1 .95-.066l.068.066 2.793 3.27c.532.587 1.379.618 1.945.092l.091-.092 2.793-3.27a.674.674 0 0 1 1.018 0c.26.286.28.737.06 1.048l-.06.075-2.793 3.27Z"
      fill="#fff"
      fillRule="evenodd"
    />
  </svg>
);
export default CaretDownIcon;
