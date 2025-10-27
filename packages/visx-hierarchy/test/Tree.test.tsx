import { vi } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import { hierarchy } from 'd3-hierarchy';
import { Tree } from '../src';

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

describe('<Tree />', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test('it should be defined', () => {
    expect(Tree).toBeDefined();
  });

  test('it should call children as a function with required args', () => {
    render(<Tree children={childrenFunc} root={mockHierarchy} />);
    const args = childrenFunc.mock.calls[0][0];
    expect(childrenFunc.mock.calls).toHaveLength(1);
    expect(args.data).toBeDefined();
  });
});
