import React from 'react';
import GridReadme from '!!raw-loader!../../../../vx-grid/Readme.md';
import Grid from '../../../../vx-grid/src/grids/Grid';
import GridRows from '../../../../vx-grid/src/grids/GridRows';
import GridColumns from '../../../../vx-grid/src/grids/GridColumns';
import DocPage from '../../components/DocPage';
import { DocGenInfo } from '../../types';

const components = [GridRows, GridColumns, Grid].map(
  c =>
    // @ts-ignore
    c.__docgenInfo,
) as DocGenInfo[];

export default () => <DocPage components={components} readme={GridReadme} vxPackage="grid" />;
