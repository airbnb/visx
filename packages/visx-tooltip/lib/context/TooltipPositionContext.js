"use strict";

exports.__esModule = true;
exports.useTooltipPosition = exports.TooltipPositionProvider = exports.TooltipPositionConsumer = void 0;
var _react = require("react");
var TooltipPositionContext = /*#__PURE__*/(0, _react.createContext)({
  isFlippedVertically: false,
  isFlippedHorizontally: false
});
var TooltipPositionProvider = TooltipPositionContext.Provider;
exports.TooltipPositionProvider = TooltipPositionProvider;
var TooltipPositionConsumer = TooltipPositionContext.Consumer;
exports.TooltipPositionConsumer = TooltipPositionConsumer;
var useTooltipPosition = function useTooltipPosition() {
  return (0, _react.useContext)(TooltipPositionContext);
};
exports.useTooltipPosition = useTooltipPosition;