import React, { useMemo } from 'react';
import mitt from 'mitt';
import EventEmitterContext from './EventEmitterContext';

/** Provider for EventEmitterContext. */
export default function EventEmitter({ children }: { children: React.ReactNode }) {
  const emitter = useMemo(() => mitt(), []);
  return <EventEmitterContext.Provider value={emitter}>{children}</EventEmitterContext.Provider>;
}
