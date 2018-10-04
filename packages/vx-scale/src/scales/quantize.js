import { scaleQuantize } from 'd3-scale';

export default ({ range, domain, ticks, tickFormat, nice = false }) => {
  const scale = scaleQuantize();
  scale.type = 'quantize';

  if (range) scale.range(range);
  if (domain) scale.domain(domain);
  if (nice) scale.nice();
  if (ticks) scale.ticks(ticks);
  if (tickFormat) scale.tickFormat(tickFormat);

  return scale;
};
