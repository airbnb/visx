import React, { useMemo } from 'react';
import mitt from 'mitt';
import EventEmitterContext from '../context/EventEmitterContext';

/** Provider for EventEmitterContext. */
export default function EventEmitterProvider({ children }: { children: React.ReactNode }) {
  const emitter = useMemo(() => mitt(), []);
  return <EventEmitterContext.Provider value={emitter}>{children}</EventEmitterContext.Provider>;
}
