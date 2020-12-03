import React, { useEffect } from 'react';
import { mount } from 'enzyme';
import useEventEmitter from '../../src/hooks/useEventEmitter';
import { EventEmitterProvider } from '../../src';

describe('useEventEmitter', () => {
  it('should be defined', () => {
    expect(useEventEmitter).toBeDefined();
  });

  it('should provide an emitter', () => {
    expect.assertions(1);

    const Component = () => {
      const registry = useEventEmitter();
      expect(registry).toEqual(expect.any(Function));
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
          // @ts-ignore not a React.MouseEvent
          emit('pointermove', new MouseEvent('pointermove'));
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
});
