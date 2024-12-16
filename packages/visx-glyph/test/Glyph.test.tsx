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
import { shallow, render } from 'enzyme';

import { Glyph } from '../src';

describe('<Glyph />', () => {
  test('it should be defined', () => {
    expect(Glyph).toBeDefined();
  });

  test('it should be wrapped in a <Glyph />', () => {
    const wrapper = shallow(<Glyph />);
    expect(wrapper.prop('className')).toBe('visx-glyph');
  });

  test('it should add className to <path />', () => {
    const wrapper = shallow(<Glyph className="test" />);
    expect(wrapper.find('.test')).toHaveLength(1);
  });

  test('it should take top,left number props', () => {
    const wrapper = render(<Glyph top={2} left={2} />);
    expect(wrapper[0].attribs.transform as string).toBe('translate(2, 2)');
  });
});
// MIGRATION STATUS: {"eslint":"pending","jest":{"passed":0,"failed":0,"total":0,"skipped":0,"successRate":0},"tsc":"pending","enyzme":"pending"}
