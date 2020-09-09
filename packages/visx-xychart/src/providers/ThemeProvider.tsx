import React from 'react';
import ThemeContext from '../context/ThemeContext';
import { XYChartTheme } from '../types';
import lightTheme from '../theme/themes/light';

export type ThemeProviderProps = {
  theme?: XYChartTheme;
  children: React.ReactNode | React.FC | React.Component;
};

export default function ThemeProvider({ theme = lightTheme, children }: ThemeProviderProps) {
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}
