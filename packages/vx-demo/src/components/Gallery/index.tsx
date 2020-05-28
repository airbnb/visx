import React from 'react';
import Tilt from 'react-tilt';

import AreaTile from './AreaTile';
import AxisTile from './AxisTile';
import BarGroupHorizontalTile from './BarGroupHorizontalTile';
import BarGroupTile from './BarGroupTile';
import BarStackHorizontalTile from './BarStackHorizontalTile';
import BarStackTile from './BarStackTile';
import BarsTile from './BarsTile';
import BrushTile from './BrushTile';
import ChordTile from './ChordTile';
import CurvesTile from './CurvesTile';
import DendrogramsTile from './DendrogramsTile';
import DotsTile from './DotsTile';
import DragIITile from './DragIITile';
import DragITile from './DragITile';
import GeoCustomTile from './GeoCustomTile';
import GeoMercatorTile from './GeoMercatorTile';
import GlyphsTile from './GlyphsTile';
import GradientsTile from './GradientsTile';
import HeatmapsTile from './HeatmapsTile';
import LegendsTile from './LegendsTile';
import LineRadialTile from './LineRadialTile';
import LinkTypesTile from './LinkTypesTile';
import NetworkTile from './NetworkTile';
import PackTile from './PackTile';
import PatternsTile from './PatternsTile';
import PiesTile from './PiesTile';
import PolygonsTile from './PolygonsTile';
import RadarTile from './RadarTile';
import ResponsiveTile from './ResponsiveTile';
import StackedAreasTile from './StackedAreasTile';
import StatsPlotTile from './StatsPlotTile';
import StreamGraphTile from './StreamGraphTile';
import TextTile from './TextTile';
import ThresholdTile from './ThresholdTile';
import TreemapTile from './TreemapTile';
import TreesTile from './TreesTile';
import VoronoiTile from './VoronoiTile';
import ZoomITile from './ZoomITile';

const tiles = [
  AreaTile,
  AxisTile,
  BarGroupTile,
  BarGroupHorizontalTile,
  BarStackTile,
  BarStackHorizontalTile,
  BarsTile,
  BrushTile,
  ChordTile,
  CurvesTile,
  DendrogramsTile,
  DotsTile,
  DragIITile,
  DragITile,
  GeoCustomTile,
  GeoMercatorTile,
  GlyphsTile,
  GradientsTile,
  HeatmapsTile,
  LegendsTile,
  LineRadialTile,
  LinkTypesTile,
  NetworkTile,
  PackTile,
  PatternsTile,
  PiesTile,
  PolygonsTile,
  RadarTile,
  ResponsiveTile,
  StackedAreasTile,
  StatsPlotTile,
  StreamGraphTile,
  TextTile,
  ThresholdTile,
  TreemapTile,
  TreesTile,
  VoronoiTile,
  ZoomITile,
];
const tiltOptions = { max: 8, scale: 1 };

export default function Gallery() {
  return (
    <>
      <div className="gallery">
        {tiles.map((Tile, i) => (
          <Tilt key={`tile-${i}`} className="tilt" options={tiltOptions}>
            <Tile />
          </Tilt>
        ))}
      </div>
      <style jsx>{`
        .gallery {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          overflow-x: hidden;
          padding-bottom: 20px;
        }
      `}</style>
    </>
  );
}
