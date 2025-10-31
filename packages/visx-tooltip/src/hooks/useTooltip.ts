import { useState, useCallback } from 'react';

export type UseTooltipParams<TooltipData> = {
  /** Whether the tooltip is currently open/visible. */
  tooltipOpen: boolean;
  /** The left position (in pixels) of the tooltip. */
  tooltipLeft?: number;
  /** The top position (in pixels) of the tooltip. */
  tooltipTop?: number;
  /** The data associated with the tooltip. */
  tooltipData?: TooltipData;
  /** Function to update tooltip state. */
  updateTooltip: (args: UpdateTooltipArgs<TooltipData>) => void;
  /** Function to show the tooltip with the specified position and data. */
  showTooltip: (args: ShowTooltipArgs<TooltipData>) => void;
  /** Function to hide the tooltip. */
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
