import React from 'react';
import cx from 'classnames';
import Axis from './Axis';
import ORIENT from '../constants/orientation';

export default function AxisTop({
  scale,
  top,
  left,
  stroke,
  strokeWidth,
  strokeDasharray,
  label,
  numTicks,
  tickFormat,
  tickStroke,
  tickTransform,
  tickLength = 8,
  tickLabelOffset = 8,
  tickLabelComponent = (
    <text
      textAnchor="middle"
      fontFamily="Arial"
      fontSize={10}
      fill="black"
      dy="-0.25em"
    />
  ),
  hideAxisLine,
  hideTicks,
  hideZero,
  className,
}) {
  return (
    <Axis
      className={cx('vx-axis-top', className)}
      orientation={ORIENT.top}
      top={top}
      left={left}
      scale={scale}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeDasharray={strokeDasharray}
      labelComponent={
        typeof label === 'string' ?
        <text
          textAnchor="middle"
          fontFamily="Arial"
          fontSize={10}
          fill="black"
        >
          {label}
        </text>
        : label
      }
      numTicks={numTicks}
      tickFormat={tickFormat}
      tickLength={tickLength}
      tickTransform={tickTransform}
      tickStroke={tickStroke}
      tickLabelOffset={tickLabelOffset}
      tickLabelComponent={tickLabelComponent}
      hideAxisLine={hideAxisLine}
      hideTicks={hideTicks}
      hideZero={hideZero}
    />
  );
}
