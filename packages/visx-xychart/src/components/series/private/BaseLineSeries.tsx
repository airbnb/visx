import React, { useContext, useCallback } from 'react';
import LinePath, { LinePathProps } from '@visx/shape/lib/shapes/LinePath';
import { AxisScale } from '@visx/axis';
import DataContext from '../../../context/DataContext';
import { EventHandlerParams, GlyphsProps, SeriesProps, TooltipContextType } from '../../../types';
import withRegisteredData, { WithRegisteredDataProps } from '../../../enhancers/withRegisteredData';
import getScaledValueFactory from '../../../utils/getScaledValueFactory';
import TooltipContext from '../../../context/TooltipContext';
import isValidNumber from '../../../typeguards/isValidNumber';
import { LINESERIES_EVENT_SOURCE, XYCHART_EVENT_SOURCE } from '../../../constants';
import usePointerEventEmitters from '../../../hooks/usePointerEventEmitters';
import usePointerEventHandlers from '../../../hooks/usePointerEventHandlers';
import { BaseGlyphSeries } from './BaseGlyphSeries';
import defaultRenderGlyph from './defaultRenderGlyph';

export type BaseLineSeriesProps<
  XScale extends AxisScale,
  YScale extends AxisScale,
  Datum extends object
> = SeriesProps<XScale, YScale, Datum> & {
  /** Rendered component which is passed path props by BaseLineSeries after processing. */
  PathComponent?: React.FC<Omit<React.SVGProps<SVGPathElement>, 'ref'>> | 'path';
  /** Sets the curve factory (from @visx/curve or d3-curve) for the line generator. Defaults to curveLinear. */
  curve?: LinePathProps<Datum>['curve'];
} & Omit<React.SVGProps<SVGPathElement>, 'x' | 'y' | 'x0' | 'x1' | 'y0' | 'y1' | 'ref'>;

function BaseLineSeries<XScale extends AxisScale, YScale extends AxisScale, Datum extends object>({
  curve,
  data,
  dataKey,
  onBlur: onBlurProps,
  onFocus: onFocusProps,
  onPointerMove: onPointerMoveProps,
  onPointerOut: onPointerOutProps,
  onPointerUp: onPointerUpProps,
  enableEvents = true,
  xAccessor,
  xScale,
  yAccessor,
  yScale,
  PathComponent = 'path',
  ...lineProps
}: BaseLineSeriesProps<XScale, YScale, Datum> & WithRegisteredDataProps<XScale, YScale, Datum>) {
  const { colorScale, theme } = useContext(DataContext);
  const getScaledX = useCallback(getScaledValueFactory(xScale, xAccessor), [xScale, xAccessor]);
  const getScaledY = useCallback(getScaledValueFactory(yScale, yAccessor), [yScale, yAccessor]);
  const isDefined = useCallback(
    (d: Datum) => isValidNumber(xScale(xAccessor(d))) && isValidNumber(yScale(yAccessor(d))),
    [xScale, xAccessor, yScale, yAccessor],
  );
  const color = colorScale?.(dataKey) ?? theme?.colors?.[0] ?? '#222';

  const { showTooltip, hideTooltip } = (useContext(TooltipContext) ?? {}) as TooltipContextType<
    Datum
  >;
  const onPointerMove = useCallback(
    (p: EventHandlerParams<Datum>) => {
      showTooltip(p);
      if (onPointerMoveProps) onPointerMoveProps(p);
    },
    [showTooltip, onPointerMoveProps],
  );
  const onFocus = useCallback(
    (p: EventHandlerParams<Datum>) => {
      showTooltip(p);
      if (onFocusProps) onFocusProps(p);
    },
    [showTooltip, onFocusProps],
  );
  const onPointerOut = useCallback(
    (event: React.PointerEvent) => {
      hideTooltip();
      if (onPointerOutProps) onPointerOutProps(event);
    },
    [hideTooltip, onPointerOutProps],
  );
  const onBlur = useCallback(
    (event: React.FocusEvent) => {
      hideTooltip();
      if (event && onBlurProps) onBlurProps(event);
    },
    [hideTooltip, onBlurProps],
  );
  const ownEventSourceKey = `${LINESERIES_EVENT_SOURCE}-${dataKey}`;
  const pointerEventEmitters = usePointerEventEmitters({
    source: ownEventSourceKey,
    onBlur: !!onBlurProps && enableEvents,
    onFocus: !!onFocusProps && enableEvents,
    onPointerMove: !!onPointerMoveProps && enableEvents,
    onPointerOut: !!onPointerOutProps && enableEvents,
    onPointerUp: !!onPointerUpProps && enableEvents,
  });
  usePointerEventHandlers<Datum>({
    dataKey,
    onBlur: enableEvents ? onBlur : undefined,
    onFocus: enableEvents ? onFocus : undefined,
    onPointerMove: enableEvents ? onPointerMove : undefined,
    onPointerOut: enableEvents ? onPointerOut : undefined,
    onPointerUp: enableEvents ? onPointerUpProps : undefined,
    sources: [XYCHART_EVENT_SOURCE, ownEventSourceKey],
  });

  // render invisible glyphs for focusing if onFocus/onBlur are defined
  const renderGlyphs = useCallback(
    ({ glyphs }: GlyphsProps<XScale, YScale, Datum>) =>
      pointerEventEmitters.onFocus || pointerEventEmitters.onBlur
        ? glyphs.map(glyph => (
            <React.Fragment key={glyph.key}>
              {defaultRenderGlyph({
                ...glyph,
                color: 'transparent',
                onFocus: pointerEventEmitters.onFocus,
                onBlur: pointerEventEmitters.onBlur,
              })}
            </React.Fragment>
          ))
        : null,
    [pointerEventEmitters.onFocus, pointerEventEmitters.onBlur],
  );

  return (
    <>
      <LinePath x={getScaledX} y={getScaledY} defined={isDefined} curve={curve} {...lineProps}>
        {({ path }) => (
          <PathComponent
            stroke={color}
            strokeWidth={2}
            fill="transparent"
            {...lineProps}
            d={path(data) || ''}
            {...pointerEventEmitters}
          />
        )}
      </LinePath>
      {(onFocusProps || onBlurProps) && (
        <BaseGlyphSeries
          dataKey={dataKey}
          data={data}
          xAccessor={xAccessor}
          yAccessor={yAccessor}
          xScale={xScale}
          yScale={yScale}
          renderGlyphs={renderGlyphs}
        />
      )}
    </>
  );
}

export default withRegisteredData(BaseLineSeries);
