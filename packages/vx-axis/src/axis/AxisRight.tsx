import React from 'react';
import cx from 'classnames';
import Axis from './Axis';
import Orientation from '../constants/orientation';
import { SharedAxisProps, AxisScale } from '../types';

export type AxisRightProps<Scale extends AxisScale> = SharedAxisProps<Scale>;

export default function AxisRight<Scale extends AxisScale>({
  axisClassName,
  labelOffset = 36,
  tickLabelProps = (/** tickValue, index */) => ({
    dx: '0.25em',
    dy: '0.25em',
    fill: '#222',
    fontFamily: 'Arial',
    fontSize: 10,
    textAnchor: 'start',
  }),
  tickLength = 8,
  ...restProps
}: AxisRightProps<Scale>) {
  return (
    <Axis
      axisClassName={cx('vx-axis-right', axisClassName)}
      labelOffset={labelOffset}
      orientation={Orientation.right}
      tickLabelProps={tickLabelProps}
      tickLength={tickLength}
      {...restProps}
    />
  );
}
