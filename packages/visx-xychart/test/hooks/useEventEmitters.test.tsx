import React, { useEffect } from 'react';
import { mount } from 'enzyme';
import { EventEmitterProvider, useEventEmitter } from '../../src';
import useEventEmitters from '../../src/hooks/useEventEmitters';

describe('useEventEmitters', () => {
  it('should be defined', () => {
    expect(useEventEmitters).toBeDefined();
  });

  it('should provide an emitter for each callback specified', () => {
    expect.assertions(1);

    const Component = () => {
      const emitters = useEventEmitters({
        source: 'visx',
        onPointerOut: false,
        onBlur: true,
        onFocus: true,
      });
      expect(emitters).toEqual({
        onBlur: expect.any(Function),
        onFocus: expect.any(Function),
        onPointerMove: expect.any(Function),
        onPointerOut: undefined,
        onPointerUp: expect.any(Function),
      });
      return null;
    };

    mount(
      <EventEmitterProvider>
        <Component />
      </EventEmitterProvider>,
    );
  });
  it('emitters should emit events', () => {
    expect.assertions(1);

    const Component = () => {
      const source = 'sourceId';
      const listener = jest.fn();
      useEventEmitter('pointerup', listener, [source]);
      const emitters = useEventEmitters({ source });

      useEffect(() => {
        if (emitters.onPointerUp) {
          emitters.onPointerUp(new MouseEvent('pointerup') as unknown as React.PointerEvent);
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
