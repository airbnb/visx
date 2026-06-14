import lightTheme from './light';
import { CATEGORICAL_COLOR_COUNT, MIN_CATEGORICAL_COLOR_COUNT } from './names';
import warn from '../utils/warn';

export default function normalizeCategoricalColors(colors: readonly string[]): readonly string[] {
  if (colors.length < MIN_CATEGORICAL_COLOR_COUNT) {
    warn(
      `[@visx/theme] categorical palettes should include at least ${MIN_CATEGORICAL_COLOR_COUNT} colors; received ${colors.length}. The palette will be normalized to fill ${CATEGORICAL_COLOR_COUNT} runtime colors.`,
    );
  }

  const sourceColors = colors.length > 0 ? colors : lightTheme.colors.categorical;

  return Array.from(
    { length: CATEGORICAL_COLOR_COUNT },
    (_, index) => sourceColors[index % sourceColors.length],
  );
}
