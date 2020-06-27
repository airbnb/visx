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
type ShowTooltipArgs<TooltipData> = Omit<UseTooltipState<TooltipData>, 'tooltipOpen'>;
type UpdateTooltipArgs<TooltipData> = UseTooltipState<TooltipData>;

export default function useTooltip<TooltipData = {}>(
  initialTooltipState?: Partial<UseTooltipParams<TooltipData>>,
): UseTooltipParams<TooltipData> {
  const [tooltipState, setTooltipState] = useState<UseTooltipState<TooltipData>>({
    tooltipOpen: false,
    ...initialTooltipState,
  });

  const updateTooltip = useCallback(
    ({ tooltipOpen, tooltipLeft, tooltipTop, tooltipData }: UpdateTooltipArgs<TooltipData>) =>
      setTooltipState(prevState => ({
        ...prevState,
        tooltipOpen,
        tooltipLeft,
        tooltipTop,
        tooltipData,
      })),
    [],
  );

  const showTooltip = useCallback(
    ({ tooltipLeft, tooltipTop, tooltipData }: ShowTooltipArgs<TooltipData>) =>
      updateTooltip({
        tooltipOpen: true,
        tooltipLeft,
        tooltipTop,
        tooltipData,
      }),
    [updateTooltip],
  );

  const hideTooltip = useCallback(
    () =>
      updateTooltip({
        tooltipOpen: false,
        tooltipLeft: undefined,
        tooltipTop: undefined,
        tooltipData: undefined,
      }),
    [updateTooltip],
  );

  return {
    tooltipOpen: tooltipState.tooltipOpen,
    tooltipLeft: tooltipState.tooltipLeft,
    tooltipTop: tooltipState.tooltipTop,
    tooltipData: tooltipState.tooltipData,
    updateTooltip,
    showTooltip,
    hideTooltip,
  };
}
