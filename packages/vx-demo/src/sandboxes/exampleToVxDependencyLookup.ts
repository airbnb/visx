import areaPackageJson from './vx-area/package.json';
import axisPackageJson from './vx-axis/package.json';
import bargroupPackageJson from './vx-bargroup/package.json';
import bargroupHorizontalPackageJson from './vx-bargroup-horizontal/package.json';
import barsPackageJson from './vx-bars/package.json';
import barstackPackageJson from './vx-barstack/package.json';
import barstackHorizontalPackageJson from './vx-barstack-horizontal/package.json';
import brushPackageJson from './vx-brush/package.json';
import chordPackageJson from './vx-chord/package.json';
import curvePackageJson from './vx-curve/package.json';
import dendrogramPackageJson from './vx-dendrogram/package.json';
import dotsPackageJson from './vx-dots/package.json';
import dragIPackageJson from './vx-drag-i/package.json';
import dragIIPackageJson from './vx-drag-ii/package.json';
import geoCustomPackageJson from './vx-geo-custom/package.json';
import geoMercatorPackageJson from './vx-geo-mercator/package.json';
import glyphPackageJson from './vx-glyph/package.json';
import gradientPackageJson from './vx-gradient/package.json';
import heatmapPackageJson from './vx-heatmap/package.json';
import legendPackageJson from './vx-legend/package.json';
import linktypesPackageJson from './vx-linktypes/package.json';
import networkPackageJson from './vx-network/package.json';
import packPackageJson from './vx-pack/package.json';
import patternPackageJson from './vx-pattern/package.json';
import polygonsPackageJson from './vx-polygons/package.json';
import radarPackageJson from './vx-radar/package.json';
import responsivePackageJson from './vx-responsive/package.json';
import lineRadialPackageJson from './vx-shape-line-radial/package.json';
import piePackageJson from './vx-shape-pie/package.json';
import stackedAreasPackageJson from './vx-stacked-areas/package.json';
import statsPackageJson from './vx-stats/package.json';
import streamgraphPackageJson from './vx-streamgraph/package.json';
import { packageJson as textPackageJson } from '../components/Gallery/TextTile';
import thresholdPackageJson from './vx-threshold/package.json';
import treePackageJson from './vx-tree/package.json';
import treemapPackageJson from './vx-treemap/package.json';
import voronoiPackageJson from './vx-voronoi/package.json';
import zoomPackageJson from './vx-zoom-i/package.json';

import extractVxDepsFromPackageJson from '../components/util/extractVxDepsFromPackageJson';
import { VxPackage } from '../types';

const examples = [
  areaPackageJson,
  axisPackageJson,
  bargroupPackageJson,
  bargroupHorizontalPackageJson,
  barsPackageJson,
  barstackPackageJson,
  barstackHorizontalPackageJson,
  brushPackageJson,
  chordPackageJson,
  curvePackageJson,
  dendrogramPackageJson,
  dotsPackageJson,
  dragIPackageJson,
  dragIIPackageJson,
  geoCustomPackageJson,
  geoMercatorPackageJson,
  glyphPackageJson,
  gradientPackageJson,
  heatmapPackageJson,
  legendPackageJson,
  linktypesPackageJson,
  networkPackageJson,
  packPackageJson,
  patternPackageJson,
  polygonsPackageJson,
  radarPackageJson,
  responsivePackageJson,
  lineRadialPackageJson,
  piePackageJson,
  stackedAreasPackageJson,
  statsPackageJson,
  streamgraphPackageJson,
  textPackageJson,
  thresholdPackageJson,
  treePackageJson,
  treemapPackageJson,
  voronoiPackageJson,
  zoomPackageJson,
];

const exampleToVxDependencyLookup: { [exampleName: string]: Set<VxPackage> } = {};
const seenPackages = new Set<VxPackage>();

examples.forEach(packageJson => {
  // create a vx package set per example
  const vxPackages = new Set<VxPackage>(
    extractVxDepsFromPackageJson(packageJson).map(
      vxPackage => vxPackage.split('@vx/')[1] ?? '',
    ) as VxPackage[],
  );

  vxPackages.forEach(vxPackage => seenPackages.add(vxPackage));
  exampleToVxDependencyLookup[packageJson.name] = vxPackages;
});

export const vxPackages = Array.from(seenPackages).sort();

export default exampleToVxDependencyLookup;
