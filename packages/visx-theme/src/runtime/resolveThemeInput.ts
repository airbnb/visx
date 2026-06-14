import darkTheme from '../tokens/dark';
import lightTheme from '../tokens/light';
import type { VisxThemeDefinition, VisxThemeInput } from '../tokens/types';

export function resolveThemeInput(theme: VisxThemeInput = 'auto'): VisxThemeDefinition {
  if (theme === 'auto' || theme === 'light') {
    return lightTheme;
  }

  if (theme === 'dark') {
    return darkTheme;
  }

  return theme;
}

export function resolveRuntimeThemeName(theme: VisxThemeInput = 'auto'): string {
  return theme === 'auto' ? 'auto' : resolveThemeInput(theme).name;
}
