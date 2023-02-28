import React from 'react';
import cx from 'classnames';
import Axis from './Axis';
import Orientation from '../constants/orientation';
import { SharedAxisProps, AxisScale } from '../types';
import { getTickLabelProps } from '../utils/getTickLabelProps';

export const bottomTickLabelProps = {
  dy: '0.25em',
  fill: '#222',
  fontFamily: 'Arial',
  fontSize: 10,
  textAnchor: 'middle',
} as const;

export default function AxisBottom<Scale extends AxisScale>({
  axisClassName,
  labelOffset = 8,
  tickLength = 8,
  tickLabelProps,
  ...restProps
}: SharedAxisProps<Scale>) {
  return (
    <Axis
      axisClassName={cx('visx-axis-bottom', axisClassName)}
      labelOffset={labelOffset}
      orientation={Orientation.bottom}
      tickLabelProps={getTickLabelProps<Scale>(bottomTickLabelProps, tickLabelProps)}
      tickLength={tickLength}
      {...restProps}
    />
  );
}
