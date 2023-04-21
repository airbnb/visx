import { useCallback, useContext, useEffect, useRef } from 'react';
import { localPoint } from '@visx/event';
import EventEmitterContext from '../context/EventEmitterContext';
/**
 * Hook for optionally subscribing to a specified EventType,
 * and returns emitter for emitting events.
 */
export default function useEventEmitter( /** Type of event to subscribe to. */
eventType, /** Handler invoked on emission of EventType event.  */
handler, /** Optional valid sources for EventType subscription. */
allowedSources) {
  var emitter = useContext(EventEmitterContext);
  var allowedSourcesRef = useRef();
  allowedSourcesRef.current = allowedSources; // use ref so allowedSources[] can change without creating new handlers

  // wrap emitter.emit so we can enforce stricter type signature
  var emit = useCallback(function (type, event, source) {
    if (emitter) {
      emitter.emit(type, {
        event: event,
        svgPoint: localPoint(event),
        source: source
      });
    }
  }, [emitter]);
  useEffect(function () {
    if (emitter && eventType && handler) {
      // register handler, with source filtering as needed
      var handlerWithSourceFilter = function handlerWithSourceFilter(params) {
        var _allowedSourcesRef$cu;
        if (!allowedSourcesRef.current || params != null && params.source && (_allowedSourcesRef$cu = allowedSourcesRef.current) != null && _allowedSourcesRef$cu.includes(params.source)) {
          handler(params);
        }
      };
      emitter.on(eventType, handlerWithSourceFilter);
      return function () {
        return emitter == null ? void 0 : emitter.off(eventType, handlerWithSourceFilter);
      };
    }
    return undefined;
  }, [emitter, eventType, handler]);
  return emitter ? emit : null;
}