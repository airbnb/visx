import { PointerEvent, useCallback, useContext } from 'react';
import DataContext from '../context/DataContext';
import { PointerEventParams } from '../types';
import findNearestDatumX from '../utils/findNearestDatumX';
import findNearestDatumY from '../utils/findNearestDatumY';
import { HandlerParams } from './useEventEmitter';

export const POINTER_EVENTS_ALL = '__all';
export const POINTER_EVENTS_NEAREST = '__nearest';

type PointerEventHandlerParams<Datum extends object> = {
  /** Controls whether callbacks are invoked for a given registry dataKey, the nearest dataKey, or all datakeys. */
  dataKey: string | string[] | typeof POINTER_EVENTS_ALL | typeof POINTER_EVENTS_NEAREST;
  /** Callback invoked onPointerMove for one or more series based on dataKey. */
  onPointerMove?: (params: PointerEventParams<Datum>) => void;
  /** Callback invoked onPointerOut for one or more series based on dataKey. */
  onPointerOut?: (event: PointerEvent) => void;
  /** Callback invoked onPointerUp for one or more series based on dataKey. */
  onPointerUp?: (params: PointerEventParams<Datum>) => void;
};

/**
 * Hook that returns PointerEvent handlers that invoke the passed pointer
 * handlers with the nearest datum to the event for the passed dataKey.
 */
export default function usePointerEventHandlers<Datum extends object>({
  dataKey,
  onPointerMove,
  onPointerOut,
  onPointerUp,
}: PointerEventHandlerParams<Datum>) {
  const { width, height, horizontal, dataRegistry, xScale, yScale } = useContext(DataContext);

  const handlePointerMoveOrUp = useCallback(
    (params?: HandlerParams) => {
      const { svgPoint, event } = params || {};

      const pointerParamsByKey: { [dataKey: string]: PointerEventParams<Datum> } = {};

      // nearest Datum across all dataKeys, if relevant
      let nearestDatumPointerParams: PointerEventParams<Datum> | null = null;
      let nearestDatumDistance = Infinity;

      if (params && event && svgPoint && width && height && xScale && yScale) {
        const considerAllKeys =
          dataKey === POINTER_EVENTS_NEAREST || dataKey === POINTER_EVENTS_ALL;

        // find nearestDatum for relevant dataKey(s)
        (considerAllKeys
          ? dataRegistry?.keys()
          : Array.isArray(dataKey)
          ? dataKey
          : [dataKey]
        )?.forEach(key => {
          const entry = dataRegistry?.get(key);
          if (entry) {
            const nearestDatum = (horizontal ? findNearestDatumY : findNearestDatumX)({
              data: entry.data,
              height,
              point: svgPoint,
              width,
              xAccessor: entry.xAccessor,
              xScale,
              yAccessor: entry.yAccessor,
              yScale,
            });
            if (nearestDatum) {
              pointerParamsByKey[key] = { key, svgPoint, event, ...nearestDatum };

              // compute nearest Datum if not emitting events for all keys\
              if (dataKey === POINTER_EVENTS_NEAREST) {
                const distance = Math.sqrt(
                  (nearestDatum.distanceX ?? Infinity ** 2) +
                    (nearestDatum.distanceY ?? Infinity ** 2),
                );
                nearestDatumPointerParams =
                  distance < nearestDatumDistance
                    ? pointerParamsByKey[key]
                    : nearestDatumPointerParams;
                nearestDatumDistance = Math.min(nearestDatumDistance, distance);
              }
            }
          }
        });

        const pointerParams: (null | PointerEventParams<Datum>)[] =
          dataKey === POINTER_EVENTS_NEAREST
            ? [nearestDatumPointerParams]
            : dataKey === POINTER_EVENTS_ALL || Array.isArray(dataKey)
            ? Object.values(pointerParamsByKey)
            : [pointerParamsByKey[dataKey]];

        pointerParams.forEach(p => {
          if (p?.event.type === 'pointerup' && onPointerUp) {
            onPointerUp(p);
          } else if (p?.event.type === 'pointermove') {
            if (onPointerMove) onPointerMove(p);
          }
        });
      }
    },
    [dataKey, xScale, yScale, width, height, horizontal, onPointerMove, onPointerOut, onPointerUp],
  );

  const handlePointerOut = useCallback(
    (params?: HandlerParams) => {
      if (params && onPointerOut) onPointerOut(params.event);
    },
    [onPointerOut],
  );

  return {
    onPointerMove: onPointerMove ? handlePointerMoveOrUp : undefined,
    onPointerOut: onPointerOut ? handlePointerOut : undefined,
    onPointerUp: onPointerUp ? handlePointerMoveOrUp : undefined,
  };
}
