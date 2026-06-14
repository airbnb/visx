import type { XYChartTheme } from '@visx/xychart';
import type { XYChartThemeLike } from '../src';

type AssertAssignable<T extends XYChartThemeLike> = T;

export type XYChartThemeStillMatchesAdapterInput = AssertAssignable<XYChartTheme>;
