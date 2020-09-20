import React from 'react';
import { D3Scale } from '@visx/scale';
import Legend, { LegendProps } from './Legend';
import labelTransformFactory from '../util/labelTransformFactory';
import defaultDomain from '../util/defaultDomain';
import identity from '../util/identity';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnySizeScale = D3Scale<number, any, any>;

export type LegendSizeProps<Scale extends AnySizeScale> = {
  steps?: number;
} & LegendProps<Scale>;

export default function Size<Scale extends AnySizeScale>({
  scale,
  domain: inputDomain,
  steps = 5,
  labelFormat = identity,
  labelTransform = labelTransformFactory,
  ...restProps
}: LegendSizeProps<Scale>) {
  const domain = inputDomain || defaultDomain({ steps, scale });

  return (
    <Legend<Scale>
      scale={scale}
      domain={domain}
      labelFormat={labelFormat}
      labelTransform={labelTransform}
      {...restProps}
    />
  );
}
