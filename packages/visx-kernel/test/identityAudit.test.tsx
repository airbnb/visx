import React, { StrictMode } from 'react';
import { renderHook } from '@testing-library/react';
import { useDomain, useLatestRef, useStableCallback, useStructuralMemo } from '../src';

type Datum = {
  value: number;
};

describe('@visx/kernel identity audit', () => {
  it('keeps same-input references stable under StrictMode', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <StrictMode>{children}</StrictMode>
    );
    const { result, rerender } = renderHook(
      ({ data }: { data: readonly Datum[] }) => {
        const options = useStructuralMemo({ tickCount: 5 }, 1);
        const latestDataRef = useLatestRef(data);
        const callback = useStableCallback(() => latestDataRef.current.length);
        const domain = useDomain({ data, accessor: 'value', type: 'linear' });

        return { callback, domain, latestDataRef, options };
      },
      {
        initialProps: { data: [{ value: 1 }, { value: 3 }] },
        wrapper,
      },
    );
    const firstResult = result.current;

    rerender({ data: [{ value: 1 }, { value: 3 }] });

    expect(result.current.options).toBe(firstResult.options);
    expect(result.current.latestDataRef).toBe(firstResult.latestDataRef);
    expect(result.current.callback).toBe(firstResult.callback);
    expect(result.current.callback()).toBe(2);
    expect(result.current.domain).toBe(firstResult.domain);
  });
});
