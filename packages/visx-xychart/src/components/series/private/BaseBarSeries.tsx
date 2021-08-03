import React, { useContext, useCallback, useMemo } from 'react';
import { AxisScale } from '@visx/axis';
import DataContext from '../../../context/DataContext';
import { Bar, BarsProps, SeriesProps } from '../../../types';
import withRegisteredData, { WithRegisteredDataProps } from '../../../enhancers/withRegisteredData';
import getScaledValueFactory from '../../../utils/getScaledValueFactory';
import getScaleBandwidth from '../../../utils/getScaleBandwidth';
import getScaleBaseline from '../../../utils/getScaleBaseline';
import isValidNumber from '../../../typeguards/isValidNumber';
import { BARSERIES_EVENT_SOURCE, XYCHART_EVENT_SOURCE } from '../../../constants';
import useSeriesEvents from '../../../hooks/useSeriesEvents';

export type BaseBarSeriesProps<
  XScale extends AxisScale,
  YScale extends AxisScale,
  Datum extends object,
> = SeriesProps<XScale, YScale, Datum> & {
  /** Rendered component which is passed BarsProps by BaseBarSeries after processing. */
  BarsComponent: React.FC<BarsProps<XScale, YScale>>;
  /**
   * Specify bar padding when bar thickness does not come from a `band` scale.
   * Accepted values are [0, 1], 0 = no padding, 1 = no bar, defaults to 0.1.
   */
  barPadding?: number;
  /** Given a Datum, returns its color. Falls back to theme color if unspecified or if a null-ish value is returned. */
  colorAccessor?: (d: Datum, index: number) => string | null | undefined;
};

// Fallback bandwidth estimate assumes no missing data values (divides chart space by # datum)
const getFallbackBandwidth = (fullBarWidth: number, barPadding: number) =>
  // clamp padding to [0, 1], bar thickness = (1-padding) * availableSpace
  fullBarWidth * (1 - Math.min(1, Math.max(0, barPadding)));

function BaseBarSeries<XScale extends AxisScale, YScale extends AxisScale, Datum extends object>({
  BarsComponent,
  barPadding = 0.1,
  colorAccessor,
  data,
  dataKey,
  onBlur,
  onFocus,
  onPointerMove,
  onPointerOut,
  onPointerUp,
  enableEvents = true,
  xAccessor,
  xScale,
  yAccessor,
  yScale,
}: BaseBarSeriesProps<XScale, YScale, Datum> & WithRegisteredDataProps<XScale, YScale, Datum>) {
  const {
    colorScale,
    horizontal,
    theme,
    innerWidth = 0,
    innerHeight = 0,
  } = useContext(DataContext);
  const getScaledX = useCallback(getScaledValueFactory(xScale, xAccessor), [xScale, xAccessor]);
  const getScaledY = useCallback(getScaledValueFactory(yScale, yAccessor), [yScale, yAccessor]);
  const scaleBandwidth = getScaleBandwidth(horizontal ? yScale : xScale);
  const barThickness =
    scaleBandwidth ||
    getFallbackBandwidth((horizontal ? innerHeight : innerWidth) / data.length, barPadding);

  const xZeroPosition = useMemo(() => (xScale ? getScaleBaseline(xScale) : 0), [xScale]);
  const yZeroPosition = useMemo(() => (yScale ? getScaleBaseline(yScale) : 0), [yScale]);

  const color = colorScale?.(dataKey) ?? theme?.colors?.[0] ?? '#222';

  const bars = useMemo(() => {
    const xOffset = horizontal ? 0 : -barThickness / 2;
    const yOffset = horizontal ? -barThickness / 2 : 0;
    return data
      .map((datum, index) => {
        const x = getScaledX(datum) + xOffset;
        if (!isValidNumber(x)) return null;
        const y = getScaledY(datum) + yOffset;
        if (!isValidNumber(y)) return null;
        const barLength = horizontal ? x - xZeroPosition : y - yZeroPosition;
        if (!isValidNumber(barLength)) return null;

        return {
          key: `${index}`,
          x: horizontal ? xZeroPosition + Math.min(0, barLength) : x,
          y: horizontal ? y : yZeroPosition + Math.min(0, barLength),
          width: horizontal ? Math.abs(barLength) : barThickness,
          height: horizontal ? barThickness : Math.abs(barLength),
          fill: colorAccessor?.(datum, index) ?? color,
        };
      })
      .filter((bar) => bar) as Bar[];
  }, [
    barThickness,
    color,
    colorAccessor,
    data,
    getScaledX,
    getScaledY,
    horizontal,
    xZeroPosition,
    yZeroPosition,
  ]);

  const ownEventSourceKey = `${BARSERIES_EVENT_SOURCE}-${dataKey}`;
  const eventEmitters = useSeriesEvents<XScale, YScale, Datum>({
    dataKey,
    enableEvents,
    onBlur,
    onFocus,
    onPointerMove,
    onPointerOut,
    onPointerUp,
    source: ownEventSourceKey,
    allowedSources: [XYCHART_EVENT_SOURCE, ownEventSourceKey],
  });

  return (
    <g className="vx-bar-series">
      <BarsComponent
        bars={bars}
        horizontal={horizontal}
        xScale={xScale}
        yScale={yScale}
        {...eventEmitters}
      />
    </g>
  );
}

export default withRegisteredData(BaseBarSeries);
