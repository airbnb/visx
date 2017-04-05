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
  fontSize,
  numTicks,
  tickFormat,
  tickStroke,
  tickK = -1,
  tickOffset,
  tickTransform,
  tickLength = 8,
  tickPadding = 2,
  tickTextAnchor = "middle",
  tickTextFontFamily = "Arial",
  tickTextFontSize = 10,
  tickTextFill = 'black',
  tickTextDy,
  tickTextDx,
  hideAxisLine,
  hideTicks,
  hideZero,
  className,
}) {
  return (
    <Axis
      className={cx('vx-axis-top', className)}
      orient={ORIENT.top}
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
      tickTransform={tickTransform || `translate(0, ${tickOffset || tickK * tickLength})`}
      tickStroke={tickStroke}
      tickPadding={tickPadding}
      tickTextDy={tickTextDy || tickK * tickPadding + tickK * (hideTicks ? tickPadding : tickLength)}
      tickTextDx={tickTextDx || 0}
      tickTextAnchor={tickTextAnchor}
      tickTextFontFamily={tickTextFontFamily}
      tickTextFontSize={tickTextFontSize}
      tickTextFill={tickTextFill}
      hideAxisLine={hideAxisLine}
      hideTicks={hideTicks}
      hideZero={hideZero}
    />
  );
}
