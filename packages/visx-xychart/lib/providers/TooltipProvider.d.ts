import React from 'react';
declare type TooltipProviderProps = {
    /** Debounce time for when `hideTooltip` is invoked. */
    hideTooltipDebounceMs?: number;
    children: React.ReactNode;
};
/** Simple wrapper around useTooltip, to provide tooltip data via context. */
export default function TooltipProvider<Datum extends object>({ hideTooltipDebounceMs, children, }: TooltipProviderProps): JSX.Element;
export {};
//# sourceMappingURL=TooltipProvider.d.ts.map