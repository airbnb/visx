import GridRows from '@visx/grid/lib/grids/GridRows';
import GridColumns from '@visx/grid/lib/grids/GridColumns';
import type { BaseGridProps } from './BaseGrid';
import BaseGrid from './BaseGrid';

export type GridProps = Omit<BaseGridProps, 'GridRowsComponent' | 'GridColumnsComponent'>;

export default function Grid(props: GridProps) {
  return <BaseGrid GridRowsComponent={GridRows} GridColumnsComponent={GridColumns} {...props} />;
}
