export default function labelOrdinal({
  scale,
  labelFormat,
}) {
  return scale.domain().map((d, i) => {
    return {
      text: `${labelFormat(d, i)}`,
      value: scale(d)
    };
  });
}