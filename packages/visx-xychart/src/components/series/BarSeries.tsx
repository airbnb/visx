import React, { useContext, useCallback, useMemo } from 'react';
import { AxisScale } from '@visx/axis';
import DataContext from '../../context/DataContext';
import { SeriesProps } from '../../types';
import withRegisteredData, { WithRegisteredDataProps } from '../../enhancers/withRegisteredData';
import getScaledValueFactory from '../../utils/getScaledValueFactory';
import isValidNumber from '../../typeguards/isValidNumber';
import getScaleBandwidth from '../../utils/getScaleBandwidth';
import findNearestDatumX from '../../utils/findNearestDatumX';
import findNearestDatumY from '../../utils/findNearestDatumY';
import useEventEmitter, { HandlerParams } from '../../hooks/useEventEmitter';
import TooltipContext from '../../context/TooltipContext';

export type BarSeriesProps<
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

// Fallback bandwidth estimate assumes no missing data values (divides chart space by # datum)
const getFallbackBandwidth = (fullBarWidth: number, barPadding: number) =>
  // clamp padding to [0, 1], bar thickness = (1-padding) * availableSpace
  fullBarWidth * (1 - Math.min(1, Math.max(0, barPadding)));

function BarSeries<XScale extends AxisScale, YScale extends AxisScale, Datum extends object>({
  barPadding = 0.1,
  data,
  dataKey,
  horizontal,
  xAccessor,
  xScale,
  yAccessor,
  yScale,
}: BarSeriesProps<XScale, YScale, Datum> & WithRegisteredDataProps<XScale, YScale, Datum>) {
  const { colorScale, theme, width, height, innerWidth = 0, innerHeight = 0 } = useContext(
    DataContext,
  );
  const getScaledX = useCallback(getScaledValueFactory(xScale, xAccessor), [xScale, xAccessor]);
  const getScaledY = useCallback(getScaledValueFactory(yScale, yAccessor), [yScale, yAccessor]);
  const [xMin, xMax] = xScale.range().map(Number);
  const [yMax, yMin] = yScale.range().map(Number);

  const scaleBandwidth = getScaleBandwidth(horizontal ? yScale : xScale);
  const barThickness =
    scaleBandwidth ||
    getFallbackBandwidth((horizontal ? innerHeight : innerWidth) / data.length, barPadding);

  // try to figure out the 0 baseline for correct rendering of negative values
  // we aren't sure if these are numeric scales or not ahead of time
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

  const bars = useMemo(() => {
    const xOffset = horizontal ? 0 : -barThickness / 2;
    const yOffset = horizontal ? -barThickness / 2 : 0;
    return data.map(datum => {
      const x = getScaledX(datum) + xOffset;
      const y = getScaledY(datum) + yOffset;
      const barLength = horizontal ? x - xZeroPosition : y - yZeroPosition;

      return {
        x: horizontal ? xZeroPosition + Math.min(0, barLength) : x,
        y: horizontal ? y : yZeroPosition + Math.min(0, barLength),
        width: horizontal ? Math.abs(barLength) : barThickness,
        height: horizontal ? barThickness : Math.abs(barLength),
        fill: color, // @TODO allow prop overriding
      };
    });
  }, [barThickness, color, data, getScaledX, getScaledY, horizontal, xZeroPosition, yZeroPosition]);

  const { showTooltip, hideTooltip } = useContext(TooltipContext) ?? {};
  const handleMouseMove = useCallback(
    (params?: HandlerParams) => {
      const { svgPoint } = params || {};
      if (svgPoint && width && height && showTooltip) {
        const datum = (horizontal ? findNearestDatumY : findNearestDatumX)({
          point: svgPoint,
          data,
          xScale,
          yScale,
          xAccessor,
          yAccessor,
          width,
          height,
        });
        if (datum) {
          showTooltip({
            key: dataKey,
            ...datum,
            svgPoint,
          });
        }
      }
    },
    [dataKey, data, horizontal, xScale, yScale, xAccessor, yAccessor, width, height, showTooltip],
  );
  useEventEmitter('mousemove', handleMouseMove);
  useEventEmitter('mouseout', hideTooltip);

  return (
    <g className="vx-bar-series">
      {bars.map(({ x, y, width: barWidth, height: barHeight, fill }, i) => (
        <rect key={i} x={x} y={y} width={barWidth} height={barHeight} fill={fill} />
      ))}
    </g>
  );
}

export default withRegisteredData(BarSeries);
