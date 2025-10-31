import type { StringLike } from '../types/Base';

export default function toString<T extends StringLike>(x?: T) {
  return x?.toString();
}
