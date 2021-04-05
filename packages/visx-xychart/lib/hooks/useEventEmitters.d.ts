declare type PointerEventEmitterParams = {
    /** Source of the events, e.g., the component name. */
    source: string;
    onBlur?: boolean;
    onFocus?: boolean;
    onPointerMove?: boolean;
    onPointerOut?: boolean;
    onPointerUp?: boolean;
};
/**
 * A hook that simplifies creation of handlers for emitting
 * pointermove, pointerout, and pointerup events to EventEmitterContext.
 */
export default function usePointerEventEmitters({ source, onPointerOut, onPointerMove, onPointerUp, onFocus, onBlur, }: PointerEventEmitterParams): {
    onPointerMove: ((event: React.PointerEvent) => void | undefined) | undefined;
    onFocus: ((event: React.FocusEvent) => void | undefined) | undefined;
    onBlur: ((event: React.FocusEvent) => void | undefined) | undefined;
    onPointerOut: ((event: React.PointerEvent) => void | undefined) | undefined;
    onPointerUp: ((event: React.PointerEvent) => void | undefined) | undefined;
};
export {};
//# sourceMappingURL=useEventEmitters.d.ts.map