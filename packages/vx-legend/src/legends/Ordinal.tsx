import React from 'react';
import Legend, { LegendProps } from './Legend';
import { ScaleOrdinal } from '../types';

export type LegendOrdinalProps<Output> = LegendProps<string, Output, ScaleOrdinal<string, Output>>;

/** Ordinal scales map from strings to an Output type. */
export default function LegendOrdinal<Output>(props: LegendOrdinalProps<Output>) {
  return <Legend<string, Output, ScaleOrdinal<string, Output>> {...props} />;
}
