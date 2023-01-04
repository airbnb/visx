// @TODO remove when upgraded to TS 4 which has its own declaration
interface ResizeObserverEntry {
  contentRect: {
    left: number;
    top: number;
    width: number;
    height: number;
  };
}

type ResizeObserverCallback = (entries: ResizeObserverEntry[], observer: ResizeObserver) => void;

declare class ResizeObserver {
  constructor(callback: ResizeObserverCallback);
  observe(target: Element, options?: any): void;
  unobserve(target: Element): void;
  disconnect(): void;
  static toString(): string;
}

interface ResizeObserverPolyfill {
  new (callback: ResizeObserverCallback): ResizeObserver;
}

export { ResizeObserver, ResizeObserverCallback, ResizeObserverPolyfill };
