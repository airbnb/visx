import cx from 'classnames';
import Axis from './Axis';
import Orientation from '../constants/orientation';
import type { SharedAxisProps, AxisScale } from '../types';

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
  const tickLabelPropsFinal =
    typeof tickLabelProps === 'function'
      ? tickLabelProps
      : {
          ...bottomTickLabelProps,
          ...tickLabelProps,
        };

  return (
    <Axis
      axisClassName={cx('visx-axis-bottom', axisClassName)}
      labelOffset={labelOffset}
      orientation={Orientation.bottom}
      tickLabelProps={tickLabelPropsFinal}
      tickLength={tickLength}
      {...restProps}
    />
  );
}
