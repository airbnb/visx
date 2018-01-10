import * as vx from '../src';

describe('vx', () => {
  test('it should be defined', () => {
    expect(vx).toBeDefined();
  });

  test('it should export @vx/annotation', () => {
    expect(vx.LinePathAnnotation).toBeDefined();
  });

  test('it should export @vx/axis', () => {
    expect(vx.Axis).toBeDefined();
  });

  test('it should export @vx/bounds', () => {
    expect(vx.withBoundingRects).toBeDefined();
  });

  test('it should export @vx/boxplot', () => {
    expect(vx.BoxPlot).toBeDefined();
  });

  test('it should export @vx/brush', () => {
    expect(vx.withBrush).toBeDefined();
  });

  test('it should export @vx/clip-path', () => {
    expect(vx.ClipPath).toBeDefined();
  });

  test('it should export @vx/curve', () => {
    expect(vx.curveBasis).toBeDefined();
  });

  test('it should export @vx/drag', () => {
    expect(vx.Drag).toBeDefined();
  });

  test('it should export @vx/event', () => {
    expect(vx.localPoint).toBeDefined();
  });

  test('it should export @vx/geo', () => {
    expect(vx.Albers).toBeDefined();
  });

  test('it should export @vx/glyph', () => {
    expect(vx.Glyph).toBeDefined();
  });

  test('it should export @vx/gradient', () => {
    expect(vx.LinearGradient).toBeDefined();
  });

  test('it should export @vx/grid', () => {
    expect(vx.Grid).toBeDefined();
  });

  test('it should export @vx/group', () => {
    expect(vx.Group).toBeDefined();
  });

  test('it should export @vx/heatmap', () => {
    expect(vx.HeatmapRect).toBeDefined();
  });

  test('it should export @vx/hierarchy', () => {
    expect(vx.Tree).toBeDefined();
  });

  test('it should export @vx/legend', () => {
    expect(vx.Legend).toBeDefined();
  });

  test('it should export @vx/marker', () => {
    expect(vx.Marker).toBeDefined();
  });

  test('it should export @vx/mock-data', () => {
    expect(vx.genDateValue).toBeDefined();
  });

  test('it should export @vx/network', () => {
    expect(vx.Graph).toBeDefined();
  });

  test('it should export @vx/pattern', () => {
    expect(vx.Pattern).toBeDefined();
  });

  test('it should export @vx/point', () => {
    expect(vx.Point).toBeDefined();
  });

  test('it should export @vx/responsive', () => {
    expect(vx.withParentSize).toBeDefined();
  });

  test('it should export @vx/scale', () => {
    expect(vx.scaleBand).toBeDefined();
  });

  test('it should export @vx/shape', () => {
    expect(vx.Bar).toBeDefined();
  });

  test('it should export @vx/text', () => {
    expect(vx.Text).toBeDefined();
  });

  test('it should export @vx/tooltip', () => {
    expect(vx.Tooltip).toBeDefined();
  });

  test('it should export @vx/voronoi', () => {
    expect(vx.voronoi).toBeDefined();
  });

  test('it should export @vx/zoom', () => {
    expect(vx.Zoom).toBeDefined();
  });
});
