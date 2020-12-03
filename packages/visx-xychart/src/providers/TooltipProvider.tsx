import React, { useCallback, useRef } from 'react';
import debounce from 'lodash/debounce';
import { useTooltip } from '@visx/tooltip';
import TooltipContext from '../context/TooltipContext';
import { PointerEventParams, TooltipData } from '../types';

type TooltipProviderProps = {
  /** Debounce time for when `hideTooltip` is invoked. */
  hideTooltipDebounceMs?: number;
  children: React.ReactNode;
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

  const showTooltip = useRef(
    ({ svgPoint, index, key, datum, distanceX, distanceY }: PointerEventParams<Datum>) => {
      const distance = Math.sqrt((distanceX ?? Infinity ** 2) + (distanceY ?? Infinity ** 2));

      updateTooltip(({ tooltipData: currData }) => ({
        tooltipOpen: true,
        tooltipLeft: svgPoint?.x,
        tooltipTop: svgPoint?.y,
        tooltipData: {
          nearestDatum:
            (currData?.nearestDatum?.key ?? '') !== key &&
            (currData?.nearestDatum?.distance ?? Infinity) < distance
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
      }));
    },
  );

  const hideTooltip = useCallback(debounce(privateHideTooltip, hideTooltipDebounceMs), [
    privateHideTooltip,
  ]);

  return (
    <TooltipContext.Provider
      value={{
        tooltipOpen,
        tooltipLeft,
        tooltipTop,
        tooltipData,
        updateTooltip,
        showTooltip: showTooltip.current,
        hideTooltip,
      }}
    >
      {children}
    </TooltipContext.Provider>
  );
}
