import React, { createContext, useContext } from 'react';
import type { FloatingTooltipRootState } from './types';

const FloatingTooltipContext = createContext<FloatingTooltipRootState<any> | null>(null);

export type FloatingTooltipContextProviderProps = {
  children: React.ReactNode;
  value: FloatingTooltipRootState<any>;
};

export function FloatingTooltipContextProvider({
  children,
  value,
}: FloatingTooltipContextProviderProps) {
  return (
    <FloatingTooltipContext.Provider value={value}>{children}</FloatingTooltipContext.Provider>
  );
}

export function useFloatingTooltipContext(componentName: string) {
  const context = useContext(FloatingTooltipContext);

  if (!context) {
    throw new Error(`${componentName} must be rendered inside FloatingTooltip.Root.`);
  }

  return context;
}
