import React, { useContext, useCallback, useMemo } from 'react';
import { AxisScale } from '@visx/axis';
import DataContext from '../../../context/DataContext';
import { SeriesProps } from '../../../types';
import withRegisteredData, { WithRegisteredDataProps } from '../../../enhancers/withRegisteredData';
import getScaledValueFactory from '../../../utils/getScaledValueFactory';
import useEventEmitter, { HandlerParams } from '../../../hooks/useEventEmitter';
import findNearestDatumX from '../../../utils/findNearestDatumX';
import TooltipContext from '../../../context/TooltipContext';
import findNearestDatumY from '../../../utils/findNearestDatumY';
import isValidNumber from '../../../typeguards/isValidNumber';

export type BaseGlyphSeriesProps<
  XScale extends AxisScale,
  YScale extends AxisScale,
  Datum extends object
> = SeriesProps<XScale, YScale, Datum> & {
  /** Whether line should be rendered horizontally instead of vertically. */
  horizontal?: boolean;
  /** The size of a `Glyph`, a `number` or a function which takes a `Datum` and returns a `number`. */
  size?: number | ((d: Datum) => number);
  renderGlyphs: (glyphs: GlyphProps<Datum>[]) => React.ReactNode;
};

export type GlyphProps<Datum extends object> = {
  key: string;
  datum: Datum;
  index: number;
  x: number;
  y: number;
  size: number;
  color: string;
};

function BaseGlyphSeries<XScale extends AxisScale, YScale extends AxisScale, Datum extends object>({
  data,
  dataKey,
  xAccessor,
  xScale,
  yAccessor,
  yScale,
  horizontal,
  size = 8,
  renderGlyphs,
}: BaseGlyphSeriesProps<XScale, YScale, Datum> & WithRegisteredDataProps<XScale, YScale, Datum>) {
  const { colorScale, theme, width, height } = useContext(DataContext);
  const { showTooltip, hideTooltip } = useContext(TooltipContext) ?? {};
  const getScaledX = useCallback(getScaledValueFactory(xScale, xAccessor), [xScale, xAccessor]);
  const getScaledY = useCallback(getScaledValueFactory(yScale, yAccessor), [yScale, yAccessor]);
  const color = colorScale?.(dataKey) ?? theme?.colors?.[0] ?? '#222';

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
    [dataKey, data, xScale, yScale, xAccessor, yAccessor, width, height, showTooltip, horizontal],
  );
  useEventEmitter('mousemove', handleMouseMove);
  useEventEmitter('mouseout', hideTooltip);

  const points = useMemo(
    () =>
      data
        .map(d => {
          const x = getScaledX(d);
          if (!isValidNumber(x)) return null;
          const y = getScaledY(d);
          if (!isValidNumber(y)) return null;
          return {
            key: `${horizontal ? y : x}`,
            x,
            y,
            color,
            size: typeof size === 'function' ? size(d) : size,
          };
        })
        .filter(point => point) as GlyphProps<Datum>[],
    [getScaledX, getScaledY, data, size, color, horizontal],
  );

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>{renderGlyphs(points)}</>
  );
}

export default withRegisteredData(BaseGlyphSeries);
