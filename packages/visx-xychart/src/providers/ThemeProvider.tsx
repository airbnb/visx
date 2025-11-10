import type { ReactNode } from 'react';
import ThemeContext from '../context/ThemeContext';
import type { XYChartTheme } from '../types';
import lightTheme from '../theme/themes/light';

export type ThemeProviderProps = {
  theme?: XYChartTheme;
  children: ReactNode;
};

export default function ThemeProvider({ theme = lightTheme, children }: ThemeProviderProps) {
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}
