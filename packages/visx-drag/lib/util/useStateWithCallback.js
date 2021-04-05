"use strict";

exports.__esModule = true;
exports.default = useStateWithCallback;

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/** A hook that exposes a setState(state, callback) API similar to a component class. */
function useStateWithCallback(initialState) {
  var _useState = (0, _react.useState)(initialState),
      state = _useState[0],
      setState = _useState[1];

  var callbackRef = (0, _react.useRef)(null);
  var setStateCallback = (0, _react.useCallback)(function (nextState, callback) {
    callbackRef.current = callback || null;
    setState(nextState);
  }, [setState]); // if we use useEffect, some callback invocations are skipped

  (0, _react.useLayoutEffect)(function () {
    // `null` on initial render, so we only execute callback on state *updates*
    if (callbackRef.current) {
      callbackRef.current(state);
      callbackRef.current = null; // reset callback after execution
    }
  }, [state]);
  return [state, setStateCallback];
}