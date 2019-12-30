import React from 'react';
import cx from 'classnames';
import Axis from './Axis';
import ORIENT from '../constants/orientation';
import { SharedAxisProps } from '../types';

export type AxisLeftProps<ScaleInput> = SharedAxisProps<ScaleInput>;

export default function AxisLeft<ScaleInput>({
  children,
  axisClassName,
  axisLineClassName,
  hideAxisLine,
  hideTicks,
  hideZero,
  label,
  labelClassName,
  labelOffset = 36,
  labelProps,
  left,
  numTicks,
  rangePadding,
  scale,
  stroke,
  strokeWidth,
  strokeDasharray,
  tickClassName,
  tickFormat,
  tickLabelProps = (/** tickValue, index */) => ({
    dx: '-0.25em',
    dy: '0.25em',
    fill: '#222',
    fontFamily: 'Arial',
    fontSize: 10,
    textAnchor: 'end',
  }),
  tickLength = 8,
  tickStroke,
  tickTransform,
  tickValues,
  tickComponent,
  top,
}: AxisLeftProps<ScaleInput>) {
  return (
    <Axis
      axisClassName={cx('vx-axis-left', axisClassName)}
      axisLineClassName={axisLineClassName}
      hideAxisLine={hideAxisLine}
      hideTicks={hideTicks}
      hideZero={hideZero}
      label={label}
      labelClassName={labelClassName}
      labelOffset={labelOffset}
      labelProps={labelProps}
      left={left}
      numTicks={numTicks}
      orientation={ORIENT.left}
      rangePadding={rangePadding}
      scale={scale}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeDasharray={strokeDasharray}
      tickClassName={tickClassName}
      tickFormat={tickFormat}
      tickLabelProps={tickLabelProps}
      tickLength={tickLength}
      tickStroke={tickStroke}
      tickTransform={tickTransform}
      tickValues={tickValues}
      tickComponent={tickComponent}
      top={top}
      children={children}
    />
  );
}
