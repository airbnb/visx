export default function labelQuantile({
  scale,
  labelFormat,
  labelDelimiter = '',
}) {
  return scale.range().map(d => {
    const [x0, x1] = scale.invertExtent(d);
    return `${labelFormat(x0)} ${labelDelimiter} ${labelFormat(x1)}`;
  });
}