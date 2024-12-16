/** @jest-environment jsdom */
/**
 * LLM-GENERATED REFACTOR
 *
 * This file was migrated from Enzyme to RTL using generative AI.
 * To make the migration as clean as possible, the LLM was instructed to
 * use testing patterns similar to Enzyme.
 *
 * If you are making changes to this file, please consider refactoring
 * to more idiomatic RTL (and then removing this banner!).
 */
import React from 'react';
import { render } from '@testing-library/react';
import { hierarchy } from 'd3-hierarchy';
import { Tree } from '../src';

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

describe('<Tree />', () => {
  afterEach(() => {
    jest.clearAllMocks();
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
// MIGRATION STATUS: {"eslint":"pending","jest":{"passed":2,"failed":0,"total":2,"skipped":0,"successRate":100},"tsc":"pending","enyzme":"converted"}
