import React from 'react';
import { XYChartTheme } from '../types';
import lightTheme from '../theme/themes/light';

const ThemeContext = React.createContext<XYChartTheme>(lightTheme);

export default ThemeContext;
