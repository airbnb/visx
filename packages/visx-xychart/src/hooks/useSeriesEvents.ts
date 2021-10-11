import { useCallback, useContext } from 'react';
import { AxisScale } from '@visx/axis';
import TooltipContext from '../context/TooltipContext';
import { EventHandlerParams, SeriesProps, TooltipContextType } from '../types';
import useEventEmitters from './useEventEmitters';
import useEventHandlers, { PointerEventHandlerParams } from './useEventHandlers';

export type SeriesEventsParams<
  XScale extends AxisScale,
  YScale extends AxisScale,
  Datum extends object,
> = Pick<
  SeriesProps<XScale, YScale, Datum>,
  'enableEvents' | 'onBlur' | 'onFocus' | 'onPointerMove' | 'onPointerOut' | 'onPointerUp'
> &
  Pick<
    PointerEventHandlerParams<XScale, YScale, Datum>,
    'dataKey' | 'allowedSources' | 'findNearestDatum'
  > & {
    /** The source of emitted events. */
    source: string;
  };

/** This hook simplifies the logic for initializing Series event emitters + handlers. */
export default function useSeriesEvents<
  XScale extends AxisScale,
  YScale extends AxisScale,
  Datum extends object,
>({
  dataKey,
  enableEvents,
  findNearestDatum,
  onBlur: onBlurProps,
  onFocus: onFocusProps,
  onPointerMove: onPointerMoveProps,
  onPointerOut: onPointerOutProps,
  onPointerUp: onPointerUpProps,
  source,
  allowedSources,
}: SeriesEventsParams<XScale, YScale, Datum>) {
  const { showTooltip, hideTooltip } = (useContext(TooltipContext) ??
    {}) as TooltipContextType<Datum>;
  const onPointerMove = useCallback(
    (params: EventHandlerParams<Datum>) => {
      showTooltip(params);
      if (onPointerMoveProps) onPointerMoveProps(params);
    },
    [showTooltip, onPointerMoveProps],
  );
  const onFocus = useCallback(
    (params: EventHandlerParams<Datum>) => {
      showTooltip(params);
      if (onFocusProps) onFocusProps(params);
    },
    [showTooltip, onFocusProps],
  );
  const onPointerOut = useCallback(
    (event: React.PointerEvent) => {
      hideTooltip();
      if (event && onPointerOutProps) onPointerOutProps(event);
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
  useEventHandlers({
    dataKey,
    findNearestDatum,
    onBlur: enableEvents ? onBlur : undefined,
    onFocus: enableEvents ? onFocus : undefined,
    onPointerMove: enableEvents ? onPointerMove : undefined,
    onPointerOut: enableEvents ? onPointerOut : undefined,
    onPointerUp: enableEvents ? onPointerUpProps : undefined,
    allowedSources,
  });
  return useEventEmitters({
    source,
    onBlur: !!onBlurProps && enableEvents,
    onFocus: !!onFocusProps && enableEvents,
    onPointerMove: !!onPointerMoveProps && enableEvents,
    onPointerOut: !!onPointerOutProps && enableEvents,
    onPointerUp: !!onPointerUpProps && enableEvents,
  });
}
