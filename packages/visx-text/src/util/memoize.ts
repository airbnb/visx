export default function memoize<T extends (...args: any[]) => any>(
  func: T,
  resolver: (...args: Parameters<T>) => string,
): T {
  const cache = new Map<string, ReturnType<T>>();
  return function memoized(this: unknown, ...args: Parameters<T>): ReturnType<T> {
    const key = resolver(...args);
    if (cache.has(key)) return cache.get(key) as ReturnType<T>;
    const result = func.apply(this, args) as ReturnType<T>;
    cache.set(key, result);
    return result;
  } as T;
}
