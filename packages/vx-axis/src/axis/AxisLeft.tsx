import React from 'react';
import cx from 'classnames';
import Axis from './Axis';
import ORIENT from '../constants/orientation';
import { SharedAxisProps } from '../types';

export type AxisLeftProps<Datum> = SharedAxisProps<Datum>;

export default function AxisLeft<Datum>({
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
}: AxisLeftProps<Datum>) {
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
