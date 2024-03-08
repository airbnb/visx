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

export interface PrivateWindow {
  ResizeObserver: ResizeObserverPolyfill;
}

export type Simplify<T> = { [Key in keyof T]: T[Key] } & {};

export interface DebounceSettings {
  /** Child render updates upon resize are delayed until `debounceTime` milliseconds _after_ the last resize event is observed. Defaults to `300`. */
  debounceTime?: number;
  /** Optional flag to toggle leading debounce calls. When set to true this will ensure that the component always renders immediately. Defaults to `true`. */
  enableDebounceLeadingCall?: boolean;
}
