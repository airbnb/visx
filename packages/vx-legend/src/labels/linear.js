export default function labelLinear({
  scale,
  steps = 5,
  labelFormat,
}) {
  const domain = scale.domain();
  const start = domain[0];
  const end = domain[domain.length - 1];
  const step = (end - start) / (steps - 1);
  const data = new Array(steps).fill(1).reduce((acc, cur, i) => {
    acc.push(start + i * step);
    return acc;
  }, []);
  return data.map((d, i) => {
    return {
      extent: [],
      text: `${labelFormat(d, i)}`,
      value: scale(d)
    };
  });
}