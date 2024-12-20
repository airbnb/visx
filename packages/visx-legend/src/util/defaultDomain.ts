import type { D3Scale } from '@visx/scale';

export default function defaultDomain<Scale extends D3Scale<number>>({
  steps = 5,
  scale,
}: {
  steps: number;
  scale: Scale;
}) {
  const domain = scale.domain();
  const start = domain[0];
  const end = domain[domain.length - 1];
  if (typeof start === 'number' && typeof end === 'number') {
    const step = (end - start) / (steps - 1);
    return new Array(steps).fill(1).reduce((acc, cur, i) => {
      acc.push(start + i * step);
      return acc;
    }, []);
  }
  return [];
}
