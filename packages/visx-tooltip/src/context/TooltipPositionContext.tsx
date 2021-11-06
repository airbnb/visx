import { createContext, useContext } from 'react';

export type TooltipPositionContextType = {
  isFlippedVertically: boolean;
  isFlippedHorizontally: boolean;
};

const TooltipPositionContext = createContext<TooltipPositionContextType>({
  isFlippedVertically: false,
  isFlippedHorizontally: false,
});

export const TooltipPositionProvider = TooltipPositionContext.Provider;
export const TooltipPositionConsumer = TooltipPositionContext.Consumer;

export const useTooltipPosition = () => useContext(TooltipPositionContext);
