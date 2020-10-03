import React, { useRef } from 'react';
import { useTooltip } from '@visx/tooltip';
import TooltipContext from '../context/TooltipContext';
import { ShowTooltipParams, TooltipData } from '../types';

type TooltipProviderProps = {
  children: React.ReactNode;
};

/** Simple wrapper around useTooltip, to provide tooltip data via context. */
export default function TooltipProvider<Datum extends object>({ children }: TooltipProviderProps) {
  const {
    tooltipOpen,
    tooltipLeft,
    tooltipTop,
    tooltipData,
    updateTooltip,
    hideTooltip,
  } = useTooltip<TooltipData<Datum>>(undefined);

  const showTooltip = useRef(
    ({ svgPoint, index, key, datum, distanceX, distanceY }: ShowTooltipParams<Datum>) => {
      const distance =
        distanceX == null || distanceY == null
          ? Infinity
          : Math.sqrt(distanceX ** 2 + distanceY ** 2);

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
