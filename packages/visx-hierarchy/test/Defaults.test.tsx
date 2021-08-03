import {
  HierarchyDefaultLink,
  HierarchyDefaultNode,
  HierarchyDefaultRectNode,
  hierarchy,
  stratify,
  treemapBinary,
  treemapDice,
  treemapResquarify,
  treemapSlice,
  treemapSliceDice,
  treemapSquarify,
} from '../src';

describe('<DefaultLink />', () => {
  test('should be defined', () => {
    expect(HierarchyDefaultLink).toBeDefined();
  });
});

describe('<DefaultNode />', () => {
  test('should be defined', () => {
    expect(HierarchyDefaultNode).toBeDefined();
  });
});

describe('<DefaultRectNode />', () => {
  test('should be defined', () => {
    expect(HierarchyDefaultRectNode).toBeDefined();
  });
});

describe('d3 exports', () => {
  test('should export hierarchy', () => {
    expect(hierarchy).toBeDefined();
  });

  test('should export stratify', () => {
    expect(stratify).toBeDefined();
  });

  test('should export treemap tiling functions', () => {
    const tilers = [
      treemapBinary,
      treemapDice,
      treemapResquarify,
      treemapSlice,
      treemapSliceDice,
      treemapSquarify,
    ];

    expect.assertions(tilers.length);

    tilers.forEach((tiler) => {
      expect(tiler).toBeDefined();
    });
  });
});
