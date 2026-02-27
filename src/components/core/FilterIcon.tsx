/* eslint-disable react/display-name */

import { cn } from "@/utils/classNames";
import * as React from "react";

interface FilterIconProps {
  isDark?: boolean;
  id: string;
  className?: string;
  width: string;
  height: string;
}

export const FilterIcon: React.FunctionComponent<FilterIconProps> =
  React.forwardRef<SVGSVGElement, FilterIconProps>((props, _ref) => {
    const {  } = props;
    return (
      <svg
        className={cn("")}
        width="13"
        height="13"
        viewBox="0 0 13 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.4103 5.122C2.4103 5.21662 2.44516 5.31124 2.51986 5.38594L5.76682 8.6329C6.2947 9.16078 7.16122 9.16078 7.6891 8.6329L10.9361 5.38594C11.0805 5.24152 11.0805 5.00248 10.9361 4.85806C10.7916 4.71364 10.5526 4.71364 10.4082 4.85806L7.16122 8.10502C6.92218 8.34406 6.53374 8.34406 6.2947 8.10502L3.04774 4.85806C2.90332 4.71364 2.66428 4.71364 2.51986 4.85806C2.45014 4.93276 2.4103 5.02738 2.4103 5.122Z"
          fill="#032282"
        />
      </svg>
    );
  });
