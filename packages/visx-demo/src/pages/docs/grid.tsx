import React from 'react';
import GridReadme from '!!raw-loader!../../../../visx-grid/Readme.md';
import Grid from '../../../../visx-grid/src/grids/Grid';
import GridRows from '../../../../visx-grid/src/grids/GridRows';
import GridColumns from '../../../../visx-grid/src/grids/GridColumns';
import GridRadial from '../../../../visx-grid/src/grids/GridRadial';
import GridAngle from '../../../../visx-grid/src/grids/GridAngle';
import GridPolar from '../../../../visx-grid/src/grids/GridPolar';
import DocPage from '../../components/DocPage';
import AxisTile from '../../components/Gallery/AxisTile';
import BarStackTile from '../../components/Gallery/BarStackTile';
import ThresholdTile from '../../components/Gallery/ThresholdTile';
import LineRadialTile from '../../components/Gallery/LineRadialTile';

const components = [GridRows, GridColumns, Grid, GridRadial, GridAngle, GridPolar];

const examples = [AxisTile, BarStackTile, ThresholdTile, LineRadialTile];

const GridDocs = () => (
  <DocPage components={components} examples={examples} readme={GridReadme} visxPackage="grid" />
);
export default GridDocs;
