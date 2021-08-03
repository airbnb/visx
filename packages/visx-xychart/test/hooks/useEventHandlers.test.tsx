import React, { useEffect } from 'react';
import { mount } from 'enzyme';
import { EventEmitterProvider, useEventEmitter, DataContext } from '../../src';
import useEventHandlers, { POINTER_EVENTS_ALL } from '../../src/hooks/useEventHandlers';
import getDataContext from '../mocks/getDataContext';

const series1 = { key: 'series1', data: [{}], xAccessor: () => 4, yAccessor: () => 7 };
const series2 = { key: 'series2', data: [{}], xAccessor: () => 4, yAccessor: () => 7 };
// avoids a lot of coercing of types
const getEvent = (eventType: string) => new MouseEvent(eventType) as unknown as React.PointerEvent;

describe('useEventHandlers', () => {
  function setup(children: React.ReactNode) {
    return mount(
      <DataContext.Provider value={getDataContext([series1, series2])}>
        <EventEmitterProvider>{children}</EventEmitterProvider>
      </DataContext.Provider>,
    );
  }

  it('should be defined', () => {
    expect(useEventHandlers).toBeDefined();
  });
  it('should invoke handlers for each pointer event handler specified', () => {
    expect.assertions(5);

    const Component = () => {
      const sourceId = 'sourceId';
      const pointerMoveListener = jest.fn();
      const pointerOutListener = jest.fn();
      const pointerUpListener = jest.fn();
      const focusListener = jest.fn();
      const blurListener = jest.fn();
      const emit = useEventEmitter();

      useEventHandlers({
        allowedSources: [sourceId],
        dataKey: series1.key,
        onFocus: focusListener,
        onBlur: blurListener,
        onPointerMove: pointerMoveListener,
        onPointerOut: pointerOutListener,
        onPointerUp: pointerUpListener,
      });

      useEffect(() => {
        if (emit) {
          emit('pointermove', getEvent('pointermove'), sourceId);
          emit('pointermove', getEvent('pointermove'), 'invalidSource');
          expect(pointerMoveListener).toHaveBeenCalledTimes(1);

          emit('pointerout', getEvent('pointerout'), sourceId);
          emit('pointerout', getEvent('pointerout'), 'invalidSource');
          expect(pointerOutListener).toHaveBeenCalledTimes(1);

          emit('pointerup', getEvent('pointerup'), sourceId);
          emit('pointerup', getEvent('pointerup'), 'invalidSource');
          expect(pointerUpListener).toHaveBeenCalledTimes(1);

          emit('focus', new FocusEvent('focus') as unknown as React.FocusEvent, sourceId);
          emit('focus', new FocusEvent('focus') as unknown as React.FocusEvent, 'invalidSource');
          expect(focusListener).toHaveBeenCalledTimes(1);

          emit('blur', new FocusEvent('blur') as unknown as React.FocusEvent, sourceId);
          emit('blur', new FocusEvent('blur') as unknown as React.FocusEvent, 'invalidSource');
          expect(blurListener).toHaveBeenCalledTimes(1);
        }
      });

      return null;
    };

    setup(<Component />);
  });

  it('should invoke handlers once for each dataKey specified', () => {
    expect.assertions(4);

    const Component = () => {
      const sourceId = 'sourceId';
      const pointerMoveListenerAll = jest.fn();
      const pointerMoveListenerMultipleKeys = jest.fn();
      const emit = useEventEmitter();

      useEventHandlers({
        allowedSources: [sourceId],
        dataKey: POINTER_EVENTS_ALL,
        onPointerMove: pointerMoveListenerAll,
      });
      useEventHandlers({
        allowedSources: [sourceId],
        dataKey: [series1.key, series2.key],
        onPointerMove: pointerMoveListenerMultipleKeys,
      });

      useEffect(() => {
        if (emit) {
          emit('pointermove', getEvent('pointermove'), sourceId);
          expect(pointerMoveListenerAll).toHaveBeenCalledTimes(2);
          expect(pointerMoveListenerMultipleKeys).toHaveBeenCalledTimes(2);
          emit('pointermove', getEvent('pointermove'), 'invalidSource');
          expect(pointerMoveListenerAll).toHaveBeenCalledTimes(2);
          expect(pointerMoveListenerMultipleKeys).toHaveBeenCalledTimes(2);
        }
      });

      return null;
    };

    setup(<Component />);
  });
});
