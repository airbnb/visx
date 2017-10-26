import React from 'react';
import { shallow } from 'enzyme';
import { hierarchy } from 'd3-hierarchy';
import { Tree } from '../src';

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
});

const TreeWrapper = ({ ...restProps }) =>
  shallow(<Tree {...restProps} />);

describe('<Tree />', () => {
  test('it should be defined', () => {
    expect(Tree).toBeDefined();
  });

  test('it should call children as a function with required args', () => {
    TreeWrapper({ children: childrenFunc, root: mockHierarchy });
    const args = childrenFunc.mock.calls[0][0];
    expect(childrenFunc.mock.calls.length).toBe(1);
    expect(args.data).toBeDefined();
  });
});
