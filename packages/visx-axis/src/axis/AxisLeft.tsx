import React from 'react';
import cx from 'classnames';
import Axis from './Axis';
import Orientation from '../constants/orientation';
import { SharedAxisProps, AxisScale } from '../types';

export const leftTickLabelProps = (/** tickValue, index */) =>
  ({
    dx: '-0.25em',
    dy: '0.25em',
    fill: '#222',
    fontFamily: 'Arial',
    fontSize: 10,
    textAnchor: 'end',
  } as const);

export default function AxisLeft<Scale extends AxisScale>({
  axisClassName,
  labelOffset = 36,
  tickLabelProps = leftTickLabelProps,
  tickLength = 8,
  ...restProps
}: SharedAxisProps<Scale>) {
  return (
    <Axis
      axisClassName={cx('visx-axis-left', axisClassName)}
      labelOffset={labelOffset}
      orientation={Orientation.left}
      tickLabelProps={tickLabelProps}
      tickLength={tickLength}
      {...restProps}
    />
  );
}
