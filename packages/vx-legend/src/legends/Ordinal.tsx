import React from 'react';
import Legend, { LegendProps } from './Legend';
import { ScaleOrdinal } from '../types';

export type LegendOrdinalProps<Input extends { toString(): string }, Output> = LegendProps<
  string,
  Output,
  ScaleOrdinal<Input, Output>
>;

/** Ordinal scales map from strings to an Output type. */
export default function Ordinal<Input extends { toString(): string }, Output>(
  props: LegendOrdinalProps<Input, Output>,
) {
  return <Legend<string, Output, ScaleOrdinal<Input, Output>> {...props} />;
}
