import annotationPackageJson from '@visx/demo-annotation/package.json';
import areaPackageJson from '@visx/demo-area/package.json';
import axisPackageJson from '@visx/demo-axis/package.json';
import bargroupPackageJson from '@visx/demo-bargroup/package.json';
import bargroupHorizontalPackageJson from '@visx/demo-bargroup-horizontal/package.json';
import barsPackageJson from '@visx/demo-bars/package.json';
import barstackPackageJson from '@visx/demo-barstack/package.json';
import barstackHorizontalPackageJson from '@visx/demo-barstack-horizontal/package.json';
import brushPackageJson from '@visx/demo-brush/package.json';
import chordPackageJson from '@visx/demo-chord/package.json';
import curvePackageJson from '@visx/demo-curve/package.json';
import dendrogramPackageJson from '@visx/demo-dendrogram/package.json';
import dotsPackageJson from '@visx/demo-dots/package.json';
import dragIPackageJson from '@visx/demo-drag-i/package.json';
import dragIIPackageJson from '@visx/demo-drag-ii/package.json';
import geoCustomPackageJson from '@visx/demo-geo-custom/package.json';
import geoMercatorPackageJson from '@visx/demo-geo-mercator/package.json';
import glyphPackageJson from '@visx/demo-glyph/package.json';
import gradientPackageJson from '@visx/demo-gradient/package.json';
import heatmapPackageJson from '@visx/demo-heatmap/package.json';
import legendPackageJson from '@visx/demo-legend/package.json';
import linktypesPackageJson from '@visx/demo-linktypes/package.json';
import networkPackageJson from '@visx/demo-network/package.json';
import packPackageJson from '@visx/demo-pack/package.json';
import patternPackageJson from '@visx/demo-pattern/package.json';
import polygonsPackageJson from '@visx/demo-polygons/package.json';
import radarPackageJson from '@visx/demo-radar/package.json';
import responsivePackageJson from '@visx/demo-responsive/package.json';
import lineRadialPackageJson from '@visx/demo-shape-line-radial/package.json';
import piePackageJson from '@visx/demo-shape-pie/package.json';
import splitLinePathPackageJson from '@visx/demo-shape-splitlinepath/package.json';
import stackedAreasPackageJson from '@visx/demo-stacked-areas/package.json';
import statsPackageJson from '@visx/demo-stats/package.json';
import streamgraphPackageJson from '@visx/demo-streamgraph/package.json';
import thresholdPackageJson from '@visx/demo-threshold/package.json';
import treePackageJson from '@visx/demo-tree/package.json';
import treemapPackageJson from '@visx/demo-treemap/package.json';
import voronoiPackageJson from '@visx/demo-voronoi/package.json';
import wordcloudPackageJson from '@visx/demo-wordcloud/package.json';
import zoomPackageJson from '@visx/demo-zoom-i/package.json';
import { packageJson as textPackageJson } from '../components/Gallery/TextTile';

import extractVisxDepsFromPackageJson from '../components/util/extractVisxDepsFromPackageJson';
import { VisxPackage } from '../types';

const examples = [
  annotationPackageJson,
  areaPackageJson,
  axisPackageJson,
  bargroupHorizontalPackageJson,
  bargroupPackageJson,
  barsPackageJson,
  barstackHorizontalPackageJson,
  barstackPackageJson,
  brushPackageJson,
  chordPackageJson,
  curvePackageJson,
  dendrogramPackageJson,
  dotsPackageJson,
  dragIIPackageJson,
  dragIPackageJson,
  geoCustomPackageJson,
  geoMercatorPackageJson,
  glyphPackageJson,
  gradientPackageJson,
  heatmapPackageJson,
  legendPackageJson,
  lineRadialPackageJson,
  linktypesPackageJson,
  networkPackageJson,
  packPackageJson,
  patternPackageJson,
  piePackageJson,
  polygonsPackageJson,
  radarPackageJson,
  responsivePackageJson,
  splitLinePathPackageJson,
  stackedAreasPackageJson,
  statsPackageJson,
  streamgraphPackageJson,
  textPackageJson,
  thresholdPackageJson,
  treePackageJson,
  treemapPackageJson,
  voronoiPackageJson,
  wordcloudPackageJson,
  zoomPackageJson,
];

const exampleToVisxDependencyLookup: { [exampleName: string]: Set<VisxPackage> } = {};
const seenPackages = new Set<VisxPackage>();

examples.forEach((packageJson) => {
  // create a visx package set per example
  const visxPackages = new Set<VisxPackage>(
    extractVisxDepsFromPackageJson(packageJson).map(
      (visxPackage) => visxPackage.split('@visx/')[1] ?? '',
    ) as VisxPackage[],
  );

  visxPackages.forEach((visxPackage) => seenPackages.add(visxPackage));
  exampleToVisxDependencyLookup[packageJson.name] = visxPackages;
});

export const visxPackages = Array.from(seenPackages).sort();

export default exampleToVisxDependencyLookup;
