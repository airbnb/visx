/* eslint-disable import/namespace */
import * as visx from '../src';

describe('visx', () => {
  it('should be defined', () => {
    expect(visx).toBeDefined();
  });

  it('should export @visx/annotation', () => {
    expect(visx.Annotation.LinePathAnnotation).toBeDefined();
  });

  it('should export @visx/axis', () => {
    expect(visx.Axis.Axis).toBeDefined();
  });

  it('should export @visx/bounds', () => {
    expect(visx.Bounds.withBoundingRects).toBeDefined();
  });

  it('should export @visx/clip-path', () => {
    expect(visx.ClipPath.ClipPath).toBeDefined();
  });

  it('should export @visx/curve', () => {
    expect(visx.Curve.curveBasis).toBeDefined();
  });

  it('should export @visx/drag', () => {
    expect(visx.Drag.Drag).toBeDefined();
  });

  it('should export @visx/event', () => {
    expect(visx.Event.localPoint).toBeDefined();
  });

  it('should export @visx/geo', () => {
    expect(visx.Geo.Albers).toBeDefined();
  });

  it('should export @visx/glyph', () => {
    expect(visx.Glyph.Glyph).toBeDefined();
  });

  it('should export @visx/gradient', () => {
    expect(visx.Gradient.LinearGradient).toBeDefined();
  });

  it('should export @visx/grid', () => {
    expect(visx.Grid.Grid).toBeDefined();
  });

  it('should export @visx/group', () => {
    expect(visx.Group.Group).toBeDefined();
  });

  it('should export @visx/heatmap', () => {
    expect(visx.Heatmap.HeatmapRect).toBeDefined();
  });

  it('should export @visx/hierarchy', () => {
    expect(visx.Hierarchy.Tree).toBeDefined();
  });

  it('should export @visx/legend', () => {
    expect(visx.Legend.Legend).toBeDefined();
  });

  it('should export @visx/marker', () => {
    expect(visx.Marker.Marker).toBeDefined();
  });

  it('should export @visx/mock-data', () => {
    expect(visx.MockData.genDateValue).toBeDefined();
  });

  it('should export @visx/network', () => {
    expect(visx.Network.Graph).toBeDefined();
  });

  it('should export @visx/pattern', () => {
    expect(visx.Pattern.Pattern).toBeDefined();
  });

  it('should export @visx/point', () => {
    expect(visx.Point.Point).toBeDefined();
  });

  it('should export @visx/responsive', () => {
    expect(visx.Responsive.withParentSize).toBeDefined();
  });

  it('should export @visx/scale', () => {
    expect(visx.Scale.scaleBand).toBeDefined();
  });

  it('should export @visx/shape', () => {
    expect(visx.Shape.Bar).toBeDefined();
  });

  it('should export @visx/text', () => {
    expect(visx.Text.Text).toBeDefined();
  });

  it('should export @visx/tooltip', () => {
    expect(visx.Tooltip.Tooltip).toBeDefined();
  });

  it('should export @visx/voronoi', () => {
    expect(visx.Voronoi.voronoi).toBeDefined();
  });

  it('should export @visx/xychart', () => {
    expect(visx.XYChart.XYChart).toBeDefined();
  });

  it('should export @visx/zoom', () => {
    expect(visx.Zoom.Zoom).toBeDefined();
  });

  it('should export @visx/wordcloud', () => {
    expect(visx.Wordcloud.Wordcloud).toBeDefined();
  });
});
