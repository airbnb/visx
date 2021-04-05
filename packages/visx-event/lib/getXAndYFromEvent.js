"use strict";

exports.__esModule = true;
exports.default = getXAndYFromEvent;

var _typeGuards = require("./typeGuards");

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var DEFAULT_POINT = {
  x: 0,
  y: 0
};

function getXAndYFromEvent(event) {
  if (!event) return _extends({}, DEFAULT_POINT);

  if ((0, _typeGuards.isTouchEvent)(event)) {
    return event.changedTouches.length > 0 ? {
      x: event.changedTouches[0].clientX,
      y: event.changedTouches[0].clientY
    } : _extends({}, DEFAULT_POINT);
  }

  if ((0, _typeGuards.isMouseEvent)(event)) {
    return {
      x: event.clientX,
      y: event.clientY
    };
  } // for focus events try to extract the center position of the target element


  var target = event == null ? void 0 : event.target;
  var boundingClientRect = target && 'getBoundingClientRect' in target ? target.getBoundingClientRect() : null;
  if (!boundingClientRect) return _extends({}, DEFAULT_POINT);
  return {
    x: boundingClientRect.x + boundingClientRect.width / 2,
    y: boundingClientRect.y + boundingClientRect.height / 2
  };
}