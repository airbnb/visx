import { useCallback, useLayoutEffect, useRef, useState } from 'react';

type SetStateWithCallback<State> = (
  nextState: State | ((currState: State) => State),
  callback?: (currState: State) => void,
) => void;

/** A hook that exposes a setState(state, callback) API similar to a component class. */
export default function useStateWithCallback<State>(
  initialState: State,
): [State, SetStateWithCallback<State>] {
  const [state, setState] = useState(initialState);
  const callbackRef = useRef<null | ((state: State) => void)>(null);

  const setStateCallback = useCallback<SetStateWithCallback<State>>(
    (nextState, callback) => {
      callbackRef.current = callback || null;
      setState(nextState);
    },
    [setState],
  );

  // if we use useEffect, some callback invocations are skipped
  useLayoutEffect(() => {
    // `null` on initial render, so we only execute callback on state *updates*
    if (callbackRef.current) {
      callbackRef.current(state);
      callbackRef.current = null; // reset callback after execution
    }
  }, [state]);

  return [state, setStateCallback];
}
