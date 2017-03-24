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
  fontSize,
  label,
  numTicks,
  tickFormat,
  tickStroke,
  tickK = 1,
  tickOffset,
  tickTransform,
  tickLength = 8,
  tickPadding = 2,
  tickTextAnchor = "start",
  tickTextFontFamily = "Arial",
  tickTextFontSize = 10,
  tickTextDy,
  tickTextDx,
  hideAxisLine,
  hideTicks,
  hideZero,
  className,
}) {
  return (
    <Axis
      className={cx('vx-axis-right', className)}
      orient={ORIENT.right}
      top={top}
      left={left}
      scale={scale}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeDasharray={strokeDasharray}
      label={label}
      numTicks={numTicks}
      tickK={tickK}
      tickFormat={tickFormat}
      tickLength={tickLength}
      tickOffset={tickOffset || tickK * tickLength}
      tickTransform={tickTransform || `translate(${tickOffset || 0})`}
      tickStroke={tickStroke}
      tickPadding={tickPadding}
      tickTextDy={tickTextDy || tickTextFontSize / 3}
      tickTextDx={tickTextDx || tickK * tickPadding + tickK * (hideTicks ? tickPadding : tickLength)}
      tickTextAnchor={tickTextAnchor}
      tickTextFontFamily={tickTextFontFamily}
      tickTextFontSize={tickTextFontSize}
      hideAxisLine={hideAxisLine}
      hideTicks={hideTicks}
      hideZero={hideZero}
    />
  );
}
