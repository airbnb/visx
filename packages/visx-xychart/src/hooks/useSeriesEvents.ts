import type { FocusEvent, PointerEvent } from 'react';
import { useCallback, useContext } from 'react';
import type { AxisScale } from '@visx/axis';
import TooltipContext from '../context/TooltipContext';
import type { EventHandlerParams, SeriesProps, TooltipContextType } from '../types';
import useEventEmitters from './useEventEmitters';
import type { PointerEventHandlerParams } from './useEventHandlers';
import useEventHandlers from './useEventHandlers';

export type SeriesEventsParams<
  XScale extends AxisScale,
  YScale extends AxisScale,
  Datum extends object,
> = Pick<
  SeriesProps<XScale, YScale, Datum>,
  | 'enableEvents'
  | 'onBlur'
  | 'onFocus'
  | 'onPointerMove'
  | 'onPointerOut'
  | 'onPointerUp'
  | 'onPointerDown'
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
  onPointerDown: onPointerDownProps,
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
    (event: PointerEvent) => {
      hideTooltip();
      if (event && onPointerOutProps) onPointerOutProps(event);
    },
    [hideTooltip, onPointerOutProps],
  );
  const onBlur = useCallback(
    (event: FocusEvent) => {
      hideTooltip();
      if (event && onBlurProps) onBlurProps(event);
    },
    [hideTooltip, onBlurProps],
  );

  const onPointerDown = useCallback(
    (params: EventHandlerParams<Datum>) => {
      showTooltip(params);
      if (onPointerDownProps) onPointerDownProps(params);
    },
    [showTooltip, onPointerDownProps],
  );

  useEventHandlers({
    dataKey,
    findNearestDatum,
    onBlur: enableEvents ? onBlur : undefined,
    onFocus: enableEvents ? onFocus : undefined,
    onPointerMove: enableEvents ? onPointerMove : undefined,
    onPointerOut: enableEvents ? onPointerOut : undefined,
    onPointerUp: enableEvents ? onPointerUpProps : undefined,
    onPointerDown: enableEvents ? onPointerDown : undefined,
    allowedSources,
  });
  return useEventEmitters({
    source,
    onBlur: !!onBlurProps && enableEvents,
    onFocus: !!onFocusProps && enableEvents,
    onPointerMove: !!onPointerMoveProps && enableEvents,
    onPointerOut: !!onPointerOutProps && enableEvents,
    onPointerUp: !!onPointerUpProps && enableEvents,
    onPointerDown: !!onPointerDownProps && enableEvents,
  });
}
