import { useCallback, useEffect, useMemo, useRef } from 'react';
import type { ReactNode } from 'react';
import debounce from 'lodash/debounce';
import { useTooltip } from '@visx/tooltip';
import TooltipContext from '../context/TooltipContext';
import type { EventHandlerParams, TooltipContextType, TooltipData } from '../types';
import isValidNumber from '../typeguards/isValidNumber';

type TooltipProviderProps = {
  /** Debounce time for when `hideTooltip` is invoked. */
  hideTooltipDebounceMs?: number;
  children: ReactNode;
};

/** Simple wrapper around useTooltip, to provide tooltip data via context. */
export default function TooltipProvider<Datum extends object>({
  hideTooltipDebounceMs = 400,
  children,
}: TooltipProviderProps) {
  const {
    tooltipOpen,
    tooltipLeft,
    tooltipTop,
    tooltipData,
    updateTooltip,
    hideTooltip: privateHideTooltip,
  } = useTooltip<TooltipData<Datum>>(undefined);

  const debouncedHideTooltip = useRef<ReturnType<typeof debounce> | null>(null);

  function cancelDeboundedHideTooltip() {
    if (debouncedHideTooltip.current) {
      debouncedHideTooltip.current.cancel();
      debouncedHideTooltip.current = null;
    }
  }

  useEffect(() => cancelDeboundedHideTooltip, []);

  const showTooltip = useRef(
    ({ svgPoint, index, key, datum, distanceX, distanceY }: EventHandlerParams<Datum>) => {
      // cancel any hideTooltip calls so it won't hide after invoking the logic below
      cancelDeboundedHideTooltip();
      const cleanDistanceX = isValidNumber(distanceX) ? distanceX : Infinity;
      const cleanDistanceY = isValidNumber(distanceY) ? distanceY : Infinity;
      const distance = Math.sqrt(cleanDistanceX ** 2 + cleanDistanceY ** 2);

      updateTooltip(({ tooltipData: currData }) => {
        const currNearestDatumDistance =
          currData?.nearestDatum && isValidNumber(currData.nearestDatum.distance)
            ? currData.nearestDatum.distance
            : Infinity;
        return {
          tooltipOpen: true,
          tooltipLeft: svgPoint?.x,
          tooltipTop: svgPoint?.y,
          tooltipData: {
            nearestDatum:
              (currData?.nearestDatum?.key ?? '') !== key && currNearestDatumDistance < distance
                ? currData?.nearestDatum
                : { key, index, datum, distance },
            datumByKey: {
              ...currData?.datumByKey,
              [key]: {
                datum,
                index,
                key,
              },
            },
          },
        };
      });
    },
  );

  const hideTooltip = useCallback(() => {
    debouncedHideTooltip.current = debounce(privateHideTooltip, hideTooltipDebounceMs);
    debouncedHideTooltip.current();
  }, [privateHideTooltip, hideTooltipDebounceMs]);

  const value = useMemo(
    () => ({
      tooltipOpen,
      tooltipLeft,
      tooltipTop,
      tooltipData,
      updateTooltip,
      showTooltip: showTooltip.current as TooltipContextType<Datum>['showTooltip'],
      hideTooltip,
    }),
    [hideTooltip, tooltipData, tooltipLeft, tooltipOpen, tooltipTop, updateTooltip],
  );

  return <TooltipContext.Provider value={value}>{children}</TooltipContext.Provider>;
}
