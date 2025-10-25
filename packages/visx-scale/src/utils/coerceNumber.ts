import type { NumberLike } from '../types/Base';

export default function coerceNumber<T>(val: T | NumberLike): T | number {
  if ((typeof val === 'function' || (typeof val === 'object' && !!val)) && 'valueOf' in val) {
    const num = val.valueOf();
    if (typeof num === 'number') return num;
  }

  return val as T;
}
