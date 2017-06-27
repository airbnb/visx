export default function labelQuantile({
  scale,
  labelFormat,
  labelDelimiter = '',
}) {
  return scale.range().map((d, i) => {
    const [x0, x1] = scale.invertExtent(d);
    return {
      extent: [x0, x1],
      text: `${labelFormat(x0, i)} ${labelDelimiter} ${labelFormat(x1, i)}`,
      value: scale(x0)
    };
  });
}