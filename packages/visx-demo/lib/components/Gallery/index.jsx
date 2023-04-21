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
import * as WordcloudTile from './WordcloudTile';
import * as XYChartTile from './XYChartTile';
import * as ZoomITile from './ZoomITile';
import exampleToVisxDependencyLookup, { visxPackages, } from '../../sandboxes/exampleToVisxDependencyLookup';
var tiltOptions = { max: 8, scale: 1 };
export var tiles = [
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
    WordcloudTile,
];
export default function Gallery() {
    var router = useRouter();
    var routePackage = router.query.pkg;
    var filteredTiles = routePackage
        ? tiles.filter(function (Tile) { var _a; return (_a = exampleToVisxDependencyLookup[Tile.packageJson.name]) === null || _a === void 0 ? void 0 : _a.has(routePackage); })
        : tiles;
    return (<>
      <div className="gallery">
        <div className="filters">
          <div className="filter-label">Filter</div>
          {visxPackages.map(function (visxPackage) { return (<Link key={visxPackage} href={{
        pathname: '/gallery',
        query: routePackage === visxPackage ? undefined : { pkg: visxPackage },
    }}>
              
              <a className={cx('filter-button', {
        emphasize: routePackage === visxPackage,
    })}>{"" + visxPackage}</a>
            </Link>); })}
        </div>
        <div className="grid">
          {filteredTiles.map(function (Tile, i) { return (<Tilt key={"tile-" + i} className="tilt" options={tiltOptions}>
              
              <Tile.default />
            </Tilt>); })}
        </div>
      </div>
      <style jsx>{"\n        .gallery {\n          display: flex;\n          flex-direction: row;\n        }\n        .grid {\n          width: 100%;\n          display: grid;\n          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));\n          overflow-x: hidden;\n          padding-bottom: 40px;\n        }\n        .filters {\n          margin-right: 24px;\n          width: 150px;\n          flex-shrink: 0;\n        }\n        h6 {\n          margin: 0 4px 0 0;\n        }\n        .filter-label {\n          font-size: 16;\n          font-weight: 500;\n        }\n        .filter-button {\n          display: block;\n          cursor: pointer;\n          border: none;\n          outline: none;\n          background: transparent;\n          padding: 0;\n          margin: 4px 4px 12px 0;\n          font-size: 16px;\n          line-height: 1em;\n        }\n        .emphasize {\n          font-weight: bold;\n        }\n        @media (min-width: 800px) {\n          .emphasize::before {\n            content: '';\n            padding-left: 4px;\n            border-left: 2px solid #fc2e1c;\n          }\n        }\n        @media (max-width: 800px) {\n          .gallery {\n            flex-direction: column;\n            min-width: 90vw;\n            max-width: 90vw;\n            margin: 0;\n          }\n          .filters {\n            display: flex;\n            flex-wrap: wrap;\n            width: 100%;\n            justify-content: center;\n          }\n        }\n      "}</style>
    </>);
}
