import React, { useContext, useCallback, useMemo } from 'react';
import { AxisScale } from '@visx/axis';
import DataContext from '../../context/DataContext';
import { SeriesProps } from '../../types';
import withRegisteredData, { WithRegisteredDataProps } from '../../enhancers/withRegisteredData';
import getScaledValueFactory from '../../utils/getScaledValueFactory';
import isValidNumber from '../../typeguards/isValidNumber';
import getScaleBandwidth from '../../utils/getScaleBandwidth';

type BarSeriesProps<
  XScale extends AxisScale,
  YScale extends AxisScale,
  Datum extends object
> = SeriesProps<XScale, YScale, Datum> & {
  /** Whether bars should be rendered horizontally instead of vertically. */
  horizontal?: boolean;
  /**
   * Specify bar padding when bar thickness does not come from a `band` scale.
   * Accepted values are [0, 1], 0 = no padding, 1 = no bar, defaults to 0.1.
   */
  barPadding?: number;
};

function BarSeries<XScale extends AxisScale, YScale extends AxisScale, Datum extends object>({
  barPadding = 0.9,
  data,
  dataKey,
  horizontal,
  xAccessor,
  xScale,
  yAccessor,
  yScale,
}: BarSeriesProps<XScale, YScale, Datum> & WithRegisteredDataProps<XScale, YScale, Datum>) {
  const { colorScale, theme, innerWidth = 0, innerHeight = 0 } = useContext(DataContext);
  const getScaledX = useCallback(getScaledValueFactory(xScale, xAccessor), [xScale, xAccessor]);
  const getScaledY = useCallback(getScaledValueFactory(yScale, yAccessor), [yScale, yAccessor]);
  const [xMin, xMax] = xScale.range().map(Number);
  const [yMax, yMin] = yScale.range().map(Number);

  const scaleBandwidth = getScaleBandwidth(horizontal ? yScale : xScale);
  const barThicknessFraction = scaleBandwidth
    ? 1 // if scale has bandwidth, padding comes from scale config
    : // clamp padding to [0, 1], bar width = (1-padding) * availableSpace
      1 - Math.min(1, Math.max(0, barPadding));
  const barThickness =
    barThicknessFraction *
    (scaleBandwidth ||
      // non-bandwidth estimate assumes no missing data values
      (horizontal ? innerHeight : innerWidth) / data.length);

  // try to figure out the 0 baseline for correct rendering of negative values
  // we aren't sure if these are numeric scales or not a priori
  const maybeXZero = xScale(0);
  const maybeYZero = yScale(0);
  const xZeroPosition = isValidNumber(maybeXZero)
    ? // if maybeXZero _is_ a number, but the scale is not clamped and it's outside the domain
      // fallback to the scale's minimum
      Math.max(maybeXZero, Math.min(xMin, xMax))
    : Math.min(xMin, xMax);
  const yZeroPosition = isValidNumber(maybeYZero)
    ? Math.min(maybeYZero, Math.max(yMin, yMax))
    : Math.max(yMin, yMax);

  const color = colorScale?.(dataKey) ?? theme?.colors?.[0] ?? '#222';

  const bars = useMemo(
    () =>
      data.map(datum => {
        const x = getScaledX(datum) - (scaleBandwidth || horizontal ? 0 : barThickness / 2);
        const y = getScaledY(datum) - (scaleBandwidth || !horizontal ? 0 : barThickness / 2);
        const barLength = horizontal ? x - xZeroPosition : y - yZeroPosition;

        return {
          x: horizontal ? xZeroPosition + Math.min(0, barLength) : x,
          y: horizontal ? y : yZeroPosition + Math.min(0, barLength),
          width: horizontal ? Math.abs(barLength) : barThickness,
          height: horizontal ? barThickness : Math.abs(barLength),
          fill: color, // @TODO allow prop overriding
        };
      }),
    [
      barThickness,
      scaleBandwidth,
      color,
      data,
      getScaledX,
      getScaledY,
      horizontal,
      xZeroPosition,
      yZeroPosition,
    ],
  );

  return (
    <g className="vx-bar-series">
      {bars.map(({ x, y, width, height, fill }, i) => (
        <rect key={i} x={x} y={y} width={width} height={height} fill={fill} />
      ))}
    </g>
  );
}

export default withRegisteredData(BarSeries);
