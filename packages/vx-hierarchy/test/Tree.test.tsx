import React from 'react';
import { shallow } from 'enzyme';

import { hierarchy } from 'd3-hierarchy';
import { Tree } from '../src';
import { TreeProps } from '../src/hierarchies/Tree';

type Datum = { name: string; children: Datum[] };
const childrenFunc = jest.fn();
const mockHierarchy = hierarchy({
  name: 'Eve',
  children: [
    { name: 'Cain' },
    {
      name: 'Seth',
      children: [{ name: 'Enos' }, { name: 'Noam' }],
    },
  ],
} as Datum);

const TreeWrapper = (props: TreeProps<Datum>) => shallow(<Tree {...props} />);

describe('<Tree />', () => {
  test('it should be defined', () => {
    expect(Tree).toBeDefined();
  });

  test('it should call children as a function with required args', () => {
    TreeWrapper({ children: childrenFunc, root: mockHierarchy });
    const args = childrenFunc.mock.calls[0][0];
    expect(childrenFunc.mock.calls).toHaveLength(1);
    expect(args.data).toBeDefined();
  });
});
