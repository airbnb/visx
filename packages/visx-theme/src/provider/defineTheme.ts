import lightTheme from '../tokens/light';
import normalizeCategoricalColors from '../tokens/categorical';
import type { CategoricalColorScale, VisxThemeDefinition } from '../tokens/types';

type DeepPartialObject<T> = {
  [K in keyof T]?: T[K] extends readonly string[]
    ? readonly string[]
    : T[K] extends object
    ? DeepPartialObject<T[K]>
    : T[K];
};

export type ThemeOverrides = DeepPartialObject<VisxThemeDefinition>;

function normalizeCategoricalOverride(
  override: readonly string[] | undefined,
  base: CategoricalColorScale,
): CategoricalColorScale {
  const normalize = (colors: readonly string[]) =>
    normalizeCategoricalColors(colors) as unknown as CategoricalColorScale;

  if (override == null) {
    return normalize(base);
  }

  const colorCount = Math.max(override.length, base.length);
  const merged = Array.from({ length: colorCount }, (_, index) => override[index] ?? base[index]);

  return normalize(merged);
}

export default function defineTheme(
  overrides: ThemeOverrides,
  base: VisxThemeDefinition = lightTheme,
): VisxThemeDefinition {
  return {
    name: overrides.name ?? base.name,
    colors: {
      ...base.colors,
      ...overrides.colors,
      categorical: normalizeCategoricalOverride(
        overrides.colors?.categorical,
        base.colors.categorical,
      ),
    },
    typography: {
      ...base.typography,
      ...overrides.typography,
    },
    axis: {
      ...base.axis,
      ...overrides.axis,
    },
    grid: {
      ...base.grid,
      ...overrides.grid,
    },
    spacing: {
      ...base.spacing,
      ...overrides.spacing,
      margin: {
        ...base.spacing.margin,
        ...overrides.spacing?.margin,
      },
    },
  };
}
