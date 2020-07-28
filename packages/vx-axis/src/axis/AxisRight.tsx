import React from 'react';
import cx from 'classnames';
import Axis from './Axis';
import ORIENT from '../constants/orientation';
import { SharedAxisProps } from '../types';

export type AxisRightProps<Datum> = SharedAxisProps<Datum>;

export default function AxisRight<Datum>({
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
}: AxisRightProps<Datum>) {
  return (
    <Axis
      axisClassName={cx('vx-axis-right', axisClassName)}
      labelOffset={labelOffset}
      orientation={ORIENT.right}
      tickLabelProps={tickLabelProps}
      tickLength={tickLength}
      {...restProps}
    />
  );
}
