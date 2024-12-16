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
import { shallow } from 'enzyme';

import { PatternWaves } from '../src';

describe('<PatternWaves />', () => {
  test('it should be defined', () => {
    expect(PatternWaves).toBeDefined();
  });

  test('it should require an id prop', () => {
    // @ts-expect-error allow invalid props
    expect(() => shallow(<PatternWaves width={4} height={4} />)).toThrow();
  });

  test('it should require a width prop', () => {
    // @ts-expect-error allow invalid props
    expect(() => shallow(<PatternWaves id="test" height={4} />)).toThrow();
  });

  test('it should require a height prop', () => {
    // @ts-expect-error allow invalid props
    expect(() => shallow(<PatternWaves id="test" width={4} />)).toThrow();
  });
});
// MIGRATION STATUS: {"eslint":"pending","jest":{"passed":4,"failed":0,"total":4,"skipped":0,"successRate":100},"tsc":"pending","enyzme":"pending"}
