import React from 'react';
import cx from 'classnames';
import Axis from './Axis';
import Orientation from '../constants/orientation';
import { SharedAxisProps, AxisScale } from '../types';

export default function AxisLeft<Scale extends AxisScale>({
  axisClassName,
  labelOffset = 36,
  tickLabelProps = (/** tickValue, index */) => ({
    dx: '-0.25em',
    dy: '0.25em',
    fill: '#222',
    fontFamily: 'Arial',
    fontSize: 10,
    textAnchor: 'end',
  }),
  tickLength = 8,
  ...restProps
}: SharedAxisProps<Scale>) {
  return (
    <Axis
      axisClassName={cx('vx-axis-left', axisClassName)}
      labelOffset={labelOffset}
      orientation={Orientation.left}
      tickLabelProps={tickLabelProps}
      tickLength={tickLength}
      {...restProps}
    />
  );
}
