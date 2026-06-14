type ShallowValue = Record<PropertyKey, unknown> | readonly unknown[];

function isObjectLike(value: unknown): value is ShallowValue {
  return typeof value === 'object' && value !== null;
}

function shallowEqualArrays(previous: readonly unknown[], next: readonly unknown[]) {
  if (previous.length !== next.length) {
    return false;
  }

  return previous.every((value, index) => Object.is(value, next[index]));
}

export default function shallowEqual(previous: unknown, next: unknown) {
  if (Object.is(previous, next)) {
    return true;
  }

  if (!isObjectLike(previous) || !isObjectLike(next)) {
    return false;
  }

  if (Array.isArray(previous) || Array.isArray(next)) {
    return Array.isArray(previous) && Array.isArray(next)
      ? shallowEqualArrays(previous, next)
      : false;
  }

  const previousKeys = Object.keys(previous);
  const nextKeys = Object.keys(next);

  if (previousKeys.length !== nextKeys.length) {
    return false;
  }

  const previousRecord = previous as Record<string, unknown>;
  const nextRecord = next as Record<string, unknown>;

  return previousKeys.every(
    (key) =>
      Object.prototype.hasOwnProperty.call(nextRecord, key) &&
      Object.is(previousRecord[key], nextRecord[key]),
  );
}
