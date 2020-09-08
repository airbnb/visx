import React from 'react';
import cx from 'classnames';
import Axis from './Axis';
import Orientation from '../constants/orientation';
import { SharedAxisProps, AxisScale } from '../types';

export type AxisTopProps<Scale extends AxisScale> = SharedAxisProps<Scale>;

export const topTickLabelProps = (/** tickValue, index */) =>
  ({
    dy: '-0.75em',
    fill: '#222',
    fontFamily: 'Arial',
    fontSize: 10,
    textAnchor: 'middle',
  } as const);

export default function AxisTop<Scale extends AxisScale>({
  axisClassName,
  labelOffset = 8,
  tickLabelProps = topTickLabelProps,
  tickLength = 8,
  ...restProps
}: AxisTopProps<Scale>) {
  return (
    <Axis
      axisClassName={cx('visx-axis-top', axisClassName)}
      labelOffset={labelOffset}
      orientation={Orientation.top}
      tickLabelProps={tickLabelProps}
      tickLength={tickLength}
      {...restProps}
    />
  );
}
