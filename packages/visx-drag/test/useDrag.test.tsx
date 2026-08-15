/* eslint-disable react/jsx-handler-names -- these are the hook's own handlers, matching Drag.tsx */
import React, { useRef } from 'react';
import { vi } from 'vitest';
import { fireEvent, render } from '@testing-library/react';
import { useDrag } from '../src';
import type { UseDragOptions } from '../lib/useDrag';

describe('useDrag', () => {
  test('it should be defined', () => {
    expect(useDrag).toBeDefined();
  });
  test('should provide UseDrag', () => {
    expect.assertions(1);

    function Consumer() {
      const drag = useDrag({ x: 0, y: 0 });
      expect(drag).toMatchObject({
        x: 0,
        y: 0,
        dx: 0,
        dy: 0,
        isDragging: false,
        dragStart: expect.any(Function),
        dragMove: expect.any(Function),
        dragEnd: expect.any(Function),
        dragCancel: expect.any(Function),
      });

      return null;
    }

    render(<Consumer />);
  });

  test('should update drag state when useDrag options change', () => {
    expect.assertions(3);

    const options1 = { x: 1, y: 2, dx: 3, dy: 4 };
    const options2 = { x: -1, y: -2, dx: -3, dy: -4 };

    function Consumer({ x, y, dx, dy }: Pick<UseDragOptions, 'x' | 'y' | 'dx' | 'dy'>) {
      const renderCount = useRef(0);
      const drag = useDrag({ x, y, dx, dy });

      // when this component's props change options1 => 2, it takes one
      // additional render for the `useDrag` state to update to options2
      expect(drag).toMatchObject(renderCount.current <= 1 ? options1 : options2);
      renderCount.current += 1;
      return null;
    }

    const { rerender } = render(<Consumer {...options1} />);
    rerender(<Consumer {...options2} />);
  });
  test('should reset isDragging when a drag is cancelled instead of ended', () => {
    // The browser fires pointercancel instead of pointerup when it takes an in-progress
    // gesture over (e.g. touch-scroll arbitration), so without a cancel path isDragging
    // would stay true indefinitely.
    const states: boolean[] = [];

    function Consumer() {
      const drag = useDrag();
      states.push(drag.isDragging);
      return (
        <svg>
          <rect
            width={100}
            height={100}
            onPointerDown={drag.dragStart}
            onPointerMove={drag.dragMove}
            onPointerCancel={drag.dragCancel}
          />
        </svg>
      );
    }

    const { container } = render(<Consumer />);
    const rect = container.querySelector('rect')!;

    fireEvent.pointerDown(rect, { clientX: 0, clientY: 0 });
    expect(states[states.length - 1]).toBe(true);

    fireEvent.pointerCancel(rect);
    expect(states[states.length - 1]).toBe(false);
  });

  test('should invoke onDragCancel on cancel, falling back to onDragEnd', () => {
    const onDragCancel = vi.fn();
    const onDragEnd = vi.fn();

    function Consumer(props: Pick<UseDragOptions, 'onDragCancel' | 'onDragEnd'>) {
      const drag = useDrag(props);
      return (
        <svg>
          <rect
            width={100}
            height={100}
            onPointerDown={drag.dragStart}
            onPointerCancel={drag.dragCancel}
          />
        </svg>
      );
    }

    // with onDragCancel provided it is preferred over onDragEnd
    const { container, unmount } = render(
      <Consumer onDragCancel={onDragCancel} onDragEnd={onDragEnd} />,
    );
    const rect = container.querySelector('rect')!;
    fireEvent.pointerDown(rect, { clientX: 0, clientY: 0 });
    fireEvent.pointerCancel(rect);
    expect(onDragCancel).toHaveBeenCalledTimes(1);
    expect(onDragEnd).not.toHaveBeenCalled();
    unmount();

    // without it, existing consumers still get an end-of-drag signal
    const { container: container2 } = render(<Consumer onDragEnd={onDragEnd} />);
    const rect2 = container2.querySelector('rect')!;
    fireEvent.pointerDown(rect2, { clientX: 0, clientY: 0 });
    fireEvent.pointerCancel(rect2);
    expect(onDragEnd).toHaveBeenCalledTimes(1);
  });
});
