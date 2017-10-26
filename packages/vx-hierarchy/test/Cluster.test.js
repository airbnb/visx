import React from 'react';
import { shallow } from 'enzyme';
import { hierarchy } from 'd3-hierarchy';
import { Cluster } from '../src';

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

const ClusterWrapper = ({ ...restProps }) =>
  shallow(<Cluster {...restProps} />);

describe('<Cluster />', () => {
  test('it should be defined', () => {
    expect(Cluster).toBeDefined();
  });

  test('it should call children as a function with required args', () => {
    ClusterWrapper({ children: childrenFunc, root: mockHierarchy });
    const args = childrenFunc.mock.calls[0][0];
    expect(childrenFunc.mock.calls.length).toBe(1);
    expect(args.data).toBeDefined();
  });
});
