import React from 'react';
import cx from 'classnames';
import Axis from './Axis';
import ORIENT from '../constants/orientation';
import { SharedAxisProps, AxisScale } from '../types';

export type AxisLeftProps<Scale extends AxisScale> = SharedAxisProps<Scale>;

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
}: AxisLeftProps<Scale>) {
  return (
    <Axis
      axisClassName={cx('vx-axis-left', axisClassName)}
      labelOffset={labelOffset}
      orientation={ORIENT.left}
      tickLabelProps={tickLabelProps}
      tickLength={tickLength}
      {...restProps}
    />
  );
}
