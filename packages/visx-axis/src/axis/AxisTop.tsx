import cx from 'classnames';
import Axis from './Axis';
import Orientation from '../constants/orientation';
import type { SharedAxisProps, AxisScale } from '../types';

export type AxisTopProps<Scale extends AxisScale> = SharedAxisProps<Scale>;

export const topTickLabelProps = {
  dy: '-0.75em',
  fill: '#222',
  fontFamily: 'Arial',
  fontSize: 10,
  textAnchor: 'middle',
} as const;

export default function AxisTop<Scale extends AxisScale>({
  axisClassName,
  labelOffset = 8,
  tickLength = 8,
  tickLabelProps,
  ...restProps
}: AxisTopProps<Scale>) {
  const tickLabelPropsFinal =
    typeof tickLabelProps === 'function'
      ? tickLabelProps
      : {
          ...topTickLabelProps,
          ...tickLabelProps,
        };
  return (
    <Axis
      axisClassName={cx('visx-axis-top', axisClassName)}
      labelOffset={labelOffset}
      orientation={Orientation.top}
      tickLabelProps={tickLabelPropsFinal}
      tickLength={tickLength}
      {...restProps}
    />
  );
}
