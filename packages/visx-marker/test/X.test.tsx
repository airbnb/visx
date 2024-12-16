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
import { MarkerX, MarkerCross } from '../src';

const Wrapper = (restProps = {}) => shallow(<MarkerX id="marker-x-test" {...restProps} />);

describe('<MarkerX />', () => {
  test('it should be defined', () => {
    expect(MarkerX).toBeDefined();
  });

  test('it should render a <MarkerCross /> rotated 45deg', () => {
    const cross = Wrapper().find(MarkerCross);
    expect(cross).toHaveLength(1);
    expect(cross.prop('orient')).toBe(45);
  });
});
// MIGRATION STATUS: {"eslint":"pending","jest":{"passed":2,"failed":0,"total":2,"skipped":0,"successRate":100},"tsc":"pending","enyzme":"pending"}
