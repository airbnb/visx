import React from 'react';
import cx from 'classnames';

export default ({
  className,
  x = 0,
  y = 0,
  width,
  height,
  rx,
  ry,
  fill = 'steelblue',
  stroke,
  strokeWidth,
  strokeDasharray,
  strokeLinecap,
  strokeLinejoin,
  strokeMiterlimit,
  strokeOpacity,
}) => {
  return (
    <rect
      className={cx('vx-bar', className)}
      x={x}
      y={y}
      width={width}
      height={height}
      rx={rx}
      ry={ry}
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeDasharray={strokeDasharray}
      strokeLinecap={strokeLinecap}
      strokeLinejoin={strokeLinejoin}
      strokeMiterlimit={strokeMiterlimit}
      strokeOpacity={strokeOpacity}
    />
  );
}
