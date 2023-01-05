import { ResizeObserverPolyfill } from '../types';

let polyfillSingleton: ResizeObserverPolyfill | undefined;

/** Utility to set a ResizeObserver polyfill once in an app and enable @visx/responsive to reference it. */
export function setResizeObserverPolyfill(polyfill?: ResizeObserverPolyfill) {
  polyfillSingleton = polyfill;
  return polyfill;
}

/** Utility to access the ResizeObserver polyfill set by calling `setResizeObserverPolyfill`. */
export function getResizeObserverPolyfill() {
  return polyfillSingleton;
}
