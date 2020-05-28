import React from 'react';
import GridReadme from '!!raw-loader!../../../../vx-grid/Readme.md';
import Grid from '../../../../vx-grid/src/grids/Grid';
import GridRows from '../../../../vx-grid/src/grids/GridRows';
import GridColumns from '../../../../vx-grid/src/grids/GridColumns';
import DocPage from '../../components/DocPage';
import AxisTile from '../../components/Gallery/AxisTile';
import BarStackTile from '../../components/Gallery/BarStackTile';
import ThresholdTile from '../../components/Gallery/ThresholdTile';

const components = [GridRows, GridColumns, Grid];

const examples = [AxisTile, BarStackTile, ThresholdTile];

export default () => (
  <DocPage components={components} examples={examples} readme={GridReadme} vxPackage="grid" />
);
