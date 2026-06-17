export type NumericDomain = [number, number];

export function isFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

function getFiniteValues(values: readonly number[]) {
  return values.filter(isFiniteNumber);
}

export function getZeroBaselineDomain(values: readonly number[]): NumericDomain {
  const finiteValues = getFiniteValues(values);

  if (finiteValues.length === 0) {
    return [0, 1];
  }

  const min = Math.min(0, ...finiteValues);
  const max = Math.max(0, ...finiteValues);

  return min === max ? [min - 1, max + 1] : [min, max];
}

export function getPositiveDomain(values: readonly number[]): NumericDomain {
  const max = Math.max(0, ...getFiniteValues(values));

  return max === 0 ? [0, 1] : [0, max];
}

export function getPaddedDomain(values: readonly number[], paddingRatio = 0.08): NumericDomain {
  const finiteValues = getFiniteValues(values);

  if (finiteValues.length === 0) {
    return [0, 1];
  }

  const min = Math.min(...finiteValues);
  const max = Math.max(...finiteValues);

  if (min === max) {
    return [min - 1, max + 1];
  }

  const padding = (max - min) * Math.max(0, paddingRatio);

  return [min - padding, max + padding];
}
