const CACHE_LIMIT = 1024;
const pathCache = new Map<string, Path2D>();

class Path2DShim {
  private readonly d: string;

  constructor(d = '') {
    this.d = d;
  }

  toString() {
    return this.d;
  }
}

function createPath2D(d: string) {
  const Path2DConstructor =
    typeof Path2D === 'undefined' ? (Path2DShim as unknown as typeof Path2D) : Path2D;

  return new Path2DConstructor(d);
}

export default function toPath2D(d: string): Path2D {
  const cachedPath = pathCache.get(d);

  if (cachedPath) {
    pathCache.delete(d);
    pathCache.set(d, cachedPath);
    return cachedPath;
  }

  const path = createPath2D(d);
  pathCache.set(d, path);

  if (pathCache.size > CACHE_LIMIT) {
    const firstKey = pathCache.keys().next().value;
    if (firstKey !== undefined) pathCache.delete(firstKey);
  }

  return path;
}
