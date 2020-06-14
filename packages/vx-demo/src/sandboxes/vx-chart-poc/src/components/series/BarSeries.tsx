import React, { useContext, useCallback } from 'react';
import { animated, useSprings } from 'react-spring';
import ChartContext from '../../context/ChartContext';
import { ChartContext as ChartContextType, SeriesProps } from '../../types';
import withRegisteredData from '../../enhancers/withRegisteredData';
import isValidNumber from '../../typeguards/isValidNumber';
import useRegisteredData from '../../hooks/useRegisteredData';

type BarSeriesProps<Datum, XScaleInput, YScaleInput> = SeriesProps<
  Datum,
  XScaleInput,
  YScaleInput
> & {
  /** Whether bars should be rendered horizontally instead of vertically. */
  horizontal?: boolean;
  /** Specify bar thickness, useful when not using a 'band' scale. Defaults to `scale.bandwidth()` if available, else `available size / data.length` */
  barThickness?: number;
} & Omit<React.SVGProps<SVGRectElement>, 'x' | 'y' | 'width' | 'height' | 'ref'>;

function BarSeries<Datum = unknown, XScaleInput = unknown, YScaleInput = unknown>({
  dataKey,
  data: _,
  xAccessor: __,
  yAccessor: ___,
  mouseEvents,
  horizontal,
  barThickness: barThicknessProp,
  ...barProps
}: BarSeriesProps<Datum, XScaleInput, YScaleInput>) {
  const { theme, colorScale, xScale, yScale } = useContext(ChartContext) as ChartContextType<
    Datum,
    XScaleInput,
    YScaleInput
  >;
  const { data, xAccessor, yAccessor } = useRegisteredData<Datum, XScaleInput, YScaleInput>(
    dataKey,
  );
  const getScaledX = useCallback((d: Datum) => xScale(xAccessor(d)), [xScale, xAccessor]);
  const getScaledY = useCallback((d: Datum) => yScale(yAccessor(d)), [yScale, yAccessor]);

  const [xMin, xMax] = xScale.range() as number[];
  const [yMax, yMin] = yScale.range() as number[];
  const innerWidth = Math.abs(xMax - xMin);
  const innerHeight = Math.abs(yMax - yMin);
  const barThickness: number =
    barThicknessProp ||
    (horizontal
      ? // non-bandwidth estimate assumes no missing data values
        yScale.bandwidth?.() ?? innerHeight / data.length
      : xScale.bandwidth?.() ?? innerWidth / data.length);

  // try to figure out the 0 baseline for correct rendering of negative values
  // we aren't sure if these are numeric scales or not a priori
  // @ts-ignore
  const maybeXZero = xScale(0);
  // @ts-ignore
  const maybeYZero = yScale(0);

  const xZeroPosition = isValidNumber(maybeXZero)
    ? // if maybeXZero _is_ a number, but the scale is not clamped and it's outside the domain
      // fallback to the scale's minimum
      (Math.max(maybeXZero, Math.min(xMin, xMax)) as number)
    : Math.min(xMin, xMax);
  const yZeroPosition = isValidNumber(maybeYZero)
    ? (Math.min(maybeYZero, Math.max(yMin, yMax)) as number)
    : Math.max(yMin, yMax);

  const animatedBars = useSprings(
    data.length,
    data.map(datum => {
      const x = getScaledX(datum);
      const y = getScaledY(datum);
      const barLength = horizontal ? x - xZeroPosition : y - yZeroPosition;

      return {
        x: horizontal ? xZeroPosition + Math.min(0, barLength) : x,
        y: horizontal ? y : yZeroPosition + Math.min(0, barLength),
        width: horizontal ? Math.abs(barLength) : barThickness,
        height: horizontal ? barThickness : Math.abs(barLength),
      };
    }),
  ) as { x: number; y: number; width: number; height: number }[];

  return (
    <g className="vx-chart bar-series">
      {animatedBars.map(({ x, y, width, height }, i) => (
        <animated.rect
          key={i}
          x={x}
          y={y}
          width={width}
          height={height}
          fill={colorScale(dataKey)}
          stroke={theme.baseColor ?? 'white'}
          {...barProps}
        />
      ))}
    </g>
  );
}

export default withRegisteredData(BarSeries);
