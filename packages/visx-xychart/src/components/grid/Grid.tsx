import React from 'react';
import GridRows from '@vx/grid/lib/grids/GridRows';
import GridColumns from '@vx/grid/lib/grids/GridColumns';
import BaseGrid, { BaseGridProps } from './BaseGrid';

export type GridProps = Omit<BaseGridProps, 'GridRowsComponent' | 'GridColumnsComponent'>;

export default function Grid(props: GridProps) {
  return <BaseGrid GridRowsComponent={GridRows} GridColumnsComponent={GridColumns} {...props} />;
}
