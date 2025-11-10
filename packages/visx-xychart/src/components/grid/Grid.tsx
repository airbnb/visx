import { GridRows, GridColumns } from '@visx/grid';
import type { BaseGridProps } from './BaseGrid';
import BaseGrid from './BaseGrid';

export type GridProps = Omit<BaseGridProps, 'GridRowsComponent' | 'GridColumnsComponent'>;

export default function Grid(props: GridProps) {
  return <BaseGrid GridRowsComponent={GridRows} GridColumnsComponent={GridColumns} {...props} />;
}
