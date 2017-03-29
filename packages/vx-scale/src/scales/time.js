import { scaleTime } from 'd3-scale';

export default function time({
  range,
  domain,
  nice = false,
  clamp = false,
}) {
  const scale = scaleTime();

  if (range) scale.range(range)
  if (domain) scale.domain(domain);
  if (nice) scale.nice();
  if (clamp) scale.clamp(true);

  return scale;
}
