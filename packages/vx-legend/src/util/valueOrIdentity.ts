export type ValueOrIdentity<T> = T | { value?: T };

/** Returns an object's value if defined, or the object. */
export default function valueOrIdentity<T>(_: ValueOrIdentity<T>): T {
  if (_ && typeof _ === 'object' && 'value' in _ && typeof _.value !== 'undefined') return _.value;
  return _ as T;
}

/** Returns an object's value if defined, or the object, coerced to a string. */
export function valueOrIdentityString<T>(_: ValueOrIdentity<T>): string {
  return String(valueOrIdentity(_));
}
