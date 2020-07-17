import { Value } from '../types/Base';
import { SomeD3Scale } from '../types/Scale';

export default function applyZero<Output extends Value>(
  scale: SomeD3Scale<'linear' | 'pow' | 'sqrt' | 'symlog', Output>,
  config: { zero?: boolean },
) {
  if (config.zero === true) {
    const domain = scale.domain() as number[];
    const [a, b] = domain;
    const isDescending = b < a;
    const [min, max] = isDescending ? [b, a] : [a, b];
    const domainWithZero = [Math.min(0, min), Math.max(0, max)];
    scale.domain(isDescending ? domainWithZero.reverse() : domainWithZero);
  }
}
