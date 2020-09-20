import React from 'react';
import { PickD3Scale } from '@visx/scale';
import Legend, { LegendProps } from './Legend';
import defaultDomain from '../util/defaultDomain';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyLinearScale = PickD3Scale<'linear', any>;

export type LegendLinearProps<Scale extends AnyLinearScale> = {
  steps?: number;
} & LegendProps<Scale>;

/** Linear scales map from continuous inputs to continuous outputs. */
export default function Linear<Scale extends AnyLinearScale>({
  scale,
  domain: inputDomain,
  steps = 5,
  ...restProps
}: LegendLinearProps<Scale>) {
  const domain = inputDomain || defaultDomain({ steps, scale });
  return <Legend<Scale> scale={scale} domain={domain} {...restProps} />;
}
