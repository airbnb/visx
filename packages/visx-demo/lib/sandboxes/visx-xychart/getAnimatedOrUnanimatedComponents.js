import { 
// animated
AnimatedAnnotation, AnimatedAreaSeries, AnimatedAreaStack, AnimatedAxis, AnimatedBarGroup, AnimatedBarSeries, AnimatedBarStack, AnimatedGlyphSeries, AnimatedGrid, AnimatedLineSeries, 
// not animated
Annotation, AreaSeries, AreaStack, Axis, BarGroup, BarSeries, BarStack, GlyphSeries, Grid, LineSeries, 
// no animated equivalents
AnnotationCircleSubject, AnnotationConnector, AnnotationLabel, AnnotationLineSubject, Tooltip, XYChart, } from '@visx/xychart';
export default function getAnimatedOrUnanimatedComponents(animated) {
    return animated
        ? {
            Annotation: AnimatedAnnotation,
            AreaSeries: AnimatedAreaSeries,
            AreaStack: AnimatedAreaStack,
            Axis: AnimatedAxis,
            BarGroup: AnimatedBarGroup,
            BarSeries: AnimatedBarSeries,
            BarStack: AnimatedBarStack,
            GlyphSeries: AnimatedGlyphSeries,
            Grid: AnimatedGrid,
            LineSeries: AnimatedLineSeries,
            AnnotationCircleSubject: AnnotationCircleSubject,
            AnnotationConnector: AnnotationConnector,
            AnnotationLabel: AnnotationLabel,
            AnnotationLineSubject: AnnotationLineSubject,
            Tooltip: Tooltip,
            XYChart: XYChart,
        }
        : {
            Annotation: Annotation,
            AreaSeries: AreaSeries,
            AreaStack: AreaStack,
            Axis: Axis,
            BarGroup: BarGroup,
            BarSeries: BarSeries,
            BarStack: BarStack,
            GlyphSeries: GlyphSeries,
            Grid: Grid,
            LineSeries: LineSeries,
            AnnotationCircleSubject: AnnotationCircleSubject,
            AnnotationConnector: AnnotationConnector,
            AnnotationLabel: AnnotationLabel,
            AnnotationLineSubject: AnnotationLineSubject,
            Tooltip: Tooltip,
            XYChart: XYChart,
        };
}
