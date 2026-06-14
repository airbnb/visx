import warn from './warn';

function wrapIndex(index: number, length: number) {
  return ((index % length) + length) % length;
}

export function normalizeCategoricalIndex(index: number, source: string) {
  if (!Number.isFinite(index)) {
    warn(`[@visx/theme] ${source} received a non-finite categorical color index; using index 0.`);
    return 0;
  }

  const integerIndex = Math.trunc(index);

  if (integerIndex !== index) {
    warn(
      `[@visx/theme] ${source} received a fractional categorical color index; truncating to ${integerIndex}.`,
    );
  }

  return integerIndex;
}

export function getCategoricalColor(colors: readonly string[], index: number) {
  if (colors.length === 0) {
    return '';
  }

  return colors[wrapIndex(index, colors.length)];
}
