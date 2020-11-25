import { useCallback, useContext, useEffect, useRef } from 'react';
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
  const sourcesRef = useRef<string[] | undefined>();
  sourcesRef.current = sources; // use ref so sources[] can change without creating new handlers

  // wrap emitter.emit so we can enforce stricter type signature
  const emit = useCallback(
    (type: EventType, event: HandlerParams['event'], source?: string) => {
      if (emitter) {
        emitter.emit<HandlerParams>(type, { event, svgPoint: localPoint(event), source });
      }
    },
    [emitter],
  );

  useEffect(() => {
    if (emitter && eventType && handler) {
      // register handler, with source filtering as needed
      const handlerWithSourceFilter: Handler = (params?: HandlerParams) => {
        if (!params?.source || !sourcesRef.current || sourcesRef.current?.includes(params.source)) {
          handler(params);
        }
      };
      emitter.on<HandlerParams>(eventType, handlerWithSourceFilter);
      return () => emitter?.off<HandlerParams>(eventType, handlerWithSourceFilter);
    }
    return undefined;
  }, [emitter, eventType, handler]);

  return emitter ? emit : null;
}
