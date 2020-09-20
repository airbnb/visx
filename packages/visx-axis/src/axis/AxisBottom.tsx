import React from 'react';
import cx from 'classnames';
import Axis from './Axis';
import Orientation from '../constants/orientation';
import { SharedAxisProps, AxisScale } from '../types';

export const bottomTickLabelProps = (/** tickValue, index */) =>
  ({
    dy: '0.25em',
    fill: '#222',
    fontFamily: 'Arial',
    fontSize: 10,
    textAnchor: 'middle',
  } as const);

export default function AxisBottom<Scale extends AxisScale>({
  axisClassName,
  labelOffset = 8,
  tickLabelProps = bottomTickLabelProps,
  tickLength = 8,
  ...restProps
}: SharedAxisProps<Scale>) {
  return (
    <Axis
      axisClassName={cx('visx-axis-bottom', axisClassName)}
      labelOffset={labelOffset}
      orientation={Orientation.bottom}
      tickLabelProps={tickLabelProps}
      tickLength={tickLength}
      {...restProps}
    />
  );
}
