import React, { useEffect } from 'react';
import { mount } from 'enzyme';
import { EventEmitterProvider, useEventEmitter, DataContext } from '../../src';
import usePointerEventHandlers, {
  POINTER_EVENTS_ALL,
} from '../../src/hooks/usePointerEventHandlers';
import getDataContext from '../mocks/getDataContext';

const series1 = { key: 'series1', data: [{}], xAccessor: () => 4, yAccessor: () => 7 };
const series2 = { key: 'series2', data: [{}], xAccessor: () => 4, yAccessor: () => 7 };
// avoids a lot of coercing of types
const getEvent = (eventType: string) =>
  (new MouseEvent(eventType) as unknown) as React.PointerEvent;

describe('usePointerEventHandlers', () => {
  function setup(children: React.ReactNode) {
    return mount(
      <DataContext.Provider value={getDataContext([series1, series2])}>
        <EventEmitterProvider>{children}</EventEmitterProvider>
      </DataContext.Provider>,
    );
  }

  it('should be defined', () => {
    expect(usePointerEventHandlers).toBeDefined();
  });
  it('should invoke handlers for each pointer event handler specified', () => {
    expect.assertions(3);

    const Component = () => {
      const sourceId = 'sourceId';
      const pointerMoveListener = jest.fn();
      const pointerOutListener = jest.fn();
      const pointerUpListener = jest.fn();
      const emit = useEventEmitter();

      usePointerEventHandlers({
        sources: [sourceId],
        dataKey: series1.key,
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

      usePointerEventHandlers({
        sources: [sourceId],
        dataKey: POINTER_EVENTS_ALL,
        onPointerMove: pointerMoveListenerAll,
      });
      usePointerEventHandlers({
        sources: [sourceId],
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
