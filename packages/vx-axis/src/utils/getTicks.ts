import { AnyD3Scale } from '@vx/scale';
import { TickValue } from '../types';

export default function getTicks<Scale extends AnyD3Scale>(
  scale: Scale,
  numTicks?: number,
): TickValue<Scale>[] {
  const s = scale as AnyD3Scale;

  if ('ticks' in s) {
    return s.ticks(numTicks);
  }

  return s
    .domain()
    .filter(
      (_, index, arr) =>
        numTicks == null ||
        arr.length <= numTicks ||
        index % Math.round((arr.length - 1) / numTicks) === 0,
    );
}
