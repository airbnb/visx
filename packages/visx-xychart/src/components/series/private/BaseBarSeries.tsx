import React, { useContext, useCallback, useMemo } from 'react';
import { AxisScale } from '@visx/axis';
import DataContext from '../../../context/DataContext';
import { BarsProps, SeriesProps } from '../../../types';
import withRegisteredData, { WithRegisteredDataProps } from '../../../enhancers/withRegisteredData';
import getScaledValueFactory from '../../../utils/getScaledValueFactory';
import getScaleBandwidth from '../../../utils/getScaleBandwidth';
import findNearestDatumX from '../../../utils/findNearestDatumX';
import findNearestDatumY from '../../../utils/findNearestDatumY';
import useEventEmitter, { HandlerParams } from '../../../hooks/useEventEmitter';
import TooltipContext from '../../../context/TooltipContext';
import getScaleBaseline from '../../../utils/getScaleBaseline';

export type BaseBarSeriesProps<
  XScale extends AxisScale,
  YScale extends AxisScale,
  Datum extends object
> = SeriesProps<XScale, YScale, Datum> & {
  /** Rendered component which is passed BarsProps by BaseBarSeries after processing. */
  BarsComponent: React.FC<BarsProps<XScale, YScale>>;
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

function BaseBarSeries<XScale extends AxisScale, YScale extends AxisScale, Datum extends object>({
  barPadding = 0.1,
  BarsComponent,
  data,
  dataKey,
  horizontal,
  xAccessor,
  xScale,
  yAccessor,
  yScale,
}: BaseBarSeriesProps<XScale, YScale, Datum> & WithRegisteredDataProps<XScale, YScale, Datum>) {
  const { colorScale, theme, width, height, innerWidth = 0, innerHeight = 0 } = useContext(
    DataContext,
  );
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
    return data.map((datum, index) => {
      const x = getScaledX(datum) + xOffset;
      const y = getScaledY(datum) + yOffset;
      const barLength = horizontal ? x - xZeroPosition : y - yZeroPosition;

      return {
        key: `${index}`,
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
      <BarsComponent bars={bars} horizontal={horizontal} xScale={xScale} yScale={yScale} />
    </g>
  );
}

export default withRegisteredData(BaseBarSeries);
