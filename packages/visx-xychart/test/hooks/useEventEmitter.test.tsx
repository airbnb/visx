import { vi } from 'vitest';
import React, { useEffect } from 'react';
import { render, waitFor } from '@testing-library/react';
import useEventEmitter from '../../src/hooks/useEventEmitter';
import { EventEmitterProvider } from '../../src';

// Create a properly formed PointerEvent with a target
const getEvent = (eventType: string) => {
  const svg = document.querySelector('svg') || document.createElement('svg');
  const event = new PointerEvent(eventType, {
    bubbles: true,
    clientX: 50,
    clientY: 50,
  });
  Object.defineProperty(event, 'target', {
    value: svg,
    enumerable: true,
  });
  return event as unknown as React.PointerEvent;
};

describe('useEventEmitter', () => {
  it('should be defined', () => {
    expect(useEventEmitter).toBeDefined();
  });

  it('should provide an emitter', () => {
    expect.assertions(1);

    const Component = () => {
      const emitter = useEventEmitter();
      expect(emitter).toEqual(expect.any(Function));
      return null;
    };

    render(
      <EventEmitterProvider>
        <Component />
      </EventEmitterProvider>,
    );
  });

  it('should register event listeners and emit events', async () => {
    expect.assertions(1);

    const listener = vi.fn();

    const Component = () => {
      const emit = useEventEmitter('pointermove', listener);

      useEffect(() => {
        if (emit) {
          emit('pointermove', getEvent('pointermove'));
        }
      });

      return null;
    };

    render(
      <EventEmitterProvider>
        <Component />
      </EventEmitterProvider>,
    );

    await waitFor(() => {
      expect(listener).toHaveBeenCalledTimes(1);
    });
  });

  it('should filter invalid sources if specified', async () => {
    expect.assertions(2);

    const eventType = 'pointermove';
    const sourceId = 'sourceId';
    const listener = vi.fn();
    const filteredListener = vi.fn();

    const Component = () => {
      const emit = useEventEmitter();
      useEventEmitter('pointermove', listener);
      useEventEmitter('pointermove', filteredListener, [sourceId]);

      useEffect(() => {
        if (emit) {
          emit(eventType, getEvent(eventType));
          emit(eventType, getEvent(eventType), sourceId);
        }
      });

      return null;
    };

    render(
      <EventEmitterProvider>
        <Component />
      </EventEmitterProvider>,
    );

    // Wait for both emits to complete and verify filtering behavior
    await waitFor(() => {
      // listener receives all events (no filter)
      expect(listener).toHaveBeenCalledTimes(2);
    });

    // filteredListener only receives events with matching sourceId
    expect(filteredListener).toHaveBeenCalledTimes(1);
  });
});
