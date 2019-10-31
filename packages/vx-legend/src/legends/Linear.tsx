import React from 'react';
import Legend, { LegendProps } from './Legend';
import { BaseOutput } from '../types';

export type LegendLinearProps<Output extends BaseOutput> = {
  steps?: number;
} & LegendProps<number, Output>;

function defaultDomain<Output extends BaseOutput>({
  steps = 5,
  scale,
}: Pick<LegendLinearProps<Output>, 'steps' | 'scale'>) {
  const domain = scale.domain();
  const start = domain[0];
  const end = domain[domain.length - 1];
  const step = (end - start) / (steps - 1);

  return new Array(steps).fill(1).reduce((acc, cur, i) => {
    acc.push(start + i * step);
    return acc;
  }, []);
}

/** Linear scales map from continuous inputs to continuous outputs. */
export default function LegendLinear<Output extends BaseOutput>({
  scale,
  domain: inputDomain,
  steps = 5,
  ...restProps
}: LegendLinearProps<Output>) {
  const domain = inputDomain || defaultDomain({ steps, scale });
  return <Legend<number, Output> scale={scale} domain={domain} {...restProps} />;
}
