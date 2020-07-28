import React from 'react';
import cx from 'classnames';
import Axis from './Axis';
import ORIENT from '../constants/orientation';
import { SharedAxisProps } from '../types';

export type AxisTopProps<Datum> = SharedAxisProps<Datum>;

export default function AxisTop<Datum>({
  axisClassName,
  labelOffset = 8,
  tickLabelProps = (/** tickValue, index */) => ({
    dy: '-0.25em',
    fill: '#222',
    fontFamily: 'Arial',
    fontSize: 10,
    textAnchor: 'middle',
  }),
  tickLength = 8,
  ...restProps
}: AxisTopProps<Datum>) {
  return (
    <Axis
      axisClassName={cx('vx-axis-top', axisClassName)}
      labelOffset={labelOffset}
      orientation={ORIENT.top}
      tickLabelProps={tickLabelProps}
      tickLength={tickLength}
      {...restProps}
    />
  );
}
