import React from 'react';
import { shallow } from 'enzyme';

import { hierarchy } from 'd3-hierarchy';
import { Cluster } from '../src';
import { ClusterProps } from '../src/hierarchies/Cluster';

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

const ClusterWrapper = (props: ClusterProps<Datum>) => shallow(<Cluster {...props} />);

describe('<Cluster />', () => {
  test('it should be defined', () => {
    expect(Cluster).toBeDefined();
  });

  test('it should call children as a function with required args', () => {
    ClusterWrapper({ children: childrenFunc, root: mockHierarchy });
    const args = childrenFunc.mock.calls[0][0];
    expect(childrenFunc.mock.calls).toHaveLength(1);
    expect(args.data).toBeDefined();
  });
});
