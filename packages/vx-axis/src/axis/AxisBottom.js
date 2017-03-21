import React from 'react';
import cx from 'classnames';
import Axis from './Axis';
import ORIENT from '../constants/orientation';

export default function AxisBottom({
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
      className={cx('vx-axis-bottom', className)}
      orient={ORIENT.bottom}
      top={top}
      left={left}
      scale={scale}
      tickFormat={tickFormat}
      stroke={stroke}
      strokeWidth={strokeWidth}
      hideAxisLine={hideAxisLine}
      hideTicks={hideTicks}
      hideZero={hideZero}
    />
  );
}
