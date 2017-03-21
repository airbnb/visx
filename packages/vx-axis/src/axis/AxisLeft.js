import React from 'react';
import cx from 'classnames';
import Axis from './Axis';
import ORIENT from '../constants/orientation';

export default function AxisLeft({
  scale,
  tickFormat,
  top,
  left,
  stroke,
  strokeWidth,
  strokeDasharray,
  tickStroke,
  fontSize,
  hideAxisLine,
  hideTicks,
  hideZero,
  className,
}) {
  return (
    <Axis
      className={cx('vx-axis-left', className)}
      orient={ORIENT.left}
      top={top}
      left={left}
      scale={scale}
      tickFormat={tickFormat}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeDasharray={strokeDasharray}
      hideAxisLine={hideAxisLine}
      hideTicks={hideTicks}
      hideZero={hideZero}
    />
  );
}
