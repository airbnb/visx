import { useContext, useEffect } from 'react';
import EventEmitterContext from '../context/EventEmitterContext';

/**
 * Hook for subscribing to the specified event, handles unsubscribing on unmount.
 * Returns emitter for emitting events.
 */
export default function useEventEmitter(
  event?: 'mousemove' | 'mouseout' | 'touchmove' | 'touchend' | 'click',
  handler?: () => void,
) {
  const emitter = useContext(EventEmitterContext);
  useEffect(() => {
    if (emitter && event && handler) {
      emitter.on(event, handler);
      return () => emitter?.off(event, handler);
    }
    return undefined;
  }, [emitter, event, handler]);
  return emitter;
}
