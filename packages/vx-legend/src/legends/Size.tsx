import React from 'react';
import Legend, { LegendProps } from './Legend';
import { BaseInput, BaseOutput, ScaleType } from '../types';
import labelTransformFactory from '../util/labelTransformFactory';

export type LegendSizeProps<Data extends BaseInput, Output extends BaseOutput> = {
  steps?: number;
} & LegendProps<Data, Output>;

function defaultDomain<Datum extends BaseInput, Output extends BaseOutput>({
  steps,
  scale,
}: {
  steps: number;
  scale: ScaleType<Datum, Output>;
}) {
  const domain = scale.domain();
  const start = domain[0];
  const end = domain[domain.length - 1];
  if (typeof start === 'number' && typeof end === 'number') {
    const step = (end - start) / (steps - 1);
    return new Array(steps).fill(1).reduce((acc, cur, i) => {
      acc.push(start + i * step);
      return acc;
    }, []);
  }
  return [];
}

export default function LegendSize<Data extends BaseInput, Output extends BaseOutput>({
  scale,
  domain: inputDomain,
  steps = 5,
  labelFormat = x => x,
  labelTransform = labelTransformFactory,
  ...restProps
}: LegendSizeProps<Data, Output>) {
  const domain = inputDomain || defaultDomain({ steps, scale });
  return (
    <Legend
      scale={scale}
      domain={domain}
      labelFormat={labelFormat}
      labelTransform={labelTransform}
      {...restProps}
    />
  );
}
