import React from 'react';
import Legend, { LegendProps } from './Legend';
import { ScaleType } from '../types';
import labelTransformFactory from '../util/labelTransformFactory';

export type LegendSizeProps<Datum> = {
  steps?: number;
} & LegendProps<Datum, number, ScaleType<Datum, number>>;

function defaultDomain<Datum>({
  steps,
  scale,
}: {
  steps: number;
  scale: ScaleType<Datum, number>;
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

export default function Size<Datum>({
  scale,
  domain: inputDomain,
  steps = 5,
  labelFormat = x => x,
  labelTransform = labelTransformFactory,
  ...restProps
}: LegendSizeProps<Datum>) {
  const domain = inputDomain || defaultDomain({ steps, scale });
  return (
    <Legend<Datum, number, ScaleType<Datum, number>>
      scale={scale}
      domain={domain}
      labelFormat={labelFormat}
      labelTransform={labelTransform}
      {...restProps}
    />
  );
}
