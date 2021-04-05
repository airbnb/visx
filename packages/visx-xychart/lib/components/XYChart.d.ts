import React from 'react';
import { AxisScaleOutput } from '@visx/axis';
import { ScaleConfig } from '@visx/scale';
import { Margin, EventHandlerParams } from '../types';
import { DataProviderProps } from '../providers/DataProvider';
export declare type XYChartProps<XScaleConfig extends ScaleConfig<AxisScaleOutput, any, any>, YScaleConfig extends ScaleConfig<AxisScaleOutput, any, any>, Datum extends object> = {
    /** aria-label for the chart svg element. */
    accessibilityLabel?: string;
    /** Whether to capture and dispatch pointer events to EventEmitter context (which e.g., Series subscribe to). */
    captureEvents?: boolean;
    /** Total width of the desired chart svg, including margin. */
    width?: number;
    /** Total height of the desired chart svg, including margin. */
    height?: number;
    /** Margin to apply around the outside the. */
    margin?: Margin;
    /** XYChart children (Series, Tooltip, etc.). */
    children: React.ReactNode;
    /** If DataContext is not available, XYChart will wrap itself in a DataProvider and set this as the theme. */
    theme?: DataProviderProps<XScaleConfig, YScaleConfig>['theme'];
    /** If DataContext is not available, XYChart will wrap itself in a DataProvider and set this as the xScale config. */
    xScale?: DataProviderProps<XScaleConfig, YScaleConfig>['xScale'];
    /** If DataContext is not available, XYChart will wrap itself in a DataProvider and set this as the yScale config. */
    yScale?: DataProviderProps<XScaleConfig, YScaleConfig>['yScale'];
    horizontal?: boolean | 'auto';
    /** Callback invoked for onPointerMove events for the nearest Datum to the PointerEvent _for each Series with pointerEvents={true}_. */
    onPointerMove?: ({ datum, distanceX, distanceY, event, index, key, svgPoint, }: EventHandlerParams<Datum>) => void;
    /** Callback invoked for onPointerOut events for the nearest Datum to the PointerEvent _for each Series with pointerEvents={true}_. */
    onPointerOut?: (
    /** The PointerEvent. */
    event: React.PointerEvent) => void;
    /** Callback invoked for onPointerUp events for the nearest Datum to the PointerEvent _for each Series with pointerEvents={true}_. */
    onPointerUp?: ({ datum, distanceX, distanceY, event, index, key, svgPoint, }: EventHandlerParams<Datum>) => void;
    /** Whether to invoke PointerEvent handlers for all dataKeys, or the nearest dataKey. */
    pointerEventsDataKey?: 'all' | 'nearest';
};
export default function XYChart<XScaleConfig extends ScaleConfig<AxisScaleOutput, any, any>, YScaleConfig extends ScaleConfig<AxisScaleOutput, any, any>, Datum extends object>(props: XYChartProps<XScaleConfig, YScaleConfig, Datum>): JSX.Element | null;
//# sourceMappingURL=XYChart.d.ts.map