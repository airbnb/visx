import type { PickD3Scale } from '@visx/scale';
import type { LegendProps } from './Legend';
import Legend from './Legend';
import defaultDomain from '../util/defaultDomain';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyLinearScale = PickD3Scale<'linear', any>;

export type LegendLinearProps<Scale extends AnyLinearScale> = {
  /** Number of discrete steps to show in the legend. The scale domain is divided into this many intervals. */
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
