/* eslint-disable import/namespace */
import * as visx from '../src';
import * as annotation from '../src/annotation';
import * as axis from '../src/axis';
import * as bounds from '../src/bounds';
import * as brush from '../src/brush';
import * as clipPath from '../src/clip-path';
import * as curve from '../src/curve';
import * as drag from '../src/drag';
import * as event from '../src/event';
import * as geo from '../src/geo';
import * as glyph from '../src/glyph';
import * as gradient from '../src/gradient';
import * as grid from '../src/grid';
import * as group from '../src/group';
import * as heatmap from '../src/heatmap';
import * as hierarchy from '../src/hierarchy';
import * as legend from '../src/legend';
import * as marker from '../src/marker';
import * as mockData from '../src/mock-data';
import * as network from '../src/network';
import * as pattern from '../src/pattern';
import * as point from '../src/point';
import * as responsive from '../src/responsive';
import * as scale from '../src/scale';
import * as shape from '../src/shape';
import * as text from '../src/text';
import * as tooltip from '../src/tooltip';
import * as voronoi from '../src/voronoi';
import * as xychart from '../src/xychart';
import * as zoom from '../src/zoom';

describe('visx', () => {
  it('should be defined', () => {
    expect(visx).toBeDefined();
  });

  it('should export @visx/annotation', () => {
    expect(visx.LinePathAnnotation).toBeDefined();
    expect(annotation.LinePathAnnotation).toBeDefined();
  });

  it('should export @visx/axis', () => {
    expect(visx.Axis).toBeDefined();
    expect(axis.Axis).toBeDefined();
  });

  it('should export @visx/bounds', () => {
    expect(visx.withBoundingRects).toBeDefined();
    expect(bounds.withBoundingRects).toBeDefined();
  });

  it('should export @visx/brush', () => {
    expect(visx.Brush).toBeDefined();
    expect(brush.Brush).toBeDefined();
  });

  it('should export @visx/clip-path', () => {
    expect(visx.ClipPath).toBeDefined();
    expect(clipPath.ClipPath).toBeDefined();
  });

  it('should export @visx/curve', () => {
    expect(visx.curveBasis).toBeDefined();
    expect(curve.curveBasis).toBeDefined();
  });

  it('should export @visx/drag', () => {
    expect(visx.Drag).toBeDefined();
    expect(drag.Drag).toBeDefined();
  });

  it('should export @visx/event', () => {
    expect(visx.localPoint).toBeDefined();
    expect(event.localPoint).toBeDefined();
  });

  it('should export @visx/geo', () => {
    expect(visx.Albers).toBeDefined();
    expect(geo.Albers).toBeDefined();
  });

  it('should export @visx/glyph', () => {
    expect(visx.Glyph).toBeDefined();
    expect(glyph.Glyph).toBeDefined();
  });

  it('should export @visx/gradient', () => {
    expect(visx.LinearGradient).toBeDefined();
    expect(gradient.LinearGradient).toBeDefined();
  });

  it('should export @visx/grid', () => {
    expect(visx.Grid).toBeDefined();
    expect(grid.Grid).toBeDefined();
  });

  it('should export @visx/group', () => {
    expect(visx.Group).toBeDefined();
    expect(group.Group).toBeDefined();
  });

  it('should export @visx/heatmap', () => {
    expect(visx.HeatmapRect).toBeDefined();
    expect(heatmap.HeatmapRect).toBeDefined();
  });

  it('should export @visx/hierarchy', () => {
    expect(visx.Tree).toBeDefined();
    expect(hierarchy.Tree).toBeDefined();
  });

  it('should export @visx/legend', () => {
    expect(visx.Legend).toBeDefined();
    expect(legend.Legend).toBeDefined();
  });

  it('should export @visx/marker', () => {
    expect(visx.Marker).toBeDefined();
    expect(marker.Marker).toBeDefined();
  });

  it('should export @visx/mock-data', () => {
    expect(visx.genDateValue).toBeDefined();
    expect(mockData.genDateValue).toBeDefined();
  });

  it('should export @visx/network', () => {
    expect(visx.Graph).toBeDefined();
    expect(network.Graph).toBeDefined();
  });

  it('should export @visx/pattern', () => {
    expect(visx.Pattern).toBeDefined();
    expect(pattern.Pattern).toBeDefined();
  });

  it('should export @visx/point', () => {
    expect(visx.Point).toBeDefined();
    expect(point.Point).toBeDefined();
  });

  it('should export @visx/responsive', () => {
    expect(visx.withParentSize).toBeDefined();
    expect(responsive.withParentSize).toBeDefined();
  });

  it('should export @visx/scale', () => {
    expect(visx.scaleBand).toBeDefined();
    expect(scale.scaleBand).toBeDefined();
  });

  it('should export @visx/shape', () => {
    expect(visx.Bar).toBeDefined();
    expect(shape.Bar).toBeDefined();
  });

  it('should export @visx/text', () => {
    expect(visx.Text).toBeDefined();
    expect(text.Text).toBeDefined();
  });

  it('should export @visx/tooltip', () => {
    expect(visx.Tooltip).toBeDefined();
    expect(tooltip.Tooltip).toBeDefined();
  });

  it('should export @visx/voronoi', () => {
    expect(visx.voronoi).toBeDefined();
    expect(voronoi.voronoi).toBeDefined();
  });

  it('should export @visx/xychart', () => {
    expect(xychart.XYChart).toBeDefined();
  });

  it('should export @visx/zoom', () => {
    expect(visx.Zoom).toBeDefined();
    expect(zoom.Zoom).toBeDefined();
  });
});
