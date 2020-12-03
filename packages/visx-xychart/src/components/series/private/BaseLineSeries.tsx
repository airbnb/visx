import React, { useContext, useCallback } from 'react';
import LinePath, { LinePathProps } from '@visx/shape/lib/shapes/LinePath';
import { AxisScale } from '@visx/axis';
import DataContext from '../../../context/DataContext';
import { PointerEventParams, SeriesProps, TooltipContextType } from '../../../types';
import withRegisteredData, { WithRegisteredDataProps } from '../../../enhancers/withRegisteredData';
import getScaledValueFactory from '../../../utils/getScaledValueFactory';
import TooltipContext from '../../../context/TooltipContext';
import isValidNumber from '../../../typeguards/isValidNumber';
import { LINESERIES_EVENT_SOURCE, XYCHART_EVENT_SOURCE } from '../../../constants';
import usePointerEventEmitters from '../../../hooks/usePointerEventEmitters';
import usePointerEventHandlers from '../../../hooks/usePointerEventHandlers';

export type BaseLineSeriesProps<
  XScale extends AxisScale,
  YScale extends AxisScale,
  Datum extends object
> = SeriesProps<XScale, YScale, Datum> & {
  /** Rendered component which is passed path props by BaseLineSeries after processing. */
  PathComponent?: React.FC<Omit<React.SVGProps<SVGPathElement>, 'ref'>> | 'path';
  /** Sets the curve factory (from @visx/curve or d3-curve) for the line generator. Defaults to curveLinear. */
  curve?: LinePathProps<Datum>['curve'];
} & Omit<
    React.SVGProps<SVGPathElement>,
    'x' | 'y' | 'x0' | 'x1' | 'y0' | 'y1' | 'ref' | 'pointerEvents'
  >;

function BaseLineSeries<XScale extends AxisScale, YScale extends AxisScale, Datum extends object>({
  curve,
  data,
  dataKey,
  onPointerMove: onPointerMoveProps,
  onPointerOut: onPointerOutProps,
  onPointerUp: onPointerUpProps,
  pointerEvents = true,
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
    (p: PointerEventParams<Datum>) => {
      showTooltip(p);
      if (onPointerMoveProps) onPointerMoveProps(p);
    },
    [showTooltip, onPointerMoveProps],
  );
  const onPointerOut = useCallback(
    (event: React.PointerEvent) => {
      hideTooltip();
      if (onPointerOutProps) onPointerOutProps(event);
    },
    [hideTooltip, onPointerOutProps],
  );
  const ownEventSourceKey = `${LINESERIES_EVENT_SOURCE}-${dataKey}`;
  const pointerEventEmitters = usePointerEventEmitters({
    source: ownEventSourceKey,
    onPointerMove: !!onPointerMoveProps && pointerEvents,
    onPointerOut: !!onPointerOutProps && pointerEvents,
    onPointerUp: !!onPointerUpProps && pointerEvents,
  });
  usePointerEventHandlers<Datum>({
    dataKey,
    onPointerMove: pointerEvents ? onPointerMove : undefined,
    onPointerOut: pointerEvents ? onPointerOut : undefined,
    onPointerUp: pointerEvents ? onPointerUpProps : undefined,
    sources: [XYCHART_EVENT_SOURCE, ownEventSourceKey],
  });

  return (
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
  );
}

export default withRegisteredData(BaseLineSeries);
