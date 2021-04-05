export declare type UseTooltipParams<TooltipData> = {
    tooltipOpen: boolean;
    tooltipLeft?: number;
    tooltipTop?: number;
    tooltipData?: TooltipData;
    updateTooltip: (args: UpdateTooltipArgs<TooltipData>) => void;
    showTooltip: (args: ShowTooltipArgs<TooltipData>) => void;
    hideTooltip: () => void;
};
declare type UseTooltipState<TooltipData> = Pick<UseTooltipParams<TooltipData>, 'tooltipOpen' | 'tooltipLeft' | 'tooltipTop' | 'tooltipData'>;
declare type ValueOrFunc<T> = T | ((t: T) => T);
declare type ShowTooltipArgs<TooltipData> = ValueOrFunc<Omit<UseTooltipState<TooltipData>, 'tooltipOpen'>>;
declare type UpdateTooltipArgs<TooltipData> = ValueOrFunc<UseTooltipState<TooltipData>>;
export default function useTooltip<TooltipData = {}>(
/** Optional initial TooltipState. */
initialTooltipState?: Partial<UseTooltipParams<TooltipData>>): UseTooltipParams<TooltipData>;
export {};
//# sourceMappingURL=useTooltip.d.ts.map