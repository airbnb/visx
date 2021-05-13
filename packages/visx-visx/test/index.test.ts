/* eslint-disable import/namespace */
import * as visx from "../src";

describe("visx", () => {
  it("should be defined", () => {
    expect(visx).toBeDefined();
  });

  it("should export @seygai/visx-annotation", () => {
    expect(visx.LinePathAnnotation).toBeDefined();
  });

  it("should export @seygai/visx-axis", () => {
    expect(visx.Axis).toBeDefined();
  });

  it("should export @seygai/visx-bounds", () => {
    expect(visx.withBoundingRects).toBeDefined();
  });

  it("should export @seygai/visx-clip-path", () => {
    expect(visx.ClipPath).toBeDefined();
  });

  it("should export @seygai/visx-curve", () => {
    expect(visx.curveBasis).toBeDefined();
  });

  it("should export @seygai/visx-drag", () => {
    expect(visx.Drag).toBeDefined();
  });

  it("should export @seygai/visx-event", () => {
    expect(visx.localPoint).toBeDefined();
  });

  it("should export @seygai/visx-geo", () => {
    expect(visx.Albers).toBeDefined();
  });

  it("should export @seygai/visx-glyph", () => {
    expect(visx.Glyph).toBeDefined();
  });

  it("should export @seygai/visx-gradient", () => {
    expect(visx.LinearGradient).toBeDefined();
  });

  it("should export @seygai/visx-grid", () => {
    expect(visx.Grid).toBeDefined();
  });

  it("should export @seygai/visx-group", () => {
    expect(visx.Group).toBeDefined();
  });

  it("should export @seygai/visx-heatmap", () => {
    expect(visx.HeatmapRect).toBeDefined();
  });

  it("should export @seygai/visx-hierarchy", () => {
    expect(visx.Tree).toBeDefined();
  });

  it("should export @seygai/visx-legend", () => {
    expect(visx.Legend).toBeDefined();
  });

  it("should export @seygai/visx-marker", () => {
    expect(visx.Marker).toBeDefined();
  });

  it("should export @seygai/visx-mock-data", () => {
    expect(visx.genDateValue).toBeDefined();
  });

  it("should export @seygai/visx-network", () => {
    expect(visx.Graph).toBeDefined();
  });

  it("should export @seygai/visx-pattern", () => {
    expect(visx.Pattern).toBeDefined();
  });

  it("should export @seygai/visx-point", () => {
    expect(visx.Point).toBeDefined();
  });

  it("should export @seygai/visx-responsive", () => {
    expect(visx.withParentSize).toBeDefined();
  });

  it("should export @seygai/visx-scale", () => {
    expect(visx.scaleBand).toBeDefined();
  });

  it("should export @seygai/visx-shape", () => {
    expect(visx.Bar).toBeDefined();
  });

  it("should export @seygai/visx-text", () => {
    expect(visx.Text).toBeDefined();
  });

  it("should export @seygai/visx-tooltip", () => {
    expect(visx.Tooltip).toBeDefined();
  });

  it("should export @seygai/visx-voronoi", () => {
    expect(visx.voronoi).toBeDefined();
  });

  it("should export @seygai/visx-xychart", () => {
    expect(visx.XYChart.XYChart).toBeDefined();
  });

  it("should export @seygai/visx-zoom", () => {
    expect(visx.Zoom).toBeDefined();
  });
});
