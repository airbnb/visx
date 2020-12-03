import React, { useEffect } from 'react';
import { mount } from 'enzyme';
import { EventEmitterProvider, useEventEmitter } from '../../src';
import usePointerEventEmitters from '../../src/hooks/usePointerEventEmitters';

describe('usePointerEventEmitters', () => {
  it('should be defined', () => {
    expect(usePointerEventEmitters).toBeDefined();
  });

  it('should provide an emitter for each callback specified', () => {
    expect.assertions(1);

    const Component = () => {
      const emitters = usePointerEventEmitters({ source: 'visx', onPointerOut: false });
      expect(emitters).toEqual({
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
      const emitters = usePointerEventEmitters({ source });

      useEffect(() => {
        if (emitters.onPointerUp) {
          emitters.onPointerUp((new MouseEvent('pointerup') as unknown) as React.PointerEvent);
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
