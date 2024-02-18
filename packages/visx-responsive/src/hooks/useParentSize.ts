import debounce from 'lodash/debounce';
import { RefObject, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { getResizeObserver, ResizeObserverPolyfill } from '../resizeObserver';
import { DebounceSettings } from '../types';

export type ParentSizeState = {
  width: number;
  height: number;
  top: number;
  left: number;
};

export type UseParentSizeConfig = {
  /**
   * @deprecated - use `setResizeObserverPolyfill` function instead.
   * @TODO - remove in the next major version.
   * Optionally inject a ResizeObserver polyfill, else this *must* be globally available.
   */
  resizeObserverPolyfill?: ResizeObserverPolyfill;
  /** Optional dimensions provided won't trigger a state change when changed. */
  ignoreDimensions?: keyof ParentSizeState | (keyof ParentSizeState)[];
} & DebounceSettings;

type UseParentSizeResult<T extends HTMLElement = HTMLDivElement> = ParentSizeState & {
  parentRef: RefObject<T>;
  resize: (state: ParentSizeState) => void;
};

const defaultIgnoreDimensions: UseParentSizeConfig['ignoreDimensions'] = [];

export default function useParentSize<T extends HTMLElement = HTMLDivElement>({
  debounceTime = 300,
  ignoreDimensions = defaultIgnoreDimensions,
  enableDebounceLeadingCall = true,
  resizeObserverPolyfill,
}: UseParentSizeConfig = {}): UseParentSizeResult<T> {
  const parentRef = useRef<T>(null);
  const animationFrameID = useRef(0);

  const [state, setState] = useState<ParentSizeState>({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
  });

  const resize = useMemo(() => {
    const normalized = Array.isArray(ignoreDimensions) ? ignoreDimensions : [ignoreDimensions];

    return debounce(
      (incoming: ParentSizeState) => {
        console.log('eee');
        setState((existing) => {
          const stateKeys = Object.keys(existing) as (keyof ParentSizeState)[];
          const keysWithChanges = stateKeys.filter((key) => existing[key] !== incoming[key]);
          const shouldBail = keysWithChanges.every((key) => normalized.includes(key));

          return shouldBail ? existing : incoming;
        });
      },
      debounceTime,
      { leading: enableDebounceLeadingCall },
    );
  }, [debounceTime, enableDebounceLeadingCall, ignoreDimensions]);

  useLayoutEffect(() => {
    const LocalResizeObserver = resizeObserverPolyfill || getResizeObserver();

    const observer = new LocalResizeObserver((entries) => {
      entries.forEach((entry) => {
        const { left, top, width, height } = entry?.contentRect ?? {};
        animationFrameID.current = window.requestAnimationFrame(() => {
          resize({ width, height, top, left });
        });
      });
    });
    if (parentRef.current) observer.observe(parentRef.current);

    return () => {
      window.cancelAnimationFrame(animationFrameID.current);
      observer.disconnect();
      resize.cancel();
    };
  }, [resize, resizeObserverPolyfill]);

  return { parentRef, resize, ...state };
}
