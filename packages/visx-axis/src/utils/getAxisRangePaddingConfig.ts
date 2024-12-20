import type { SharedAxisProps } from '../types';

export const defaultAxisRangePadding = 0;

export default function getAxisRangePaddingConfig(
  originalRangePadding: SharedAxisProps<never>['rangePadding'] = defaultAxisRangePadding,
) {
  return typeof originalRangePadding === 'number'
    ? { start: originalRangePadding, end: originalRangePadding }
    : { start: defaultAxisRangePadding, end: defaultAxisRangePadding, ...originalRangePadding };
}
