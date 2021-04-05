import { AnimatedAnnotation, AnimatedAreaSeries, AnimatedAreaStack, AnimatedAxis, AnimatedBarGroup, AnimatedBarSeries, AnimatedBarStack, AnimatedGlyphSeries, AnimatedGrid, AnimatedLineSeries, AnnotationCircleSubject, AnnotationConnector, AnnotationLabel, AnnotationLineSubject, Tooltip, XYChart } from '@visx/xychart';
export default function getAnimatedOrUnanimatedComponents(animated?: boolean): {
    Annotation: typeof AnimatedAnnotation;
    AreaSeries: typeof AnimatedAreaSeries;
    AreaStack: typeof AnimatedAreaStack;
    Axis: typeof AnimatedAxis;
    BarGroup: typeof AnimatedBarGroup;
    BarSeries: typeof AnimatedBarSeries;
    BarStack: typeof AnimatedBarStack;
    GlyphSeries: typeof AnimatedGlyphSeries;
    Grid: typeof AnimatedGrid;
    LineSeries: typeof AnimatedLineSeries;
    AnnotationCircleSubject: typeof AnnotationCircleSubject;
    AnnotationConnector: typeof AnnotationConnector;
    AnnotationLabel: typeof AnnotationLabel;
    AnnotationLineSubject: typeof AnnotationLineSubject;
    Tooltip: typeof Tooltip;
    XYChart: typeof XYChart;
};
//# sourceMappingURL=getAnimatedOrUnanimatedComponents.d.ts.map