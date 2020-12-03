import React, { useContext, useCallback, useMemo } from 'react';
import { AxisScale } from '@visx/axis';
import Area, { AreaProps } from '@visx/shape/lib/shapes/Area';
import LinePath, { LinePathProps } from '@visx/shape/lib/shapes/LinePath';
import DataContext from '../../../context/DataContext';
import { PointerEventParams, SeriesProps, TooltipContextType } from '../../../types';
import withRegisteredData, { WithRegisteredDataProps } from '../../../enhancers/withRegisteredData';
import getScaledValueFactory from '../../../utils/getScaledValueFactory';
import getScaleBaseline from '../../../utils/getScaleBaseline';
import isValidNumber from '../../../typeguards/isValidNumber';
import usePointerEventEmitters from '../../../hooks/usePointerEventEmitters';
import { AREASERIES_EVENT_SOURCE, XYCHART_EVENT_SOURCE } from '../../../constants';
import usePointerEventHandlers from '../../../hooks/usePointerEventHandlers';
import TooltipContext from '../../../context/TooltipContext';

export type BaseAreaSeriesProps<
  XScale extends AxisScale,
  YScale extends AxisScale,
  Datum extends object
> = SeriesProps<XScale, YScale, Datum> & {
  /** Whether to render a Line along value of the Area shape (area is fill only). */
  renderLine?: boolean;
  /** Sets the curve factory (from @visx/curve or d3-curve) for the line generator. Defaults to curveLinear. */
  curve?: AreaProps<Datum>['curve'];
  /** Props to be passed to the Line, if rendered. */
  lineProps?: Omit<LinePathProps<Datum>, 'data' | 'x' | 'y' | 'children' | 'defined'>;
  /** Rendered component which is passed path props by BaseAreaSeries after processing. */
  PathComponent?: React.FC<Omit<React.SVGProps<SVGPathElement>, 'ref'>> | 'path';
} & Omit<
    React.SVGProps<SVGPathElement>,
    'x' | 'y' | 'x0' | 'x1' | 'y0' | 'y1' | 'ref' | 'pointerEvents'
  >;

function BaseAreaSeries<XScale extends AxisScale, YScale extends AxisScale, Datum extends object>({
  PathComponent = 'path',
  curve,
  data,
  dataKey,
  lineProps,
  onPointerMove: onPointerMoveProps,
  onPointerOut: onPointerOutProps,
  onPointerUp: onPointerUpProps,
  pointerEvents = true,
  renderLine = true,
  xAccessor,
  xScale,
  yAccessor,
  yScale,
  ...areaProps
}: BaseAreaSeriesProps<XScale, YScale, Datum> & WithRegisteredDataProps<XScale, YScale, Datum>) {
  const { colorScale, theme, horizontal } = useContext(DataContext);
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
  const ownEventSourceKey = `${AREASERIES_EVENT_SOURCE}-${dataKey}`;
  const pointerEventEmitters = usePointerEventEmitters({
    source: ownEventSourceKey,
    onPointerMove: !!onPointerMoveProps && pointerEvents,
    onPointerOut: !!onPointerOutProps && pointerEvents,
    onPointerUp: !!onPointerUpProps && pointerEvents,
  });
  usePointerEventHandlers({
    dataKey,
    onPointerMove: pointerEvents ? onPointerMove : undefined,
    onPointerOut: pointerEvents ? onPointerOut : undefined,
    onPointerUp: pointerEvents ? onPointerUpProps : undefined,
    sources: [XYCHART_EVENT_SOURCE, ownEventSourceKey],
  });

  const numericScaleBaseline = useMemo(() => getScaleBaseline(horizontal ? xScale : yScale), [
    horizontal,
    xScale,
    yScale,
  ]);

  const xAccessors = horizontal
    ? {
        x0: numericScaleBaseline,
        x1: getScaledX,
      }
    : { x: getScaledX };

  const yAccessors = horizontal
    ? {
        y: getScaledY,
      }
    : { y0: numericScaleBaseline, y1: getScaledY };

  return (
    <>
      <Area {...xAccessors} {...yAccessors} {...areaProps} curve={curve} defined={isDefined}>
        {({ path }) => (
          <PathComponent
            className="visx-area"
            stroke="transparent"
            fill={color}
            {...areaProps}
            d={path(data) || ''}
            {...pointerEventEmitters}
          />
        )}
      </Area>
      {renderLine && (
        <LinePath<Datum>
          x={getScaledX}
          y={getScaledY}
          defined={isDefined}
          curve={curve}
          {...lineProps}
        >
          {({ path }) => (
            <PathComponent
              className="visx-line"
              fill="transparent"
              stroke={color}
              strokeWidth={2}
              pointerEvents="none"
              {...lineProps}
              d={path(data) || ''}
            />
          )}
        </LinePath>
      )}
    </>
  );
}

export default withRegisteredData(BaseAreaSeries);
