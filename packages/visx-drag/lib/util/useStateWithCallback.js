"use strict";

exports.__esModule = true;
exports.default = useStateWithCallback;
var _react = require("react");
/** A hook that exposes a setState(state, callback) API similar to a component class. */
function useStateWithCallback(initialState) {
  var _useState = (0, _react.useState)(initialState),
    state = _useState[0],
    setState = _useState[1];
  var callbackRef = (0, _react.useRef)(null);
  var setStateCallback = (0, _react.useCallback)(function (nextState, callback) {
    callbackRef.current = callback || null;
    setState(nextState);
  }, [setState]);

  // if we use useEffect, some callback invocations are skipped
  (0, _react.useLayoutEffect)(function () {
    // `null` on initial render, so we only execute callback on state *updates*
    if (callbackRef.current) {
      callbackRef.current(state);
      callbackRef.current = null; // reset callback after execution
    }
  }, [state]);
  return [state, setStateCallback];
}