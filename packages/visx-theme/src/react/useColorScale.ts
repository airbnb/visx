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
  const colors = range ?? theme.colors.categorical;

  return (key) => {
    const index = domain.indexOf(key);

    if (index < 0) {
      warn(`[@visx/theme] useColorScale received "${key}" outside its domain; using index 0.`);
      return colors[0] ?? getCategoricalColor(theme.colors.categorical, 0);
    }

    return colors[index % colors.length] ?? getCategoricalColor(theme.colors.categorical, index);
  };
}
