import type { CSSProperties } from 'react';

import type { ChartA11yConfig } from '../types';
import { getChartA11yTable, VISUALLY_HIDDEN_STYLE } from '../utils/table';

export type ChartA11yDataTableProps<Datum> = ChartA11yConfig<Datum> & {
  visible?: boolean;
  className?: string;
  style?: CSSProperties;
};

export function ChartA11yDataTable<Datum>({
  visible = false,
  className,
  style,
  ...config
}: ChartA11yDataTableProps<Datum>) {
  const table = getChartA11yTable(config);
  const tableStyle = visible ? style : { ...VISUALLY_HIDDEN_STYLE, ...style };

  return (
    <table id={table.id} className={className} style={tableStyle}>
      <caption>{table.caption}</caption>
      <thead>
        <tr>
          {table.headers.map((header, index) => (
            <th key={`${header}-${index}`} scope="col">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {table.rows.map(([xCell, ...yCells], rowIndex) => (
          <tr key={rowIndex}>
            <th scope="row">{xCell}</th>
            {yCells.map((cell, cellIndex) => (
              <td key={cellIndex}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
