import { getTicks, coerceNumber } from '@visx/scale';
import type { ScaleInput } from '@visx/scale';
import type { AxisRendererProps, AxisScale, CommonProps } from '../types';
import getTickPosition from '../utils/getTickPosition';
import getTickFormatter from '../utils/getTickFormatter';
import createPoint from '../utils/createPoint';
import type { OrientationType } from '../constants/orientation';
import Orientation from '../constants/orientation';
import getAxisRangePaddingConfig from '../utils/getAxisRangePaddingConfig';

export type UseAxisOptions<Scale extends AxisScale> = CommonProps<Scale> & {
  /** Placement of the axis. */
  orientation?: OrientationType;
  /** A d3 or visx scale function. */
  scale: Scale;
  /** Values that determine the number and value of ticks. */
  tickValues?: ScaleInput<Scale>[];
};

export default function useAxis<Scale extends AxisScale>({
  hideAxisLine = false,
  hideTicks = false,
  hideZero = false,
  numTicks = 10,
  orientation = Orientation.bottom,
  rangePadding = 0,
  scale,
  tickFormat,
  tickLength = 8,
  tickValues,
  ...restProps
}: UseAxisOptions<Scale>): AxisRendererProps<Scale> {
  const format = tickFormat ?? getTickFormatter(scale);

  const isLeft = orientation === Orientation.left;
  const isTop = orientation === Orientation.top;
  const horizontal = isTop || orientation === Orientation.bottom;

  const tickPosition = getTickPosition(scale);
  const tickSign = isLeft || isTop ? -1 : 1;

  const range = scale.range();
  const rangePaddingConfig = getAxisRangePaddingConfig(rangePadding);

  const axisFromPoint = createPoint(
    { x: Number(range[0]) + 0.5 - rangePaddingConfig.start, y: 0 },
    horizontal,
  );
  const axisToPoint = createPoint(
    { x: Number(range[range.length - 1]) + 0.5 + rangePaddingConfig.end, y: 0 },
    horizontal,
  );

  const filteredTickValues = (tickValues ?? getTicks(scale, numTicks))
    .filter((value) => !hideZero || (value !== 0 && value !== '0'))
    .map((value, index) => ({ value, index }));

  const ticks = filteredTickValues.map(({ value, index }) => {
    const scaledValue = coerceNumber(tickPosition(value));

    return {
      value,
      index,
      from: createPoint({ x: scaledValue, y: 0 }, horizontal),
      to: createPoint({ x: scaledValue, y: tickLength * tickSign }, horizontal),
      formattedValue: format(value, index, filteredTickValues),
    };
  });

  return {
    ...restProps,
    axisFromPoint,
    axisToPoint,
    hideAxisLine,
    hideTicks,
    hideZero,
    horizontal,
    numTicks,
    orientation,
    rangePadding,
    scale,
    tickFormat: format,
    tickLength,
    tickPosition,
    tickSign,
    ticks,
  };
}
