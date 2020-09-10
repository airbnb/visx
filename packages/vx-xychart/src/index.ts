// components
export { default as XYChart } from './components/XYChart';
export { default as LineSeries } from './components/series/LineSeries';
export { default as Axis } from './components/axis/Axis';
export { default as AnimatedAxis } from './components/axis/AnimatedAxis';

// context
export { default as ThemeContext } from './context/ThemeContext';
export { default as DataContext } from './context/DataContext';

// providers
export { default as ThemeProvider } from './providers/ThemeProvider';
export { default as DataProvider } from './providers/DataProvider';

// themes
export { default as lightTheme } from './theme/themes/light';
export { default as darkTheme } from './theme/themes/dark';
export { default as buildChartTheme } from './theme/buildChartTheme';
export { allColors, grayColors, defaultColors } from './theme/colors';

// types
export * from './types';
