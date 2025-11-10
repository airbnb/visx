import { createContext } from 'react';
import type { XYChartTheme } from '../types';
import lightTheme from '../theme/themes/light';

const ThemeContext = createContext<XYChartTheme>(lightTheme);

export default ThemeContext;
