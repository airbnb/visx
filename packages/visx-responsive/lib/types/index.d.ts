interface ResizeObserverEntry {
    contentRect: {
        left: number;
        top: number;
        width: number;
        height: number;
    };
}
declare type ResizeObserverCallback = (entries: ResizeObserverEntry[]) => void;
export interface ResizeObserver {
    new (callback: ResizeObserverCallback): ResizeObserver;
    observe(el: Element): void;
    disconnect(): void;
}
export {};
//# sourceMappingURL=index.d.ts.map