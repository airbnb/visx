import React from 'react';
import cx from 'classnames';
import Axis from './Axis';
import ORIENT from '../constants/orientation';
import { SharedAxisProps, AxisScale } from '../types';

export type AxisBottomProps<Scale extends AxisScale> = SharedAxisProps<Scale>;

export default function AxisBottom<Scale extends AxisScale>({
  axisClassName,
  labelOffset = 8,
  tickLabelProps = (/** tickValue, index */) => ({
    dy: '0.25em',
    fill: '#222',
    fontFamily: 'Arial',
    fontSize: 10,
    textAnchor: 'middle',
  }),
  tickLength = 8,
  ...restProps
}: AxisBottomProps<Scale>) {
  return (
    <Axis
      axisClassName={cx('vx-axis-bottom', axisClassName)}
      labelOffset={labelOffset}
      orientation={ORIENT.bottom}
      tickLabelProps={tickLabelProps}
      tickLength={tickLength}
      {...restProps}
    />
  );
}
