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

import { PatternCircles } from '../src';

describe('<PatternCircles />', () => {
  test('it should be defined', () => {
    expect(PatternCircles).toBeDefined();
  });

  test('it should require an id prop', () => {
    // @ts-expect-error allow invalid props
    expect(() => shallow(<PatternCircles width={4} height={4} />)).toThrow();
  });

  test('it should require a width prop', () => {
    // @ts-expect-error allow invalid props
    expect(() => shallow(<PatternCircles id="test" height={4} />)).toThrow();
  });

  test('it should require a height prop', () => {
    // @ts-expect-error allow invalid props
    expect(() => shallow(<PatternCircles id="test" width={4} />)).toThrow();
  });

  test('it should render a rect background if background prop defined', () => {
    const wrapper = shallow(<PatternCircles id="test" height={4} width={4} background="blue" />);
    expect(wrapper.find('rect')).toHaveLength(1);
  });

  test('it should not render a rect background if no background prop', () => {
    const wrapper = shallow(<PatternCircles id="test" height={4} width={4} />);
    expect(wrapper.find('rect')).toHaveLength(0);
  });
});
// MIGRATION STATUS: {"eslint":"pending","jest":{"passed":0,"failed":0,"total":0,"skipped":0,"successRate":0},"tsc":"pending","enyzme":"pending"}
