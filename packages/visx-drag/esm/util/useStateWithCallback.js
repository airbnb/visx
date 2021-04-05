import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';

/** A hook that exposes a setState(state, callback) API similar to a component class. */
export default function useStateWithCallback(initialState) {
  var _useState = useState(initialState),
      state = _useState[0],
      setState = _useState[1];

  var callbackRef = useRef(null);
  var setStateCallback = useCallback(function (nextState, callback) {
    callbackRef.current = callback || null;
    setState(nextState);
  }, [setState]); // if we use useEffect, some callback invocations are skipped

  useLayoutEffect(function () {
    // `null` on initial render, so we only execute callback on state *updates*
    if (callbackRef.current) {
      callbackRef.current(state);
      callbackRef.current = null; // reset callback after execution
    }
  }, [state]);
  return [state, setStateCallback];
}