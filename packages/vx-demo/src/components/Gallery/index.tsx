import React, { useState } from 'react';
import Tilt from 'react-tilt';

import * as AreaTile from './AreaTile';
import * as AxisTile from './AxisTile';
import * as BarGroupHorizontalTile from './BarGroupHorizontalTile';
import * as BarGroupTile from './BarGroupTile';
import * as BarStackHorizontalTile from './BarStackHorizontalTile';
import * as BarStackTile from './BarStackTile';
import * as BarsTile from './BarsTile';
import * as BrushTile from './BrushTile';
import * as ChordTile from './ChordTile';
import * as CurvesTile from './CurvesTile';
import * as DendrogramsTile from './DendrogramsTile';
import * as DotsTile from './DotsTile';
import * as DragIITile from './DragIITile';
import * as DragITile from './DragITile';
import * as GeoCustomTile from './GeoCustomTile';
import * as GeoMercatorTile from './GeoMercatorTile';
import * as GlyphsTile from './GlyphsTile';
import * as GradientsTile from './GradientsTile';
import * as GridTile from './GridTile';
import * as HeatmapsTile from './HeatmapsTile';
import * as LegendsTile from './LegendsTile';
import * as LineRadialTile from './LineRadialTile';
import * as LinkTypesTile from './LinkTypesTile';
import * as NetworkTile from './NetworkTile';
import * as PackTile from './PackTile';
import * as PatternsTile from './PatternsTile';
import * as PiesTile from './PiesTile';
import * as PolygonsTile from './PolygonsTile';
import * as RadarTile from './RadarTile';
import * as ResponsiveTile from './ResponsiveTile';
import * as StackedAreasTile from './StackedAreasTile';
import * as StatsPlotTile from './StatsPlotTile';
import * as StreamGraphTile from './StreamGraphTile';
import * as TextTile from './TextTile';
import * as ThresholdTile from './ThresholdTile';
import * as TreemapTile from './TreemapTile';
import * as TreesTile from './TreesTile';
import * as VoronoiTile from './VoronoiTile';
import * as ZoomITile from './ZoomITile';
import { VxPackage } from '../../types';
import exampleToVxDependencyLookup, {
  vxPackages,
} from '../../sandboxes/exampleToVxDependencyLookup';

const tiltOptions = { max: 8, scale: 1 };

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
  GridTile,
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

export default function Gallery() {
  const [activePackageFilter, setActivePackageFilter] = useState<VxPackage | null>(null);
  const filteredTiles = activePackageFilter
    ? tiles.filter(Tile =>
        exampleToVxDependencyLookup[Tile.packageJson.name]?.has(activePackageFilter),
      )
    : tiles;

  return (
    <>
      <div className="gallery">
        <div className="filters">
          <h6>Examples by package</h6>
          {vxPackages.map(vxPackage => (
            <button
              key={vxPackage}
              className={activePackageFilter === vxPackage ? 'emphasize' : undefined}
              onClick={() =>
                setActivePackageFilter(activePackageFilter === vxPackage ? null : vxPackage)
              }
            >
              @vx/{vxPackage}
            </button>
          ))}
        </div>
        <div className="grid">
          {filteredTiles.map((Tile, i) => (
            <Tilt key={`tile-${i}`} className="tilt" options={tiltOptions}>
              <Tile.default />
            </Tilt>
          ))}
        </div>
      </div>
      <style jsx>{`
        .gallery {
          display: flex;
          flex-direction: row;
        }
        .grid {
          width: 100%;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          overflow-x: hidden;
          padding-bottom: 40px;
        }
        .filters {
          margin-right: 24px;
          width: 150px;
          flex-shrink: 0;
        }
        h6 {
          margin: 0 4px 0 0;
        }
        button {
          display: block;
          cursor: pointer;
          border: none;
          outline: none;
          background: transparent;
          color: #fc2e1c;
          padding: 0;
          margin: 4px 4px 12px 0;
        }
        .emphasize {
          font-weight: bold;
        }
        @media (min-width: 800px) {
          .emphasize::before {
            content: '';
            padding-left: 4px;
            border-left: 2px solid #fc2e1c;
          }
        }
        @media (max-width: 800px) {
          .gallery {
            flex-direction: column;
            min-width: 90vw;
            max-width: 90vw;
            margin: 0;
          }
          .filters {
            display: flex;
            flex-wrap: wrap;
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </>
  );
}
