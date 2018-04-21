import { scaleQuantile } from 'd3-scale';

export default ({ range, domain }) => {
  const scale = scaleQuantile();

  if (range) scale.range(range);
  if (domain) scale.domain(domain);

  return scale;
};
