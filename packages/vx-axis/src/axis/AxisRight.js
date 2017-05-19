import React from 'react';
import cx from 'classnames';
import Axis from './Axis';
import ORIENT from '../constants/orientation';

export default function AxisRight({
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
      textAnchor="start"
      fontFamily="Arial"
      fontSize={10}
      fill="black"
      dx="0.25em"
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
      className={cx('vx-axis-right', className)}
      orientation={ORIENT.right}
      top={top}
      left={left}
      scale={scale}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeDasharray={strokeDasharray}
      labelComponent={
        typeof label === 'string' ?
        <text
          textAnchor="start"
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
      tickOffset={tickOffset || tickLength}
      tickTransform={tickTransform || `translate(${tickOffset || 0})`}
      tickStroke={tickStroke}
      tickLabelPadding={tickLabelPadding}
      tickLabelComponent={tickLabelComponent}
      hideAxisLine={hideAxisLine}
      hideTicks={hideTicks}
      hideZero={hideZero}
    />
  );
}
