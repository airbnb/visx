import React from 'react';
import { CommonGridProps } from '@visx/grid/lib/types';
import { AllGridRowsProps } from '@visx/grid/lib/grids/GridRows';
import { GridColumnsProps } from '@visx/grid/lib/grids/GridColumns';
import { AxisScale } from '@visx/axis';
export declare type BaseGridProps = {
    /** Whether to render GridRows. */
    rows?: boolean;
    /** Whether to render GridColumns. */
    columns?: boolean;
    /** Rendered GridRows component which is passed GridRowProps by BaseGrid. */
    GridRowsComponent: React.FC<AllGridRowsProps<AxisScale>>;
    /** Rendered GridColumns component which is passed GridColumnsProps by BaseGrid. */
    GridColumnsComponent: React.FC<GridColumnsProps<AxisScale>>;
} & CommonGridProps;
/** Component that handles all  */
export default function BaseGrid({ rows, columns, GridRowsComponent, GridColumnsComponent, ...props }: BaseGridProps): JSX.Element;
//# sourceMappingURL=BaseGrid.d.ts.map