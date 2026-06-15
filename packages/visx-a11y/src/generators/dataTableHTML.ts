import type { ChartA11yConfig } from '../types';
import { escapeHtml } from '../utils/format';
import { getChartA11yTable, VISUALLY_HIDDEN_STYLE_STRING } from '../utils/table';

export const VISUALLY_HIDDEN_TABLE_STYLE = VISUALLY_HIDDEN_STYLE_STRING;

export function generateDataTableHTML<Datum>(config: ChartA11yConfig<Datum>): string {
  const table = getChartA11yTable(config);
  const headerHtml = table.headers
    .map((header) => `<th scope="col">${escapeHtml(header)}</th>`)
    .join('');
  const rowHtml = table.rows
    .map(
      ([xCell, ...yCells]) =>
        `<tr><th scope="row">${escapeHtml(xCell)}</th>${yCells
          .map((cell) => `<td>${escapeHtml(cell)}</td>`)
          .join('')}</tr>`,
    )
    .join('');
  const tableIdHtml = escapeHtml(table.id);
  const captionHtml = escapeHtml(table.caption);

  return `<table id="${tableIdHtml}" style="${VISUALLY_HIDDEN_TABLE_STYLE}"><caption>${captionHtml}</caption><thead><tr>${headerHtml}</tr></thead><tbody>${rowHtml}</tbody></table>`;
}
