// Inspired by: https://benadam.me/thoughts/react-svg-sprites/

import clsx from 'clsx';
import * as React from 'react';

interface IconProps {
  id: string;
  className?: string;
  width: string;
  height: string;
}

//
// eslint-disable-next-line react/display-name
export const Icon: React.FunctionComponent<IconProps> = React.forwardRef(

  (props, _ref) => {
    const { id, className, height, width } = props;
    return (
      <>
        <svg
          className={clsx(className, 'svg-container')}
          height={height}
          width={width}
          aria-hidden
        >
          <use href={`/icons/sprite.svg#${id}`} />
        </svg>
      </>
    );
  }
);
