export type Accessor<D, V> = (datum: D, index: number, data: readonly D[]) => V;
export type AccessorKey<D> = Extract<keyof D, string>;
export type AccessorInput<D, V> = AccessorKey<D> | Accessor<D, V>;

const stringAccessorCache = new Map<string, Accessor<unknown, unknown>>();
const identifierPattern = '[A-Za-z_$][\\w$]*';
const propertyPattern = '[A-Za-z_$][\\w$]*';
const simpleArrowPattern = new RegExp(
  `^\\(?\\s*(${identifierPattern})\\s*\\)?\\s*=>\\s*\\1\\.(${propertyPattern})$`,
);
const blockArrowPattern = new RegExp(
  `^\\(?\\s*(${identifierPattern})\\s*\\)?\\s*=>\\s*\\{\\s*return\\s+\\1\\.(${propertyPattern})\\s*;?\\s*\\}$`,
);
const functionPattern = new RegExp(
  `^function(?:\\s+${identifierPattern})?\\s*\\(\\s*(${identifierPattern})[^)]*\\)\\s*\\{\\s*return\\s+\\1\\.(${propertyPattern})\\s*;?\\s*\\}$`,
);

function getStringAccessor(key: string) {
  let accessor = stringAccessorCache.get(key);

  if (!accessor) {
    accessor = (datum: unknown) => (datum as Record<string, unknown>)[key];
    stringAccessorCache.set(key, accessor);
  }

  return accessor;
}

function inferSimplePropertyKey(accessor: Accessor<unknown, unknown>) {
  const source = Function.prototype.toString.call(accessor).replace(/\s+/g, ' ').trim();
  const match =
    source.match(simpleArrowPattern) ??
    source.match(blockArrowPattern) ??
    source.match(functionPattern);

  return match?.[2];
}

export default function normalizeAccessor<D, V>(accessor: AccessorInput<D, V>): Accessor<D, V> {
  const input = accessor as unknown;

  if (typeof input === 'string') {
    return getStringAccessor(input) as Accessor<D, V>;
  }

  if (typeof input === 'symbol') {
    throw new TypeError('@visx/kernel: symbol accessors are not supported in v1.');
  }

  if (typeof input !== 'function') {
    throw new TypeError('@visx/kernel: accessors must be a string key or function.');
  }

  const inferredKey = inferSimplePropertyKey(input as Accessor<unknown, unknown>);

  return inferredKey
    ? (getStringAccessor(inferredKey) as Accessor<D, V>)
    : (input as Accessor<D, V>);
}
