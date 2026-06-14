import React, { StrictMode } from 'react';
import { renderHook } from '@testing-library/react';
import { useStructuralMemo } from '../src';

type Margin = {
  bottom: number;
  left: number;
  right: number;
  top: number;
};

describe('useStructuralMemo', () => {
  it('keeps margin-shaped inputs stable when shallow values match', () => {
    const initialMargin = { top: 8, right: 12, bottom: 16, left: 20 };
    const { result, rerender } = renderHook(
      ({ margin }: { margin: Margin }) => useStructuralMemo(margin, 1),
      {
        initialProps: { margin: initialMargin },
      },
    );
    const firstResult = result.current;

    rerender({ margin: { top: 8, right: 12, bottom: 16, left: 20 } });
    expect(result.current).toBe(firstResult);

    rerender({ margin: { top: 8, right: 12, bottom: 24, left: 20 } });
    expect(result.current).not.toBe(firstResult);
  });

  it('keeps domain-shaped arrays stable when values match', () => {
    const { result, rerender } = renderHook(
      ({ domain }: { domain: readonly [number, number] }) => useStructuralMemo(domain, 1),
      {
        initialProps: { domain: [0, 100] },
      },
    );
    const firstResult = result.current;

    rerender({ domain: [0, 100] });
    expect(result.current).toBe(firstResult);

    rerender({ domain: [0, 200] });
    expect(result.current).not.toBe(firstResult);
  });

  it('uses Object.is semantics at depth 0', () => {
    const initialOptions = { nice: true };
    const { result, rerender } = renderHook(
      ({ options }: { options: { nice: boolean } }) => useStructuralMemo(options, 0),
      {
        initialProps: { options: initialOptions },
      },
    );
    const firstResult = result.current;

    rerender({ options: initialOptions });
    expect(result.current).toBe(firstResult);

    rerender({ options: { nice: true } });
    expect(result.current).not.toBe(firstResult);
  });

  it('preserves same-input references under StrictMode', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <StrictMode>{children}</StrictMode>
    );
    const { result, rerender } = renderHook(
      ({ options }: { options: { align: string; tickCount: number } }) =>
        useStructuralMemo(options, 1),
      {
        initialProps: { options: { align: 'center', tickCount: 5 } },
        wrapper,
      },
    );
    const firstResult = result.current;

    rerender({ options: { align: 'center', tickCount: 5 } });
    expect(result.current).toBe(firstResult);
  });
});
