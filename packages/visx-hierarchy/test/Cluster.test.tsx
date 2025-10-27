import { vi } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import { hierarchy } from 'd3-hierarchy';
import { Cluster } from '../src';

type Datum = { name: string; children: Datum[] };
const childrenFunc = vi.fn();
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

describe('<Cluster />', () => {
  test('it should be defined', () => {
    expect(Cluster).toBeDefined();
  });

  test('it should call children as a function with required args', () => {
    render(<Cluster children={childrenFunc} root={mockHierarchy} />);
    const args = childrenFunc.mock.calls[0][0];
    expect(childrenFunc).toHaveBeenCalledTimes(1);
    expect(args.data).toBeDefined();
  });
});
