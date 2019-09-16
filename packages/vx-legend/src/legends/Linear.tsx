import React from 'react';
import Legend, { LegendProps } from '../legend/Legend';

export type LegendLinearProps<Output> = {
  steps?: number;
} & LegendProps<number, Output>;

/** Linear scales map from continuous inputs to continuous outputs. */
export default function LegendLinear<Output extends string | number>({
  scale,
  domain: inputDomain,
  steps = 5,
  ...restProps
}: LegendLinearProps<Output>) {
  const domain = inputDomain || defaultDomain({ steps, scale });
  return <Legend<number, number> scale={scale} domain={domain} {...restProps} />;
}

function defaultDomain<Output>({
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
