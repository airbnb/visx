import React from 'react';
import cx from 'classnames';
import Axis from './Axis';
import ORIENT from '../constants/orientation';

export default function AxisLeft({
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
  tickOffset,
  tickTransform,
  tickLength = 8,
  tickLabelPadding = 30,
  tickLabelComponent = (
    <text
      textAnchor="end"
      fontFamily="Arial"
      fontSize={10}
      fill="black"
      dx="-0.25em"
      dy="0.25em"
    />
  ),
  hideAxisLine,
  hideTicks,
  hideZero,
  className,
}) {
  return (
    <Axis
      className={cx('vx-axis-left', className)}
      orientation={ORIENT.left}
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
      tickOffset={tickOffset || -1 * tickLength}
      tickTransform={tickTransform || `translate(${tickOffset || -1 * tickLength})`}
      tickStroke={tickStroke}
      tickLabelPadding={tickLabelPadding}
      tickLabelComponent={tickLabelComponent}
      hideAxisLine={hideAxisLine}
      hideTicks={hideTicks}
      hideZero={hideZero}
    />
  );
}
