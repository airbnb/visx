import { useState, useCallback } from 'react';

export type UseTooltipParams<TooltipData> = {
  tooltipOpen: boolean;
  tooltipLeft?: number;
  tooltipTop?: number;
  tooltipData?: TooltipData;
  updateTooltip: (args: UpdateTooltipArgs<TooltipData>) => void;
  showTooltip: (args: ShowTooltipArgs<TooltipData>) => void;
  hideTooltip: () => void;
};
type UseTooltipState<TooltipData> = Pick<
  UseTooltipParams<TooltipData>,
  'tooltipOpen' | 'tooltipLeft' | 'tooltipTop' | 'tooltipData'
>;
type ValueOrFunc<T> = T | ((t: T) => T);
type ShowTooltipArgs<TooltipData> = ValueOrFunc<Omit<UseTooltipState<TooltipData>, 'tooltipOpen'>>;
type UpdateTooltipArgs<TooltipData> = ValueOrFunc<UseTooltipState<TooltipData>>;

export default function useTooltip<TooltipData = {}>(
  /** Optional initial TooltipState. */
  initialTooltipState?: Partial<UseTooltipParams<TooltipData>>,
): UseTooltipParams<TooltipData> {
  const [tooltipState, setTooltipState] = useState<UseTooltipState<TooltipData>>({
    tooltipOpen: false,
    ...initialTooltipState,
  });

  const showTooltip = useCallback(
    (showArgs: ShowTooltipArgs<TooltipData>) =>
      setTooltipState(
        typeof showArgs === 'function'
          ? ({ tooltipOpen, ...show }) => ({ ...showArgs(show), tooltipOpen: true })
          : {
              tooltipOpen: true,
              tooltipLeft: showArgs.tooltipLeft,
              tooltipTop: showArgs.tooltipTop,
              tooltipData: showArgs.tooltipData,
            },
      ),
    [setTooltipState],
  );

  const hideTooltip = useCallback(
    () =>
      setTooltipState({
        tooltipOpen: false,
        tooltipLeft: undefined,
        tooltipTop: undefined,
        tooltipData: undefined,
      }),
    [setTooltipState],
  );

  return {
    tooltipOpen: tooltipState.tooltipOpen,
    tooltipLeft: tooltipState.tooltipLeft,
    tooltipTop: tooltipState.tooltipTop,
    tooltipData: tooltipState.tooltipData,
    updateTooltip: setTooltipState,
    showTooltip,
    hideTooltip,
  };
}
