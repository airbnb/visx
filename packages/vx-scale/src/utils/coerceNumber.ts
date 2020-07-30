import { NumberLike } from '../types/Base';

export default function coerceNumber<T>(val: T | NumberLike): T | number {
  if ('valueOf' in val) {
    const num = val.valueOf();
    if (typeof num === 'number') return num;
  }

  return val as T;
}
