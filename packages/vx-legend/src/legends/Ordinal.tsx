import React from 'react';
import Legend, { LegendProps } from '../legend/Legend';

export type LegendOrdinalProps<Output> = LegendProps<string, Output>;

/** Ordinal scales map from strings to an Output type. */
export default function LegendOrdinal<Output extends string | number>(
  props: LegendOrdinalProps<Output>,
) {
  return <Legend {...props} />;
}
