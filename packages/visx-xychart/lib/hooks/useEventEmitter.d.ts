/// <reference types="react" />
import { localPoint } from '@visx/event';
export declare type EventType = 'pointermove' | 'pointerout' | 'pointerup' | 'focus' | 'blur';
export declare type HandlerParams = {
    /** The react PointerEvent or FocusEvent. */
    event: React.PointerEvent | React.FocusEvent;
    /** Position of the PointerEvent in svg coordinates. */
    svgPoint: ReturnType<typeof localPoint>;
    /** The source of the event. This can be anything, but for this package is the name of the component which emitted the event. */
    source?: string;
};
export declare type Handler = (params?: HandlerParams) => void;
/**
 * Hook for optionally subscribing to a specified EventType,
 * and returns emitter for emitting events.
 */
export default function useEventEmitter(
/** Type of event to subscribe to. */
eventType?: EventType, 
/** Handler invoked on emission of EventType event.  */
handler?: Handler, 
/** Optional valid sources for EventType subscription. */
allowedSources?: string[]): ((type: EventType, event: HandlerParams['event'], source?: string | undefined) => void) | null;
//# sourceMappingURL=useEventEmitter.d.ts.map