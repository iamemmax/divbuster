import * as React from 'react';
import { SVGProps } from 'react';

const CardOrangeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    height={34}
    width={34}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx={17} cy={17} fill="#FFF6E8" r={17} />
    <g clipPath="url(#a)" fill="#F7A325">
      <path d="M23.106 12.398H10.895a2.696 2.696 0 0 0-2.688 2.688v5.03a2.696 2.696 0 0 0 2.688 2.689h12.192a2.696 2.696 0 0 0 2.688-2.688v-5.03c.019-1.479-1.19-2.688-2.669-2.688Zm1.92 7.719c0 1.056-.864 1.92-1.92 1.92H10.895a1.926 1.926 0 0 1-1.92-1.92v-5.03c0-1.057.864-1.92 1.92-1.92h12.192c1.056 0 1.92.863 1.92 1.92v5.03h.02Z" />
      <path d="M19.416 15.184a3.418 3.418 0 1 1-4.834 4.834 3.418 3.418 0 0 1 4.834-4.834ZM12.162 15.624a.96.96 0 1 1-1.92 0 .96.96 0 0 1 1.92 0ZM23.76 19.581a.96.96 0 1 1-1.92 0 .96.96 0 0 1 1.92 0Z" />
    </g>
    <defs>
      <clipPath id="a">
        <path d="M8 12h18v11H8z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
export default CardOrangeIcon;
