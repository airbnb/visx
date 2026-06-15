import { useMemo } from 'react';
import normalizeAccessor from '../accessors/normalizeAccessor';
import type { AccessorInput } from '../accessors/normalizeAccessor';
import useStructuralMemo from '../memo/useStructuralMemo';
import { devWarn } from '../warnings';

const SOURCE = '[@visx/kernel/useDomain]';

export type DomainType = 'linear' | 'time' | 'band';
export type LinearDomain = readonly [number, number];
export type TimeDomain = readonly [Date, Date];
export type BandDomain = readonly string[];
export type DomainForType<T extends DomainType> = T extends 'band'
  ? BandDomain
  : T extends 'time'
  ? TimeDomain
  : LinearDomain;

export type UseDomainOptions<D, V, T extends DomainType> = {
  accessor: AccessorInput<D, V>;
  data: readonly D[];
  type: T;
};

function warnEmptyData(totalValues: number) {
  devWarn('EMPTY_DATA', 'No valid values available to form a domain.', SOURCE, { totalValues });
}

function warnNaNInData(invalidValues: number, totalValues: number) {
  devWarn('NAN_IN_DATA', 'Encountered NaN while computing a domain.', SOURCE, {
    invalidValues,
    totalValues,
  });
}

function getNumber(value: unknown) {
  if (value == null) {
    return undefined;
  }

  const number = value instanceof Date ? value.getTime() : Number(value);
  return Number.isFinite(number) ? number : undefined;
}

function getTime(value: unknown) {
  if (value == null) {
    return undefined;
  }

  const time =
    value instanceof Date ? value.getTime() : new Date(value as string | number).getTime();
  return Number.isFinite(time) ? time : undefined;
}

function extent(values: readonly number[]): LinearDomain {
  let min = values[0];
  let max = values[0];

  values.forEach((value) => {
    if (value < min) min = value;
    if (value > max) max = value;
  });

  return [min, max];
}

export default function useDomain<D, V, T extends DomainType>({
  accessor,
  data,
  type,
}: UseDomainOptions<D, V, T>): DomainForType<T> {
  const stableData = useStructuralMemo(data, 1);
  const stableAccessor = useStructuralMemo(normalizeAccessor(accessor), 0);
  const domain = useMemo(() => {
    if (type === 'band') {
      const values = Array.from(
        new Set(
          stableData
            .map((datum, index) => stableAccessor(datum, index, stableData))
            .filter((value) => value != null)
            .map(String),
        ),
      );

      if (values.length === 0) warnEmptyData(stableData.length);

      return values;
    }

    let invalidValues = 0;
    const values = stableData.flatMap((datum, index) => {
      const value = stableAccessor(datum, index, stableData);
      const number = type === 'time' ? getTime(value) : getNumber(value);

      if (number === undefined) {
        if (value != null) invalidValues += 1;
        return [];
      }

      return [number];
    });

    if (invalidValues > 0) warnNaNInData(invalidValues, stableData.length);

    if (values.length === 0) {
      warnEmptyData(stableData.length);
      return type === 'time' ? [new Date(0), new Date(0)] : [0, 0];
    }

    const [min, max] = extent(values);
    return type === 'time' ? [new Date(min), new Date(max)] : [min, max];
  }, [stableAccessor, stableData, type]);

  return useStructuralMemo(domain, 1) as unknown as DomainForType<T>;
}
