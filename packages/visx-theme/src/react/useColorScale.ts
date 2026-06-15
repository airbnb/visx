import { useStructuralMemo } from '@visx/kernel';
import { useMemo } from 'react';
import { getCategoricalColor } from './categoricalColor';
import useTheme from './useTheme';
import warn from './warn';

export type ColorScaleAccessor<Domain extends readonly string[]> = (key: Domain[number]) => string;

export type UseColorScaleOptions = {
  /** Optional explicit color range. Falls back to the active theme's categorical palette. */
  range?: readonly string[];
};

export default function useColorScale<const Domain extends readonly string[]>(
  domain: Domain,
  { range }: UseColorScaleOptions = {},
): ColorScaleAccessor<Domain> {
  const theme = useTheme();
  const stableDomain = useStructuralMemo(domain, 1);
  const stableRange = useStructuralMemo(range, 1);
  const fallbackColors = theme.colors.categorical;
  const colors = stableRange ?? fallbackColors;

  return useMemo(
    () => (key) => {
      const index = stableDomain.indexOf(key);

      if (index < 0) {
        warn(`[@visx/theme] useColorScale received "${key}" outside its domain; using index 0.`);
        return colors[0] ?? getCategoricalColor(fallbackColors, 0);
      }

      return colors[index % colors.length] ?? getCategoricalColor(fallbackColors, index);
    },
    [colors, fallbackColors, stableDomain],
  );
}
