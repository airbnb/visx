import React from 'react';
import cx from 'classnames';

export default function Group({
  top = 0,
  left = 0,
  transform,
  className,
  children,
}) {
  return (
    <g
      className={cx('cx-group', className)}
      transform={transform || `translate(${left}, ${top})`}
    >
      {children}
    </g>
  );
}
