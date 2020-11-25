import { useCallback, useContext, useEffect } from 'react';
import { localPoint } from '@visx/event';
import EventEmitterContext from '../context/EventEmitterContext';

export type EventType = 'pointermove' | 'pointerout' | 'pointerup';

export type HandlerParams = {
  /** The react PointerEvent. */
  event: React.PointerEvent;
  /** Position of the PointerEvent in svg coordinates. */
  svgPoint: ReturnType<typeof localPoint>;
  /** The source of the event. This can be anything, but for this package is the name of the component which emitted the event. */
  source?: string;
};
export type Handler = (params?: HandlerParams) => void;

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
  sources?: string[],
) {
  const emitter = useContext(EventEmitterContext);

  // wrap emitter.emit so we can enforce stricter type signature and filter events by source
  const emit = useCallback(
    (type: EventType, event: HandlerParams['event'], source?: string) => {
      emitter?.emit<HandlerParams>(type, { event, svgPoint: localPoint(event), source });
    },
    [emitter],
  );

  useEffect(() => {
    if (emitter && eventType && handler) {
      const handlerWithSourceFilter: Handler = sources
        ? (params?: HandlerParams) => {
            if (!params?.source || sources.includes(params.source)) handler(params);
          }
        : handler;
      emitter.on<HandlerParams>(eventType, handlerWithSourceFilter);
      return () => emitter?.off<HandlerParams>(eventType, handlerWithSourceFilter);
    }
    return undefined;
  }, [emitter, eventType, handler, sources]);

  return emitter ? emit : null;
}
