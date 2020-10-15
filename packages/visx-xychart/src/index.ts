// components
export { default as AnimatedAxis } from './components/axis/AnimatedAxis';
export { default as AnimatedGrid } from './components/grid/AnimatedGrid';
export { default as Axis } from './components/axis/Axis';
export { default as Grid } from './components/grid/Grid';
export { default as Tooltip } from './components/Tooltip';
export { default as XYChart } from './components/XYChart';

// series components
export { default as BarGroup } from './components/series/BarGroup';
export { default as BarSeries } from './components/series/BarSeries';
export { default as BarStack } from './components/series/BarStack';
export { default as LineSeries } from './components/series/LineSeries';

// context
export { default as DataContext } from './context/DataContext';
export { default as EventEmitterContext } from './context/EventEmitterContext';
export { default as ThemeContext } from './context/ThemeContext';
export { default as TooltipContext } from './context/TooltipContext';

// providers
export { default as DataProvider } from './providers/DataProvider';
export { default as EventEmitterProvider } from './providers/EventEmitterProvider';
export { default as ThemeProvider } from './providers/ThemeProvider';
export { default as TooltipProvider } from './providers/TooltipProvider';

// hooks
export { default as useEventEmitter } from './hooks/useEventEmitter';

// themes
export { default as lightTheme } from './theme/themes/light';
export { default as darkTheme } from './theme/themes/dark';
export { default as buildChartTheme } from './theme/buildChartTheme';
export { allColors, grayColors, defaultColors } from './theme/colors';

// types
export * from './types';
