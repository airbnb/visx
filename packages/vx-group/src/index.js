import React from 'react';
import cx from 'classnames';

export default function Group({
  top = 0,
  left = 0,
  className,
  children,
}) {
  return (
    <g
      className={cx('cx-group', className)}
      transform={`translate(${left}, ${top})`}
    >
      {children}
    </g>
  );
}
