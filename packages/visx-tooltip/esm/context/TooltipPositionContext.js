import { createContext, useContext } from 'react';
var TooltipPositionContext = /*#__PURE__*/createContext({
  isFlippedVertically: false,
  isFlippedHorizontally: false
});
export var TooltipPositionProvider = TooltipPositionContext.Provider;
export var TooltipPositionConsumer = TooltipPositionContext.Consumer;
export var useTooltipPosition = function useTooltipPosition() {
  return useContext(TooltipPositionContext);
};