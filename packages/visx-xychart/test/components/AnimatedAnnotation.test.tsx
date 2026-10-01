import React from 'react';
import { act, cleanup, render } from '@testing-library/react';
import { Globals } from '@react-spring/web';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { AnimatedAnnotation, DataContext } from '../../src';
import getDataContext from '../mocks/getDataContext';

type Position = { x: number; y: number };
const xAccessor = (datum: Position) => datum.x;
const yAccessor = (datum: Position) => datum.y;

function annotation(datum: Position, label = 'Annotation') {
  return (
    <DataContext.Provider value={getDataContext()}>
      <svg>
        <AnimatedAnnotation datum={datum} xAccessor={xAccessor} yAccessor={yAccessor}>
          {label}
        </AnimatedAnnotation>
      </svg>
    </DataContext.Provider>
  );
}

function offset(container: HTMLElement) {
  const transform = container.querySelector('svg > g')!.getAttribute('transform')!;
  const [x, y] = transform.slice('translate('.length, -1).split(',').map(Number);
  return { x, y };
}

let frameTime = 0;

function advance(milliseconds: number) {
  for (let elapsed = 0; elapsed < milliseconds; elapsed += 16) {
    frameTime += 16;
    act(() => vi.advanceTimersByTime(16));
  }
}

describe('AnimatedAnnotation motion', () => {
  const originalRaf = window.requestAnimationFrame;

  beforeEach(() => {
    frameTime += 1000;
    vi.useFakeTimers();
    Globals.assign({
      now: () => frameTime,
      requestAnimationFrame: (callback) => window.setTimeout(() => callback(frameTime), 16),
    });
  });

  afterEach(() => {
    cleanup();
    // Let react-spring's frame loop stop before removing the fake timers.
    advance(32);
    vi.useRealTimers();
    Globals.assign({ now: () => performance.now(), requestAnimationFrame: originalRaf });
  });

  it('starts at the requested position without animating from the origin', () => {
    const { container } = render(annotation({ x: 50, y: 100 }));
    advance(16);

    expect(offset(container)).toEqual({ x: 0, y: 0 });
  });

  it('keeps x moving when y changes during an animation', () => {
    const { container, rerender } = render(annotation({ x: 0, y: 0 }));
    rerender(annotation({ x: 100, y: 100 }));
    advance(48);
    const previousX = 100 + offset(container).x;
    expect(previousX).toBeGreaterThan(0);
    expect(previousX).toBeLessThan(100);

    rerender(annotation({ x: 100, y: 200 }));
    advance(16);

    const currentX = 100 + offset(container).x;
    expect(currentX).toBeGreaterThan(previousX);
    expect(currentX).toBeLessThan(100);
  });

  it('does not finish either axis early on an unrelated rerender', () => {
    const { container, rerender } = render(annotation({ x: 0, y: 0 }));
    rerender(annotation({ x: 100, y: 100 }));
    advance(48);

    rerender(annotation({ x: 100, y: 100 }, 'Updated label'));
    advance(16);

    const current = offset(container);
    expect(current.x).toBeLessThan(0);
    expect(current.y).toBeLessThan(0);
    expect(current.x).toBeGreaterThan(-100);
    expect(current.y).toBeGreaterThan(-100);
  });
});
