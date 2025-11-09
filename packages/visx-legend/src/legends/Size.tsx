import type { D3Scale } from '@visx/scale';
import type { LegendProps } from './Legend';
import Legend from './Legend';
import labelTransformFactory from '../util/labelTransformFactory';
import defaultDomain from '../util/defaultDomain';
import identity from '../util/identity';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnySizeScale = D3Scale<number, any, any>;

export type LegendSizeProps<Scale extends AnySizeScale> = {
  /** Number of discrete steps to show in the legend. The scale domain is divided into this many intervals. */
  steps?: number;
} & LegendProps<Scale>;

/**
 * A Size legend component that creates a legend with discrete size intervals.
 * Useful for visualizing continuous numeric data with size-based scales.
 */
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
