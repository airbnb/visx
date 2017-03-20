import { scaleLinear } from 'd3-scale';

export default function linear({
  range,
  rangeRound,
  domain,
  nice = false,
}) {
  const scale = scaleLinear();

  if (range) scale.range(range);
  if (rangeRound) scale.rangeRound(rangeRound);
  if (domain) scale.domain(domain);
  if (nice) scale.nice();

  return scale;
}
