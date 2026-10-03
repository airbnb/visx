import React, { createRef } from 'react';
import { act, cleanup, fireEvent, render } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { scaleLinear } from '@visx/scale';
import Brush from '../src/Brush';
import BaseBrush from '../src/BaseBrush';
import type { BaseBrushState } from '../src/BaseBrush';

afterEach(cleanup);

const initialBrushPosition = { start: { x: 10, y: 20 }, end: { x: 80, y: 90 } };
const selectedExtent = { x0: 10, x1: 80, y0: 20, y1: 90 };
const resetExtent = { x0: -1, x1: -1, y0: -1, y1: -1 };

test('reports the public reset before ending with the selected domain', () => {
  const innerRef = createRef<BaseBrush>();
  const onChange = vi.fn();
  const onBrushEnd = vi.fn();
  render(
    <svg>
      <Brush
        innerRef={innerRef}
        width={200}
        height={100}
        xScale={scaleLinear({ domain: [0, 200], range: [0, 200] })}
        yScale={scaleLinear({ domain: [0, 100], range: [0, 100] })}
        resetOnEnd
        selectedBoxStyle={{ fill: 'blue' }}
        initialBrushPosition={initialBrushPosition}
        onChange={onChange}
        onBrushEnd={onBrushEnd}
      />
    </svg>,
  );
  act(() => innerRef.current!.handleDragEnd());
  expect(onChange).toHaveBeenCalledExactlyOnceWith(null);
  expect(onBrushEnd).toHaveBeenCalledExactlyOnceWith(
    expect.objectContaining({ x0: 8, x1: 82, y0: -2, y1: 102 }),
  );
  expect(onChange.mock.invocationCallOrder[0]).toBeLessThan(onBrushEnd.mock.invocationCallOrder[0]);
});

describe.each([false, true])('brush completion (StrictMode: %s)', (strict) => {
  const Wrapper = strict ? React.StrictMode : React.Fragment;

  test.each([
    { useWindowMoveEvents: false, resetOnEnd: false },
    { useWindowMoveEvents: false, resetOnEnd: true },
    { useWindowMoveEvents: true, resetOnEnd: false },
    { useWindowMoveEvents: true, resetOnEnd: true },
  ])('reports change before end with %j', ({ useWindowMoveEvents, resetOnEnd }) => {
    const ref = createRef<BaseBrush>();
    const calls: { event: string; state: BaseBrushState }[] = [];
    render(
      <Wrapper>
        <svg>
          <BaseBrush
            ref={ref}
            width={200}
            height={100}
            left={0}
            top={0}
            selectedBoxStyle={{ fill: 'blue' }}
            useWindowMoveEvents={useWindowMoveEvents}
            resetOnEnd={resetOnEnd}
            initialBrushPosition={initialBrushPosition}
            onChange={(state) => calls.push({ event: 'change', state })}
            onBrushEnd={(state) => calls.push({ event: 'end', state })}
          />
        </svg>
      </Wrapper>,
    );
    act(() => ref.current!.handleBrushingTypeChange('select'));
    calls.length = 0;
    act(() => {
      if (useWindowMoveEvents) {
        window.dispatchEvent(new MouseEvent('mouseup'));
      } else {
        ref.current!.handleDragEnd();
      }
    });

    expect(calls.map((call) => call.event)).toEqual(['change', 'end']);
    expect(calls[0].state.extent).toEqual(resetOnEnd ? resetExtent : selectedExtent);
    expect(calls[1].state).toMatchObject({ isBrushing: false, extent: selectedExtent });
    expect(ref.current!.state.extent).toEqual(resetOnEnd ? resetExtent : selectedExtent);
  });

  test.each([
    ['selection', 'visx-brush-selection'],
    ['handle', 'visx-brush-handle-right'],
    ['corner', 'visx-brush-corner-bottomRight'],
  ])('does not report changes after ending a %s drag', (_name, className) => {
    const calls: string[] = [];
    const onBrushEnd = vi.fn(() => calls.push('end'));
    const { container } = render(
      <Wrapper>
        <svg>
          <BaseBrush
            width={200}
            height={100}
            left={0}
            top={0}
            selectedBoxStyle={{ fill: 'blue' }}
            resizeTriggerAreas={['right', 'bottomRight']}
            initialBrushPosition={initialBrushPosition}
            onChange={() => calls.push('change')}
            onBrushEnd={onBrushEnd}
          />
        </svg>
      </Wrapper>,
    );
    const target = container.querySelector(`.${className}`)!;
    fireEvent.pointerDown(target, { clientX: 80, clientY: 90 });
    fireEvent.pointerMove(target, { clientX: 90, clientY: 95 });
    calls.length = 0;
    fireEvent.pointerUp(target, { clientX: 90, clientY: 95 });

    expect(calls[0]).toBe('change');
    expect(calls[calls.length - 1]).toBe('end');
    expect(onBrushEnd).toHaveBeenCalledTimes(1);
    expect(onBrushEnd).toHaveBeenCalledWith(expect.objectContaining({ activeHandle: null }));
  });
});
