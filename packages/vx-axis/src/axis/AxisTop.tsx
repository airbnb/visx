import React from 'react';
import cx from 'classnames';
import Axis from './Axis';
import ORIENT from '../constants/orientation';
import { SharedAxisProps } from '../types';

export type AxisTopProps<Input> = SharedAxisProps<Input>;

export default function AxisTop<Input>({
  children,
  axisClassName,
  axisLineClassName,
  hideAxisLine,
  hideTicks,
  hideZero,
  label,
  labelClassName,
  labelOffset = 8,
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
    dy: '-0.25em',
    fill: 'black',
    fontFamily: 'Arial',
    fontSize: 10,
    textAnchor: 'middle',
  }),
  tickLength = 8,
  tickStroke,
  tickTransform,
  tickValues,
  tickComponent,
  top,
}: AxisTopProps<Input>) {
  return (
    <Axis
      axisClassName={cx('vx-axis-top', axisClassName)}
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
      orientation={ORIENT.top}
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
