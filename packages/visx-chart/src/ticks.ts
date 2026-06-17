export type AxisTickValue = string | number | Date;

export type AxisTickFormatter<TickValue extends AxisTickValue> = (
  value: TickValue,
  index: number,
) => string;

export type GetAxisTickCountOptions = {
  axisLength: number;
  maxTicks?: number;
  minTicks?: number;
  minTickSpacing?: number;
};

export type GetVisibleTickValuesOptions = {
  axisLength: number;
  minTickSpacing?: number;
  preserveEndTicks?: boolean;
};

const DEFAULT_MIN_TICK_SPACING = 48;

function getFiniteLength(value: number) {
  return Number.isFinite(value) ? Math.max(0, value) : 0;
}

function getPositiveInteger(value: number | undefined, fallback: number) {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    return fallback;
  }

  return Math.max(0, Math.floor(value));
}

export function getAxisTickCount({
  axisLength,
  maxTicks = 5,
  minTicks = 2,
  minTickSpacing = DEFAULT_MIN_TICK_SPACING,
}: GetAxisTickCountOptions) {
  const length = getFiniteLength(axisLength);
  const spacing = Math.max(1, getFiniteLength(minTickSpacing));
  const minimum = getPositiveInteger(minTicks, 2);
  const maximum = Math.max(minimum, getPositiveInteger(maxTicks, 5));
  const count = length === 0 ? minimum : Math.floor(length / spacing);

  return Math.min(maximum, Math.max(minimum, count));
}

export function getVisibleTickValues<TickValue extends AxisTickValue>(
  values: readonly TickValue[],
  { axisLength, minTickSpacing, preserveEndTicks = true }: GetVisibleTickValuesOptions,
) {
  if (values.length === 0) {
    return [];
  }

  const maxVisibleTicks = getAxisTickCount({
    axisLength,
    maxTicks: values.length,
    minTicks: preserveEndTicks && values.length > 1 ? 2 : 1,
    minTickSpacing,
  });

  if (values.length <= maxVisibleTicks) {
    return [...values];
  }

  if (!preserveEndTicks) {
    const step = Math.ceil(values.length / maxVisibleTicks);

    return values.filter((_, index) => index % step === 0).slice(0, maxVisibleTicks);
  }

  if (maxVisibleTicks <= 1) {
    return [values[0]];
  }

  const lastIndex = values.length - 1;
  const step = Math.ceil(lastIndex / (maxVisibleTicks - 1));
  const indices = new Set<number>();

  for (let index = 0; index < lastIndex && indices.size < maxVisibleTicks - 1; index += step) {
    indices.add(index);
  }

  indices.add(lastIndex);

  return [...indices].sort((a, b) => a - b).map((index) => values[index]);
}
