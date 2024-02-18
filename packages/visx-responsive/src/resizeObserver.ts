// @TODO remove all these types when upgraded to TS 4 which has its own declaration
interface ResizeObserverEntry {
  contentRect: {
    left: number;
    top: number;
    width: number;
    height: number;
  };
}

type ResizeObserverCallback = (entries: ResizeObserverEntry[], observer: ResizeObserver) => void;

export declare class ResizeObserver {
  constructor(callback: ResizeObserverCallback);
  observe(target: Element, options?: any): void;
  unobserve(target: Element): void;
  disconnect(): void;
  static toString(): string;
}

export interface ResizeObserverPolyfill {
  new (callback: ResizeObserverCallback): ResizeObserver;
}

interface PrivateWindow {
  ResizeObserver: ResizeObserverPolyfill;
}

let resizeObserverPolyfill: ResizeObserverPolyfill | undefined;

export const getResizeObserver = () =>
  resizeObserverPolyfill || (window as unknown as PrivateWindow).ResizeObserver;

export const setResizeObserverPolyfill = (polyfill: ResizeObserverPolyfill | undefined) => {
  resizeObserverPolyfill = polyfill;
};
