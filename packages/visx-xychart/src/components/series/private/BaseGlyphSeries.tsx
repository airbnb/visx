import { useContext, useEffect, useMemo } from 'react';
import type { ReactNode } from 'react';
import type { AxisScale } from '@visx/axis';
import DataContext from '../../../context/DataContext';
import type { DataContextType, GlyphProps, GlyphsProps, SeriesProps } from '../../../types';
import getScaledValueFactory from '../../../utils/getScaledValueFactory';
import isValidNumber from '../../../typeguards/isValidNumber';
import { GLYPHSERIES_EVENT_SOURCE, XYCHART_EVENT_SOURCE } from '../../../constants';
import useSeriesEvents from '../../../hooks/useSeriesEvents';

export type BaseGlyphSeriesProps<
  XScale extends AxisScale,
  YScale extends AxisScale,
  Datum extends object,
> = SeriesProps<XScale, YScale, Datum> & {
  /** Given a Datum, returns its color. Falls back to theme color if unspecified or if a null-ish value is returned. */
  colorAccessor?: (d: Datum, index: number) => string | null | undefined;
  /** The size of a `Glyph`, a `number` or a function which takes a `Datum` and returns a `number`. */
  size?: number | ((d: Datum) => number);
  /** Function which handles rendering glyphs. */
  renderGlyphs: (glyphsProps: GlyphsProps<XScale, YScale, Datum>) => ReactNode;
};

export function BaseGlyphSeries<
  XScale extends AxisScale,
  YScale extends AxisScale,
  Datum extends object,
>({
  colorAccessor,
  data,
  dataKey,
  onBlur,
  onFocus,
  onPointerMove,
  onPointerOut,
  onPointerUp,
  onPointerDown,
  enableEvents = true,
  renderGlyphs,
  size = 8,
  xAccessor,
  xScale,
  yAccessor,
  yScale,
}: BaseGlyphSeriesProps<XScale, YScale, Datum> &
  Pick<DataContextType<XScale, YScale, Datum>, 'xScale' | 'yScale'>) {
  const { colorScale, theme, horizontal } = useContext(DataContext);
  const getScaledX = useMemo(() => getScaledValueFactory(xScale, xAccessor), [xScale, xAccessor]);
  const getScaledY = useMemo(() => getScaledValueFactory(yScale, yAccessor), [yScale, yAccessor]);
  const color = colorScale?.(dataKey) ?? theme?.colors?.[0] ?? '#222';

  const ownEventSourceKey = `${GLYPHSERIES_EVENT_SOURCE}-${dataKey}`;
  const eventEmitters = useSeriesEvents<XScale, YScale, Datum>({
    dataKey,
    enableEvents,
    onBlur,
    onFocus,
    onPointerMove,
    onPointerOut,
    onPointerUp,
    onPointerDown,
    source: ownEventSourceKey,
    allowedSources: [XYCHART_EVENT_SOURCE, ownEventSourceKey],
  });

  const glyphs = useMemo(
    () =>
      data
        .map((datum, i) => {
          const x = getScaledX(datum);
          if (!isValidNumber(x)) return null;
          const y = getScaledY(datum);
          if (!isValidNumber(y)) return null;
          return {
            key: `${i}`,
            x,
            y,
            color: colorAccessor?.(datum, i) ?? color,
            size: typeof size === 'function' ? size(datum) : size,
            datum,
          };
        })
        .filter((point) => point) as GlyphProps<Datum>[],
    [color, colorAccessor, data, getScaledX, getScaledY, size],
  );

  return <>{renderGlyphs({ glyphs, xScale, yScale, horizontal, ...eventEmitters })}</>;
}

export default function BaseGlyphSeriesWithRegisteredData<
  XScale extends AxisScale,
  YScale extends AxisScale,
  Datum extends object,
>(props: BaseGlyphSeriesProps<XScale, YScale, Datum>) {
  const { dataKey, data, xAccessor, yAccessor } = props;
  const { xScale, yScale, dataRegistry } = useContext(DataContext) as unknown as DataContextType<
    XScale,
    YScale,
    Datum
  >;

  useEffect(() => {
    if (dataRegistry) dataRegistry.registerData({ key: dataKey, data, xAccessor, yAccessor });
    return () => dataRegistry?.unregisterData(dataKey);
  }, [dataRegistry, dataKey, data, xAccessor, yAccessor]);

  const registryEntry = dataRegistry?.get(dataKey);

  // if scales or data are not available in context, render nothing
  if (!xScale || !yScale || !registryEntry) return null;

  // otherwise pass props + over-write data/accessors
  return (
    <BaseGlyphSeries
      {...props}
      xScale={xScale}
      yScale={yScale}
      data={registryEntry.data}
      xAccessor={registryEntry.xAccessor}
      yAccessor={registryEntry.yAccessor}
    />
  );
}
