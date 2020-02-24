import { useState } from 'react';

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

export default function useTooltip<TooltipData = {}>(): UseTooltipParams<TooltipData> {
  const [{ tooltipOpen, tooltipLeft, tooltipTop, tooltipData }, setTooltipState] = useState<
    UseTooltipState<TooltipData>
  >({
    tooltipOpen: false,
    tooltipLeft: undefined,
    tooltipTop: undefined,
    tooltipData: undefined,
  });

  const updateTooltip = ({
    tooltipOpen,
    tooltipLeft,
    tooltipTop,
    tooltipData,
  }: UpdateTooltipArgs<TooltipData>) =>
    setTooltipState(prevState => ({
      ...prevState,
      tooltipOpen,
      tooltipLeft,
      tooltipTop,
      tooltipData,
    }));

  const showTooltip = ({ tooltipLeft, tooltipTop, tooltipData }: ShowTooltipArgs<TooltipData>) =>
    updateTooltip({
      tooltipOpen: true,
      tooltipLeft,
      tooltipTop,
      tooltipData,
    });

  const hideTooltip = () =>
    updateTooltip({
      tooltipOpen: false,
      tooltipLeft: undefined,
      tooltipTop: undefined,
      tooltipData: undefined,
    });

  return {
    tooltipOpen,
    tooltipLeft,
    tooltipTop,
    tooltipData,
    updateTooltip,
    showTooltip,
    hideTooltip,
  };
}
