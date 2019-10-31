import React from 'react';
import Legend, { LegendProps } from './Legend';
import { BaseOutput } from '../types';

export type LegendOrdinalProps<Output extends BaseOutput> = LegendProps<string, Output>;

/** Ordinal scales map from strings to an Output type. */
export default function LegendOrdinal<Output extends BaseOutput>(
  props: LegendOrdinalProps<Output>,
) {
  return <Legend<string, Output> {...props} />;
}
