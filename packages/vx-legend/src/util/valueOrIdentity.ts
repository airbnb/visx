export type ValueOrIdentity<T> = T | { value?: T };

export default function valueOrIdentity<T>(x: ValueOrIdentity<T>): T {
  if (x && 'value' in x && typeof x.value !== 'undefined') return x.value;
  return x as T;
}
