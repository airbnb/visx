import React from 'react';
import cx from 'classnames';
import Axis from './Axis';
import ORIENT from '../constants/orientation';

export default function AxisBottom({
  scale,
  tickFormat,
  top = 0,
  left = 0,
  hideAxisLine = false,
  hideTicks = false,
  hideZero = false,
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
      hideAxisLine={hideAxisLine}
      hideTicks={hideTicks}
      hideZero={hideZero}
    />
  );
}
