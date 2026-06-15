// @vitest-environment node

import { createPath, toPath2D } from '../src';

describe('createPath', () => {
  it('builds rounded SVG path strings', () => {
    const path = createPath(2)
      .moveTo(0, 0)
      .lineTo(1.234, 5.678)
      .quadraticCurveTo(2.345, 3.456, 4.567, 6.789)
      .bezierCurveTo(1, 2, 3, 4, 5, 6)
      .closePath();

    expect(path.toString()).toBe('M0,0L1.23,5.68Q2.35,3.46,4.57,6.79C1,2,3,4,5,6Z');
  });

  it('builds arc commands from center/radius angles', () => {
    expect(createPath(1).arc(0, 0, 10, 0, Math.PI).toString()).toBe('M10,0A10,10,0,0,1,-10,0');
  });
});

describe('toPath2D', () => {
  it('caches Path2D objects by source string', () => {
    expect(toPath2D('M0,0L1,1')).toBe(toPath2D('M0,0L1,1'));
  });

  it('returns a minimal server shim when Path2D is unavailable', () => {
    const path = toPath2D('M2,2L3,3');

    expect(path.toString()).toBe('M2,2L3,3');
  });

  it('evicts the least recently used path after the cache limit', () => {
    const firstPath = toPath2D('M-lru-start');

    for (let index = 0; index < 1024; index += 1) {
      toPath2D(`M-lru-${index}`);
    }

    expect(toPath2D('M-lru-start')).not.toBe(firstPath);
  });
});
