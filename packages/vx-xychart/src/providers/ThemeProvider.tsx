import React from 'react';
import ThemeContext from '../context/ThemeContext';
import { XYChartTheme } from '../types';

export type ThemeProviderProps = {
  theme?: XYChartTheme;
  children: React.ReactNode;
};

export default function ThemeProvider({ theme, children }: ThemeProviderProps) {
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}
