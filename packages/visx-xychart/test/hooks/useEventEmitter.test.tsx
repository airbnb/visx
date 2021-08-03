import React, { useEffect } from 'react';
import { mount } from 'enzyme';
import useEventEmitter from '../../src/hooks/useEventEmitter';
import { EventEmitterProvider } from '../../src';

// avoids a lot of coercing of types
const getEvent = (eventType: string) => new MouseEvent(eventType) as unknown as React.PointerEvent;

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

    mount(
      <EventEmitterProvider>
        <Component />
      </EventEmitterProvider>,
    );
  });

  it('should register event listeners and emit events', () => {
    expect.assertions(1);

    const Component = () => {
      const listener = jest.fn();
      const emit = useEventEmitter('pointermove', listener);

      useEffect(() => {
        if (emit) {
          emit('pointermove', getEvent('pointermove'));
          expect(listener).toHaveBeenCalledTimes(1);
        }
      });

      return null;
    };

    mount(
      <EventEmitterProvider>
        <Component />
      </EventEmitterProvider>,
    );
  });

  it('should filter invalid sources if specified', () => {
    expect.assertions(4);

    const Component = () => {
      const eventType = 'pointermove';
      const sourceId = 'sourceId';
      const listener = jest.fn();
      const filteredListener = jest.fn();
      const emit = useEventEmitter();
      useEventEmitter('pointermove', listener);
      useEventEmitter('pointermove', filteredListener, [sourceId]);

      useEffect(() => {
        if (emit) {
          emit(eventType, getEvent(eventType));
          expect(listener).toHaveBeenCalledTimes(1);
          expect(filteredListener).toHaveBeenCalledTimes(0);
          emit(eventType, getEvent(eventType), sourceId);
          expect(listener).toHaveBeenCalledTimes(2);
          expect(filteredListener).toHaveBeenCalledTimes(1);
        }
      });

      return null;
    };

    mount(
      <EventEmitterProvider>
        <Component />
      </EventEmitterProvider>,
    );
  });
});
