/* eslint-disable import/namespace */
import * as visx from '../src';

describe('visx', () => {
  it('should be defined', () => {
    expect(visx).toBeDefined();
  });

  it('should export @visx/annotation', () => {
    expect(visx.LinePathAnnotation).toBeDefined();
  });

  it('should export @visx/axis', () => {
    expect(visx.Axis).toBeDefined();
  });

  it('should export @visx/bounds', () => {
    expect(visx.withBoundingRects).toBeDefined();
  });

  it('should export @visx/clip-path', () => {
    expect(visx.ClipPath).toBeDefined();
  });

  it('should export @visx/curve', () => {
    expect(visx.curveBasis).toBeDefined();
  });

  it('should export @visx/drag', () => {
    expect(visx.Drag).toBeDefined();
  });

  it('should export @visx/event', () => {
    expect(visx.localPoint).toBeDefined();
  });

  it('should export @visx/geo', () => {
    expect(visx.Albers).toBeDefined();
  });

  it('should export @visx/glyph', () => {
    expect(visx.Glyph).toBeDefined();
  });

  it('should export @visx/gradient', () => {
    expect(visx.LinearGradient).toBeDefined();
  });

  it('should export @visx/grid', () => {
    expect(visx.Grid).toBeDefined();
  });

  it('should export @visx/group', () => {
    expect(visx.Group).toBeDefined();
  });

  it('should export @visx/heatmap', () => {
    expect(visx.HeatmapRect).toBeDefined();
  });

  it('should export @visx/hierarchy', () => {
    expect(visx.Tree).toBeDefined();
  });

  it('should export @visx/legend', () => {
    expect(visx.Legend).toBeDefined();
  });

  it('should export @visx/marker', () => {
    expect(visx.Marker).toBeDefined();
  });

  it('should export @visx/mock-data', () => {
    expect(visx.genDateValue).toBeDefined();
  });

  it('should export @visx/network', () => {
    expect(visx.Graph).toBeDefined();
  });

  it('should export @visx/pattern', () => {
    expect(visx.Pattern).toBeDefined();
  });

  it('should export @visx/point', () => {
    expect(visx.Point).toBeDefined();
  });

  it('should export @visx/responsive', () => {
    expect(visx.withParentSize).toBeDefined();
  });

  it('should export @visx/scale', () => {
    expect(visx.scaleBand).toBeDefined();
  });

  it('should export @visx/shape', () => {
    expect(visx.Bar).toBeDefined();
  });

  it('should export @visx/text', () => {
    expect(visx.Text).toBeDefined();
  });

  it('should export @visx/tooltip', () => {
    expect(visx.Tooltip).toBeDefined();
  });

  it('should export @visx/voronoi', () => {
    expect(visx.voronoi).toBeDefined();
  });

  it('should export @visx/xychart', () => {
    expect(visx.XYChart.XYChart).toBeDefined();
  });

  it('should export @visx/zoom', () => {
    expect(visx.Zoom).toBeDefined();
  });
});
