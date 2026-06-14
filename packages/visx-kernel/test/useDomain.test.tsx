import { renderHook } from '@testing-library/react';
import { useDomain } from '../src';
import { resetWarnCache, setWarnHandler } from '../src/warnings';

type Datum = {
  date: Date;
  group: string;
  value: number;
};

describe('useDomain', () => {
  afterEach(() => {
    setWarnHandler(null);
    resetWarnCache();
  });

  it('computes and stabilizes linear domains from readonly data', () => {
    const { result, rerender } = renderHook(
      ({ data }: { data: readonly Datum[] }) =>
        useDomain({
          data,
          accessor: 'value',
          type: 'linear',
        }),
      {
        initialProps: {
          data: [
            { date: new Date('2024-01-01'), group: 'a', value: 4 },
            { date: new Date('2024-01-02'), group: 'b', value: 10 },
          ],
        },
      },
    );
    const firstDomain = result.current;

    expect(result.current).toEqual([4, 10]);

    rerender({
      data: [
        { date: new Date('2024-01-01'), group: 'a', value: 4 },
        { date: new Date('2024-01-02'), group: 'b', value: 10 },
      ],
    });

    expect(result.current).toBe(firstDomain);
  });

  it('computes time domains with stable Date values', () => {
    const { result, rerender } = renderHook(
      ({ data }: { data: readonly Datum[] }) =>
        useDomain({
          data,
          accessor: (datum) => datum.date,
          type: 'time',
        }),
      {
        initialProps: {
          data: [
            { date: new Date('2024-01-02'), group: 'a', value: 4 },
            { date: new Date('2024-01-01'), group: 'b', value: 10 },
          ],
        },
      },
    );
    const firstDomain = result.current;

    expect(result.current).toEqual([new Date('2024-01-01'), new Date('2024-01-02')]);

    rerender({
      data: [
        { date: new Date('2024-01-02'), group: 'a', value: 4 },
        { date: new Date('2024-01-01'), group: 'b', value: 10 },
      ],
    });

    expect(result.current).toBe(firstDomain);
  });

  it('computes band domains in first-seen order', () => {
    const { result } = renderHook(() =>
      useDomain({
        data: [
          { date: new Date('2024-01-01'), group: 'b', value: 4 },
          { date: new Date('2024-01-02'), group: 'a', value: 10 },
          { date: new Date('2024-01-03'), group: 'b', value: 12 },
        ],
        accessor: 'group',
        type: 'band',
      }),
    );

    expect(result.current).toEqual(['b', 'a']);
  });

  it('emits NAN_IN_DATA and EMPTY_DATA warnings for invalid numeric domains', () => {
    const warnings: string[] = [];
    setWarnHandler(({ code, source }) => {
      warnings.push(`${source}:${code}`);
    });

    renderHook(() =>
      useDomain({
        data: [{ value: Number.NaN }],
        accessor: 'value',
        type: 'linear',
      }),
    );

    expect(warnings).toEqual([
      '[@visx/kernel/useDomain]:NAN_IN_DATA',
      '[@visx/kernel/useDomain]:EMPTY_DATA',
    ]);
  });
});
