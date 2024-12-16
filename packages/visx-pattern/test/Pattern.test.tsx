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

import { Pattern } from '../src';

describe('<Pattern />', () => {
  test('it should be defined', () => {
    expect(Pattern).toBeDefined();
  });

  test('it should require an id prop', () => {
    expect(() =>
      shallow(
        // @ts-expect-error allow invalid props
        <Pattern width={4} height={4}>
          <rect />
        </Pattern>,
      ),
    ).toThrow();
  });

  test('it should require a width prop', () => {
    expect(() =>
      shallow(
        // @ts-expect-error allow invalid props
        <Pattern id="test" height={4}>
          <rect />
        </Pattern>,
      ),
    ).toThrow();
  });

  test('it should require a height prop', () => {
    expect(() =>
      shallow(
        // @ts-expect-error allow invalid props
        <Pattern id="test" width={4}>
          <rect />
        </Pattern>,
      ),
    ).toThrow();
  });

  test('it should require children', () => {
    // @ts-expect-error allow invalid prop
    expect(() => shallow(<Pattern id="test" width={4} />)).toThrow();
  });
});
// MIGRATION STATUS: {"eslint":"pending","jest":{"passed":5,"failed":0,"total":5,"skipped":0,"successRate":100},"tsc":"pending","enyzme":"pending"}
