import type { VisxThemeRuntime } from '../tokens/types';
import { getCategoricalColor, normalizeCategoricalIndex } from './categoricalColor';
import useTheme from './useTheme';

export type ColorTokenName = Exclude<keyof VisxThemeRuntime['colors'], 'categorical'>;

export default function useColor(color: ColorTokenName | number): string {
  const theme = useTheme();

  if (typeof color === 'number') {
    return getCategoricalColor(
      theme.colors.categorical,
      normalizeCategoricalIndex(color, 'useColor'),
    );
  }

  return theme.colors[color];
}
