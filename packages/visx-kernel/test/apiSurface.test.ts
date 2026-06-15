import * as kernel from '../src';

describe('@visx/kernel public API', () => {
  it('keeps the value export surface explicit', () => {
    expect(Object.keys(kernel).sort()).toEqual([
      'createPath',
      'formatNumber',
      'normalizeAccessor',
      'setWarnHandler',
      'toPath2D',
      'useDomain',
      'useLatestRef',
      'useStableCallback',
      'useStableId',
      'useStructuralMemo',
    ]);
  });
});
