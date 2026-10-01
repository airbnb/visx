import { renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useText } from '../src';
import { addMock, removeMock } from './svgMock';

describe('font size measurements', () => {
  beforeEach(() => {
    addMock();
    vi.spyOn(SVGElement.prototype as SVGTextElement, 'getComputedTextLength').mockImplementation(
      function measure(this: SVGTextElement) {
        return (this.textContent?.length ?? 0) * (parseFloat(this.style.fontSize) || 16);
      },
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
    removeMock();
  });

  it.each([20, '20px'])('uses the fontSize prop (%s) when scaling text', (fontSize) => {
    const { result } = renderHook(() =>
      useText({ children: 'ABCD', fontSize, width: 100, scaleToFit: true }),
    );

    expect(result.current.transform).toBe('matrix(1.25, 0, 0, 1.25, 0, 0)');
  });

  it('remeasures when only fontSize changes', () => {
    const { result, rerender } = renderHook(
      ({ fontSize }) => useText({ children: 'ABCD', fontSize, width: 100, scaleToFit: true }),
      { initialProps: { fontSize: 20 } },
    );

    rerender({ fontSize: 40 });

    expect(result.current.transform).toBe('matrix(0.625, 0, 0, 0.625, 0, 0)');
  });

  it('lets inline fontSize override the presentation prop', () => {
    const { result } = renderHook(() =>
      useText({
        children: 'ABCD',
        fontSize: 40,
        style: { fontSize: 10 },
        width: 100,
        scaleToFit: true,
      }),
    );

    expect(result.current.transform).toBe('matrix(2.5, 0, 0, 2.5, 0, 0)');
  });

  it('uses fontSize when wrapping text', () => {
    const { result, rerender } = renderHook(
      ({ fontSize }) => useText({ children: 'Aa Bb', fontSize, width: 90 }),
      { initialProps: { fontSize: 20 } },
    );

    expect(result.current.wordsByLines).toHaveLength(2);
    rerender({ fontSize: 10 });
    expect(result.current.wordsByLines).toHaveLength(1);
  });

  it('clears the previous measurement fontSize when the prop is removed', () => {
    const { result, rerender } = renderHook(
      ({ fontSize }: { fontSize?: number }) =>
        useText({ children: 'RESET', fontSize, width: 100, scaleToFit: true }),
      { initialProps: { fontSize: 40 } },
    );

    expect(result.current.transform).toBe('matrix(0.5, 0, 0, 0.5, 0, 0)');
    rerender({ fontSize: undefined });
    expect(result.current.transform).toBe('matrix(1.25, 0, 0, 1.25, 0, 0)');
  });
});
