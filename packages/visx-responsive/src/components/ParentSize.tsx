import debounce from 'lodash/debounce';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ResizeObserverPolyfill } from '../types';

// @TODO remove when upgraded to TS 4 which has its own declaration
interface PrivateWindow {
  ResizeObserver: ResizeObserverPolyfill;
}

export type ParentSizeProps = {
  /** Optional `className` to add to the parent `div` wrapper used for size measurement. */
  className?: string;
  /** Child render updates upon resize are delayed until `debounceTime` milliseconds _after_ the last resize event is observed. */
  debounceTime?: number;
  /** Optional flag to toggle leading debounce calls. When set to true this will ensure that the component always renders immediately. (defaults to true) */
  enableDebounceLeadingCall?: boolean;
  /** Optional dimensions provided won't trigger a state change when changed. */
  ignoreDimensions?: keyof ParentSizeState | (keyof ParentSizeState)[];
  /** Optional `style` object to apply to the parent `div` wrapper used for size measurement. */
  parentSizeStyles?: React.CSSProperties;
  /** Optionally inject a ResizeObserver polyfill, else this *must* be globally available. */
  resizeObserverPolyfill?: ResizeObserverPolyfill;
  /** Child render function `({ width, height, top, left, ref, resize }) => ReactNode`. */
  children: (
    args: {
      ref: HTMLDivElement | null;
      resize: (state: ParentSizeState) => void;
    } & ParentSizeState,
  ) => React.ReactNode;
};

type ParentSizeState = {
  width: number;
  height: number;
  top: number;
  left: number;
};

export type ParentSizeProvidedProps = ParentSizeState;

const defaultIgnoreDimensions: ParentSizeProps['ignoreDimensions'] = [];
const defaultParentSizeStyles = { width: '100%', height: '100%' };

export default function ParentSize({
  className,
  children,
  debounceTime = 300,
  ignoreDimensions = defaultIgnoreDimensions,
  parentSizeStyles = defaultParentSizeStyles,
  enableDebounceLeadingCall = true,
  resizeObserverPolyfill,
  ...restProps
}: ParentSizeProps & Omit<React.HTMLAttributes<HTMLDivElement>, keyof ParentSizeProps>) {
  const target = useRef<HTMLDivElement | null>(null);
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
    if (target.current) observer.observe(target.current);

    return () => {
      window.cancelAnimationFrame(animationFrameID.current);
      observer.disconnect();
      resize.cancel();
    };
  }, [resize, resizeObserverPolyfill]);

  return (
    <div style={parentSizeStyles} ref={target} className={className} {...restProps}>
      {children({
        ...state,
        ref: target.current,
        resize,
      })}
    </div>
  );
}
