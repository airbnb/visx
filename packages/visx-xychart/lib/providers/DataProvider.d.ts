import { ScaleConfig } from '@visx/scale';
import React from 'react';
import { AxisScaleOutput } from '@visx/axis';
import { XYChartTheme } from '../types';
import { Dimensions } from '../hooks/useDimensions';
/** Props that can be passed to initialize/update the provider config. */
export declare type DataProviderProps<XScaleConfig extends ScaleConfig<AxisScaleOutput, any, any>, YScaleConfig extends ScaleConfig<AxisScaleOutput, any, any>> = {
    initialDimensions?: Partial<Dimensions>;
    theme?: XYChartTheme;
    xScale: XScaleConfig;
    yScale: YScaleConfig;
    children: React.ReactNode;
    horizontal?: boolean | 'auto';
};
export default function DataProvider<XScaleConfig extends ScaleConfig<AxisScaleOutput>, YScaleConfig extends ScaleConfig<AxisScaleOutput>, Datum extends object>({ initialDimensions, theme: propsTheme, xScale: xScaleConfig, yScale: yScaleConfig, children, horizontal: initialHorizontal, }: DataProviderProps<XScaleConfig, YScaleConfig>): JSX.Element;
//# sourceMappingURL=DataProvider.d.ts.map