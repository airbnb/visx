import { vi } from 'vitest';
import React, { useEffect } from 'react';
import { render, waitFor } from '@testing-library/react';
import { EventEmitterProvider, useEventEmitter, DataContext } from '../../src';
import useEventHandlers, { POINTER_EVENTS_ALL } from '../../src/hooks/useEventHandlers';
import getDataContext from '../mocks/getDataContext';

const series1 = { key: 'series1', data: [{}], xAccessor: () => 4, yAccessor: () => 7 };
const series2 = { key: 'series2', data: [{}], xAccessor: () => 4, yAccessor: () => 7 };

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

// Create a properly formed FocusEvent with a target
const getFocusEvent = (eventType: 'focus' | 'blur') => {
  const svg = document.querySelector('svg') || document.createElement('svg');
  const event = new FocusEvent(eventType, {
    bubbles: true,
  });
  Object.defineProperty(event, 'target', {
    value: svg,
    enumerable: true,
  });
  return event as unknown as React.FocusEvent;
};

describe('useEventHandlers', () => {
  function setup(children: React.ReactNode) {
    return render(
      <DataContext.Provider value={getDataContext([series1, series2])}>
        <EventEmitterProvider>{children}</EventEmitterProvider>
      </DataContext.Provider>,
    );
  }

  it('should be defined', () => {
    expect(useEventHandlers).toBeDefined();
  });
  it('should invoke handlers for each pointer event handler specified', async () => {
    expect.assertions(5);

    const sourceId = 'sourceId';
    const pointerMoveListener = vi.fn();
    const pointerOutListener = vi.fn();
    const pointerUpListener = vi.fn();
    const focusListener = vi.fn();
    const blurListener = vi.fn();

    const Component = () => {
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
          emit('pointerout', getEvent('pointerout'), sourceId);
          emit('pointerout', getEvent('pointerout'), 'invalidSource');
          emit('pointerup', getEvent('pointerup'), sourceId);
          emit('pointerup', getEvent('pointerup'), 'invalidSource');
          emit('focus', getFocusEvent('focus'), sourceId);
          emit('focus', getFocusEvent('focus'), 'invalidSource');
          emit('blur', getFocusEvent('blur'), sourceId);
          emit('blur', getFocusEvent('blur'), 'invalidSource');
        }
      });

      return null;
    };

    setup(<Component />);

    await waitFor(() => {
      expect(pointerMoveListener).toHaveBeenCalledTimes(1);
    });
    expect(pointerOutListener).toHaveBeenCalledTimes(1);
    expect(pointerUpListener).toHaveBeenCalledTimes(1);
    expect(focusListener).toHaveBeenCalledTimes(1);
    expect(blurListener).toHaveBeenCalledTimes(1);
  });

  it('should invoke handlers once for each dataKey specified', async () => {
    expect.assertions(4);

    const sourceId = 'sourceId';
    const pointerMoveListenerAll = vi.fn();
    const pointerMoveListenerMultipleKeys = vi.fn();

    const Component = () => {
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
          emit('pointermove', getEvent('pointermove'), 'invalidSource');
        }
      });

      return null;
    };

    setup(<Component />);

    await waitFor(() => {
      expect(pointerMoveListenerAll).toHaveBeenCalledTimes(2);
      expect(pointerMoveListenerMultipleKeys).toHaveBeenCalledTimes(2);
    });
    // After invalid source, counts should stay the same
    expect(pointerMoveListenerAll).toHaveBeenCalledTimes(2);
    expect(pointerMoveListenerMultipleKeys).toHaveBeenCalledTimes(2);
  });
});
