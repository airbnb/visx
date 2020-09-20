/* eslint-disable import/namespace */
import * as visx from '../src';

describe('visx', () => {
  test('it should be defined', () => {
    expect(visx).toBeDefined();
  });

  test('it should export @visx/annotation', () => {
    expect(visx.LinePathAnnotation).toBeDefined();
  });

  test('it should export @visx/axis', () => {
    expect(visx.Axis).toBeDefined();
  });

  test('it should export @visx/bounds', () => {
    expect(visx.withBoundingRects).toBeDefined();
  });

  test('it should export @visx/clip-path', () => {
    expect(visx.ClipPath).toBeDefined();
  });

  test('it should export @visx/curve', () => {
    expect(visx.curveBasis).toBeDefined();
  });

  test('it should export @visx/drag', () => {
    expect(visx.Drag).toBeDefined();
  });

  test('it should export @visx/event', () => {
    expect(visx.localPoint).toBeDefined();
  });

  test('it should export @visx/geo', () => {
    expect(visx.Albers).toBeDefined();
  });

  test('it should export @visx/glyph', () => {
    expect(visx.Glyph).toBeDefined();
  });

  test('it should export @visx/gradient', () => {
    expect(visx.LinearGradient).toBeDefined();
  });

  test('it should export @visx/grid', () => {
    expect(visx.Grid).toBeDefined();
  });

  test('it should export @visx/group', () => {
    expect(visx.Group).toBeDefined();
  });

  test('it should export @visx/heatmap', () => {
    expect(visx.HeatmapRect).toBeDefined();
  });

  test('it should export @visx/hierarchy', () => {
    expect(visx.Tree).toBeDefined();
  });

  test('it should export @visx/legend', () => {
    expect(visx.Legend).toBeDefined();
  });

  test('it should export @visx/marker', () => {
    expect(visx.Marker).toBeDefined();
  });

  test('it should export @visx/mock-data', () => {
    expect(visx.genDateValue).toBeDefined();
  });

  test('it should export @visx/network', () => {
    expect(visx.Graph).toBeDefined();
  });

  test('it should export @visx/pattern', () => {
    expect(visx.Pattern).toBeDefined();
  });

  test('it should export @visx/point', () => {
    expect(visx.Point).toBeDefined();
  });

  test('it should export @visx/responsive', () => {
    expect(visx.withParentSize).toBeDefined();
  });

  test('it should export @visx/scale', () => {
    expect(visx.scaleBand).toBeDefined();
  });

  test('it should export @visx/shape', () => {
    expect(visx.Bar).toBeDefined();
  });

  test('it should export @visx/text', () => {
    expect(visx.Text).toBeDefined();
  });

  test('it should export @visx/tooltip', () => {
    expect(visx.Tooltip).toBeDefined();
  });

  test('it should export @visx/voronoi', () => {
    expect(visx.voronoi).toBeDefined();
  });

  test('it should export @visx/zoom', () => {
    expect(visx.Zoom).toBeDefined();
  });
});
