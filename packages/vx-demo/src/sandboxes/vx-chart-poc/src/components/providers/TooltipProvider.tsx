import React from 'react';
import { useTooltip } from '@vx/tooltip';
import TooltipContext from '../../context/TooltipContext';
import { TooltipData } from '../../types';

export type EventProviderProps = {
  children: React.ReactNode;
};

/** Simple wrapper around useTooltip, to provide tooltip data via context. */
export default function EventProvider({ children }: EventProviderProps) {
  const tooltip = useTooltip<TooltipData>();
  return <TooltipContext.Provider value={tooltip}>{children}</TooltipContext.Provider>;
}
