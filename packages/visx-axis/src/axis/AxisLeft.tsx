import cx from 'classnames';
import Axis from './Axis';
import Orientation from '../constants/orientation';
import type { SharedAxisProps, AxisScale } from '../types';

export const leftTickLabelProps = {
  dx: '-0.25em',
  dy: '0.25em',
  fill: '#222',
  fontFamily: 'Arial',
  fontSize: 10,
  textAnchor: 'end',
} as const;

export default function AxisLeft<Scale extends AxisScale>({
  axisClassName,
  labelOffset = 36,
  tickLength = 8,
  tickLabelProps,
  ...restProps
}: SharedAxisProps<Scale>) {
  const tickLabelPropsFinal =
    typeof tickLabelProps === 'function'
      ? tickLabelProps
      : {
          ...leftTickLabelProps,
          ...tickLabelProps,
        };
  return (
    <Axis
      axisClassName={cx('visx-axis-left', axisClassName)}
      labelOffset={labelOffset}
      orientation={Orientation.left}
      tickLabelProps={tickLabelPropsFinal}
      tickLength={tickLength}
      {...restProps}
    />
  );
}
