import { scaleBand } from 'd3-scale';

export default ({
  range,
  rangeRound,
  domain,
  padding,
  paddingInner,
  paddingOuter,
  align,
  tickFormat,
}) => {
  const scale = scaleBand();

  if (range) scale.range(range);
  if (rangeRound) scale.rangeRound(rangeRound);
  if (domain) scale.domain(domain);
  if (padding) scale.padding(padding);
  if (paddingInner) scale.paddingInner(paddingInner);
  if (paddingOuter) scale.paddingOuter(paddingOuter);
  if (align) scale.align(align);
  if (tickFormat) scale.tickFormat = tickFormat;

  return scale;
};
