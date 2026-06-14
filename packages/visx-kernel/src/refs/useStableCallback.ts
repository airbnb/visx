import { useRef } from 'react';
import useLatestRef from './useLatestRef';

export default function useStableCallback<Args extends readonly unknown[], Result>(
  callback: (...args: Args) => Result,
) {
  const callbackRef = useLatestRef(callback);
  const stableCallbackRef = useRef<((...args: Args) => Result) | null>(null);

  if (stableCallbackRef.current === null) {
    stableCallbackRef.current = (...args: Args) => callbackRef.current(...args);
  }

  return stableCallbackRef.current;
}
