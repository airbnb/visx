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
import { isTSAnyKeyword } from '@babel/types';

describe('<DefaultLink />', () => {
  it('should be defined', () => {
    expect(HierarchyDefaultLink).toBeDefined();
  });
});

describe('<DefaultNode />', () => {
  it('should be defined', () => {
    expect(HierarchyDefaultNode).toBeDefined();
  });
});

describe('<DefaultRectNode />', () => {
  it('should be defined', () => {
    expect(HierarchyDefaultRectNode).toBeDefined();
  });
});

describe('d3 exports', () => {
  it('should export hierarchy', () => {
    expect(hierarchy).toBeDefined();
  });

  it('should export stratify', () => {
    expect(stratify).toBeDefined();
  });

  it('should export treemap tiling functions', () => {
    const tilers = [
      treemapBinary,
      treemapDice,
      treemapResquarify,
      treemapSlice,
      treemapSliceDice,
      treemapSquarify,
    ];

    expect.assertions(tilers.length);

    tilers.forEach(tiler => {
      expect(tiler).toBeDefined();
    });
  });
});
