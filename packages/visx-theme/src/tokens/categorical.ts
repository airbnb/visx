import { CATEGORICAL_COLOR_COUNT } from './names';

export default function normalizeCategoricalColors(colors: readonly string[]): readonly string[] {
  return Array.from(
    { length: CATEGORICAL_COLOR_COUNT },
    (_, index) => colors[index % colors.length],
  );
}
