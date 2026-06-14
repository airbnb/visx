import ThemeScope from '../provider/ThemeScope';
import type { ThemeScopeProps } from '../provider/ThemeScope';
import createRuntimeTheme from '../runtime/createRuntimeTheme';
import ThemeContext from './ThemeContext';

export type ThemeProviderProps = ThemeScopeProps;

export default function ThemeProvider(props: ThemeProviderProps) {
  const runtimeTheme = createRuntimeTheme(props.theme ?? 'auto');

  return (
    <ThemeContext.Provider value={runtimeTheme}>
      <ThemeScope {...props} />
    </ThemeContext.Provider>
  );
}
