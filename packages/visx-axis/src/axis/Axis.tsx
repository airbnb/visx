import cx from 'classnames';
import { Group } from '@visx/group';
import type { SharedAxisProps, AxisScale } from '../types';
import AxisRenderer from './AxisRenderer';
import type { OrientationType } from '../constants/orientation';
import Orientation from '../constants/orientation';
import useAxis from '../react/useAxis';

export type AxisProps<Scale extends AxisScale> = SharedAxisProps<Scale> & {
  orientation?: OrientationType;
};

export default function Axis<Scale extends AxisScale>({
  children = AxisRenderer,
  axisClassName,
  hideAxisLine = false,
  hideTicks = false,
  hideZero = false,
  innerRef,
  left = 0,
  numTicks = 10,
  orientation = Orientation.bottom,
  rangePadding = 0,
  scale,
  tickFormat,
  tickLength = 8,
  tickValues,
  top = 0,
  ...restProps
}: AxisProps<Scale>) {
  const axis = useAxis({
    ...restProps,
    hideAxisLine,
    hideTicks,
    hideZero,
    numTicks,
    orientation,
    rangePadding,
    scale,
    tickFormat,
    tickLength,
    tickValues,
  });

  return (
    <Group className={cx('visx-axis', axisClassName)} innerRef={innerRef} top={top} left={left}>
      {children(axis)}
    </Group>
  );
}
