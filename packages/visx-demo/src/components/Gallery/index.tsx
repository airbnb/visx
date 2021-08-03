import React from 'react';
import cx from 'classnames';
import Tilt from 'react-tilt';
import Link from 'next/link';
import { useRouter } from 'next/router';

import * as AnnotationTile from './AnnotationTile';
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
import * as GeoAlbersUsaTile from './GeoAlbersUsaTile';
import * as GeoMercatorTile from './GeoMercatorTile';
import * as GlyphsTile from './GlyphsTile';
import * as GradientsTile from './GradientsTile';
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
import * as SplitLinePathTile from './SplitLinePathTile';
import * as StackedAreasTile from './StackedAreasTile';
import * as StatsPlotTile from './StatsPlotTile';
import * as StreamGraphTile from './StreamGraphTile';
import * as TextTile from './TextTile';
import * as ThresholdTile from './ThresholdTile';
import * as TooltipTile from './TooltipTile';
import * as TreemapTile from './TreemapTile';
import * as TreesTile from './TreesTile';
import * as VoronoiTile from './VoronoiTile';
import * as XYChartTile from './XYChartTile';
import * as ZoomITile from './ZoomITile';
import { VisxPackage } from '../../types';
import exampleToVisxDependencyLookup, {
  visxPackages,
} from '../../sandboxes/exampleToVisxDependencyLookup';

const tiltOptions = { max: 8, scale: 1 };

export const tiles = [
  CurvesTile,
  BarsTile,
  DotsTile,
  PatternsTile,
  AreaTile,
  StackedAreasTile,
  AxisTile,
  ChordTile,
  StreamGraphTile,
  LegendsTile,
  ThresholdTile,
  AnnotationTile,
  TreemapTile,
  ZoomITile,
  LineRadialTile,
  DragITile,
  BarGroupTile,
  BarGroupHorizontalTile,
  PiesTile,
  BrushTile,
  BarStackTile,
  BarStackHorizontalTile,
  DendrogramsTile,
  DragIITile,
  XYChartTile,
  GeoCustomTile,
  GeoAlbersUsaTile,
  GeoMercatorTile,
  GlyphsTile,
  GradientsTile,
  HeatmapsTile,
  LinkTypesTile,
  NetworkTile,
  PackTile,
  PolygonsTile,
  RadarTile,
  ResponsiveTile,
  SplitLinePathTile,
  StatsPlotTile,
  TextTile,
  TooltipTile,
  TreesTile,
  VoronoiTile,
];

export default function Gallery() {
  const router = useRouter();
  const { pkg: routePackage } = router.query;

  const filteredTiles = routePackage
    ? tiles.filter((Tile) =>
        exampleToVisxDependencyLookup[Tile.packageJson.name]?.has(routePackage as VisxPackage),
      )
    : tiles;

  return (
    <>
      <div className="gallery">
        <div className="filters">
          <div className="filter-label">Filter</div>
          {visxPackages.map((visxPackage) => (
            <Link
              key={visxPackage}
              href={{
                pathname: '/gallery',
                query: routePackage === visxPackage ? undefined : { pkg: visxPackage },
              }}
            >
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a
                className={cx('filter-button', {
                  emphasize: routePackage === visxPackage,
                })}
              >{`${visxPackage}`}</a>
            </Link>
          ))}
        </div>
        <div className="grid">
          {filteredTiles.map((Tile, i) => (
            <Tilt key={`tile-${i}`} className="tilt" options={tiltOptions}>
              {/* eslint-disable react/jsx-pascal-case */}
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
        .filter-label {
          font-size: 16;
          font-weight: 500;
        }
        .filter-button {
          display: block;
          cursor: pointer;
          border: none;
          outline: none;
          background: transparent;
          padding: 0;
          margin: 4px 4px 12px 0;
          font-size: 16px;
          line-height: 1em;
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
