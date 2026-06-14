import { normalizeAccessor } from '../src';

type Datum = {
  label: string;
  value: number;
};

describe('normalizeAccessor', () => {
  it('returns the same function instance for the same string accessor', () => {
    expect(normalizeAccessor<Datum, number>('value')).toBe(
      normalizeAccessor<Datum, number>('value'),
    );
  });

  it('normalizes simple property functions to the same string accessor instance', () => {
    const stringAccessor = normalizeAccessor<Datum, number>('value');
    const functionAccessor = normalizeAccessor<Datum, number>((datum) => datum.value);

    expect(functionAccessor).toBe(stringAccessor);
    expect(functionAccessor({ label: 'a', value: 42 }, 0, [])).toBe(42);
  });

  it('returns custom accessor functions that cannot be inferred', () => {
    const accessor = (datum: Datum) => datum.value * 2;

    expect(normalizeAccessor<Datum, number>(accessor)).toBe(accessor);
  });

  it('does not support symbol accessors in v1', () => {
    const normalizeUnknownAccessor = normalizeAccessor as (accessor: PropertyKey) => unknown;

    expect(() => normalizeUnknownAccessor(Symbol('value'))).toThrow(
      '@visx/kernel: symbol accessors are not supported in v1.',
    );
  });
});
