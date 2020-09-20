import React from 'react';
import { PickD3Scale } from '@visx/scale';
import Legend, { LegendProps } from './Legend';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyOrdinalScale = PickD3Scale<'ordinal', any, any>;

export type LegendOrdinalProps<Scale extends AnyOrdinalScale> = LegendProps<Scale>;

/** Ordinal scales map from strings to an Output type. */
export default function Ordinal<Scale extends AnyOrdinalScale>(props: LegendOrdinalProps<Scale>) {
  return <Legend<Scale> {...props} />;
}
