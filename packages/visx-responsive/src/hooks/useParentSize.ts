// eslint-disable-next-line import/extensions -- explicit .js required for strict Node ESM
import debounce from 'lodash/debounce.js';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { DebounceSettings, PrivateWindow, ResizeObserverPolyfill } from '../types';

export type ParentSizeState = {
  width: number;
  height: number;
  top: number;
  left: number;
};

export type UseParentSizeConfig = {
  /** Initial size before measuring the parent. */
  initialSize?: Partial<ParentSizeState>;
  /** Optionally inject a ResizeObserver polyfill, else this *must* be globally available. */
  resizeObserverPolyfill?: ResizeObserverPolyfill;
  /** Optional dimensions provided won't trigger a state change when changed. */
  ignoreDimensions?: keyof ParentSizeState | (keyof ParentSizeState)[];
} & DebounceSettings;

export type UseParentSizeResult<T extends HTMLElement = HTMLDivElement> = ParentSizeState & {
  parentRef: (node: T | null) => void;
  node: T | null;
  resize: (state: ParentSizeState) => void;
};

const defaultIgnoreDimensions: UseParentSizeConfig['ignoreDimensions'] = [];
const defaultInitialSize: ParentSizeState = {
  width: 0,
  height: 0,
  top: 0,
  left: 0,
};

export default function useParentSize<T extends HTMLElement = HTMLDivElement>({
  initialSize = defaultInitialSize,
  debounceTime = 300,
  ignoreDimensions = defaultIgnoreDimensions,
  enableDebounceLeadingCall = true,
  resizeObserverPolyfill,
}: UseParentSizeConfig = {}): UseParentSizeResult<T> {
  const [node, setNode] = useState<T | null>(null);
  const parentRef = useCallback((el: T | null) => {
    setNode(el);
  }, []);
  const animationFrameID = useRef(0);

  const [state, setState] = useState<ParentSizeState>({ ...defaultInitialSize, ...initialSize });

  const resize = useMemo(() => {
    const normalized = Array.isArray(ignoreDimensions) ? ignoreDimensions : [ignoreDimensions];

    return debounce(
      (incoming: ParentSizeState) => {
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

  useEffect(() => {
    if (!node) {
      resize.cancel();
      return;
    }

    const LocalResizeObserver =
      resizeObserverPolyfill || (window as unknown as PrivateWindow).ResizeObserver;

    const observer = new LocalResizeObserver((entries) => {
      entries.forEach((entry) => {
        const { left, top, width, height } = entry?.contentRect ?? {};
        animationFrameID.current = window.requestAnimationFrame(() => {
          resize({ width, height, top, left });
        });
      });
    });
    observer.observe(node);

    return () => {
      window.cancelAnimationFrame(animationFrameID.current);
      observer.disconnect();
      resize.cancel();
    };
  }, [node, resize, resizeObserverPolyfill]);

  return { parentRef, node, resize, ...state };
}
