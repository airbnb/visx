import React from 'react';
import { XYChartTheme } from '@visx/xychart';
import { GlyphProps } from '@visx/xychart/lib/types';
import { AnimationTrajectory } from '@visx/react-spring/lib/types';
import { CityTemperature } from '@visx/mock-data/lib/mocks/cityTemperature';
import { curveLinear, curveStep, curveCardinal } from '@visx/curve';
import getAnimatedOrUnanimatedComponents from './getAnimatedOrUnanimatedComponents';
declare type Accessor = (d: CityTemperature) => number | string;
interface Accessors {
    'San Francisco': Accessor;
    'New York': Accessor;
    Austin: Accessor;
}
declare type DataKey = keyof Accessors;
declare type SimpleScaleConfig = {
    type: 'band' | 'linear';
    paddingInner?: number;
};
declare type ProvidedProps = {
    accessors: {
        x: Accessors;
        y: Accessors;
        date: Accessor;
    };
    animationTrajectory?: AnimationTrajectory;
    annotationDataKey: DataKey | null;
    annotationDatum?: CityTemperature;
    annotationLabelPosition: {
        dx: number;
        dy: number;
    };
    annotationType?: 'line' | 'circle';
    colorAccessorFactory: (key: DataKey) => (d: CityTemperature) => string | null;
    config: {
        x: SimpleScaleConfig;
        y: SimpleScaleConfig;
    };
    curve: typeof curveLinear | typeof curveCardinal | typeof curveStep;
    data: CityTemperature[];
    editAnnotationLabelPosition: boolean;
    numTicks: number;
    setAnnotationDataIndex: (index: number) => void;
    setAnnotationDataKey: (key: DataKey | null) => void;
    setAnnotationLabelPosition: (position: {
        dx: number;
        dy: number;
    }) => void;
    renderAreaSeries: boolean;
    renderAreaStack: boolean;
    renderBarGroup: boolean;
    renderBarSeries: boolean;
    renderBarStack: boolean;
    renderGlyph: React.FC<GlyphProps<CityTemperature>>;
    renderGlyphSeries: boolean;
    renderHorizontally: boolean;
    renderLineSeries: boolean;
    sharedTooltip: boolean;
    showGridColumns: boolean;
    showGridRows: boolean;
    showHorizontalCrosshair: boolean;
    showTooltip: boolean;
    showVerticalCrosshair: boolean;
    snapTooltipToDatumX: boolean;
    snapTooltipToDatumY: boolean;
    stackOffset?: 'wiggle' | 'expand' | 'diverging' | 'silhouette';
    theme: XYChartTheme;
    xAxisOrientation: 'top' | 'bottom';
    yAxisOrientation: 'left' | 'right';
} & ReturnType<typeof getAnimatedOrUnanimatedComponents>;
declare type ControlsProps = {
    children: (props: ProvidedProps) => React.ReactNode;
};
export default function ExampleControls({ children }: ControlsProps): JSX.Element;
export {};
//# sourceMappingURL=ExampleControls.d.ts.map