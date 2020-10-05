import React from 'react';
import { useTooltip } from '@visx/tooltip';
import TooltipContext from '../context/TooltipContext';
import { TooltipData } from '../types';

/** Simple wrapper around useTooltip, to provide tooltip data via context. */
export default function TooltipProvider({ children }: { children: React.ReactNode }) {
  const tooltip = useTooltip<TooltipData>();
  return <TooltipContext.Provider value={tooltip}>{children}</TooltipContext.Provider>;
}
