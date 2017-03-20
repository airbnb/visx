import { scaleTime } from 'd3-scale';

export default function time({
  range,
  domain,
  nice = false,
}) {
  const scale = scaleTime();

  if (range) scale.range(range)
  if (domain) scale.domain(domain);
  if (nice) scale.nice();

  return scale;
}
