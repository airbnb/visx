import React from 'react';
import GridReadme from '!!raw-loader!../../../../visx-grid/Readme.md';
import Grid from '../../../../visx-grid/src/grids/Grid';
import GridRows from '../../../../visx-grid/src/grids/GridRows';
import GridColumns from '../../../../visx-grid/src/grids/GridColumns';
import DocPage from '../../components/DocPage';
import AxisTile from '../../components/Gallery/AxisTile';
import BarStackTile from '../../components/Gallery/BarStackTile';
import ThresholdTile from '../../components/Gallery/ThresholdTile';

const components = [GridRows, GridColumns, Grid];

const examples = [AxisTile, BarStackTile, ThresholdTile];

export default () => (
  <DocPage components={components} examples={examples} readme={GridReadme} visxPackage="grid" />
);
