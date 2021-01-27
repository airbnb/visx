import {
  // animated
  AnimatedAnnotation,
  AnimatedAreaSeries,
  AnimatedAreaStack,
  AnimatedAxis,
  AnimatedBarGroup,
  AnimatedBarSeries,
  AnimatedBarStack,
  AnimatedGlyphSeries,
  AnimatedGrid,
  AnimatedLineSeries,

  // not animated
  Annotation,
  AreaSeries,
  AreaStack,
  Axis,
  BarGroup,
  BarSeries,
  BarStack,
  GlyphSeries,
  Grid,
  LineSeries,

  // no animated equivalents
  AnnotationCircleSubject,
  AnnotationConnector,
  AnnotationLabel,
  AnnotationLineSubject,
  Tooltip,
  XYChart,
} from '@visx/xychart';

export default function getAnimatedOrUnanimatedComponents(animated?: boolean) {
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
        AnnotationCircleSubject,
        AnnotationConnector,
        AnnotationLabel,
        AnnotationLineSubject,
        Tooltip,
        XYChart,
      }
    : {
        Annotation,
        AreaSeries,
        AreaStack,
        Axis,
        BarGroup,
        BarSeries,
        BarStack,
        GlyphSeries,
        Grid,
        LineSeries,
        AnnotationCircleSubject,
        AnnotationConnector,
        AnnotationLabel,
        AnnotationLineSubject,
        Tooltip,
        XYChart,
      };
}
