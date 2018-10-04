import { scaleOrdinal } from 'd3-scale';

export default ({ range, domain, unknown }) => {
  const scale = scaleOrdinal();
  scale.type = 'ordinal';

  if (range) scale.range(range);
  if (domain) scale.domain(domain);
  if (unknown) scale.unknown(unknown);

  return scale;
};
