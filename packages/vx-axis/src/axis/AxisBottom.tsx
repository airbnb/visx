import React from 'react';
import cx from 'classnames';
import Axis from './Axis';
import ORIENT from '../constants/orientation';
import { SharedAxisProps } from '../types';

export type AxisBottomProps<Datum> = SharedAxisProps<Datum>;

export default function AxisBottom<Datum>({
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
}: AxisBottomProps<Datum>) {
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
