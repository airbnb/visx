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

import { scaleBand } from '@visx/scale';
import { BarStackHorizontal } from '../src';

const scale = scaleBand({
  domain: [0, 100],
  range: [0, 100],
  paddingInner: 5,
  paddingOuter: 5,
});

describe('<BarStackHorizontal />', () => {
  test('it should be defined', () => {
    expect(BarStackHorizontal).toBeDefined();
  });

  test('it should have className .visx-bar-stack-horizontal', () => {
    const wrapper = shallow(
      <BarStackHorizontal
        data={[]}
        top={2}
        left={3}
        y={(d) => d}
        xScale={scale}
        yScale={scale}
        color={(d) => d}
        keys={[]}
      />,
    );
    expect(wrapper.prop('className')).toBe('visx-bar-stack-horizontal');
  });

  test('it should set className prop', () => {
    const wrapper = shallow(
      <BarStackHorizontal
        className="test"
        data={[]}
        top={2}
        left={3}
        y={(d) => d}
        xScale={scale}
        yScale={scale}
        color={(d) => d}
        keys={[]}
      />,
    );
    expect(wrapper.prop('className')).toBe('visx-bar-stack-horizontal test');
  });

  test('it should set top & left props', () => {
    const wrapper = shallow(
      <BarStackHorizontal
        className="test"
        data={[]}
        top={2}
        left={3}
        y={(d) => d}
        xScale={scale}
        yScale={scale}
        color={(d) => d}
        keys={[]}
      />,
    );
    expect(wrapper.prop('top')).toBe(2);
    expect(wrapper.prop('left')).toBe(3);
  });
});
// MIGRATION STATUS: {"eslint":"pending","jest":{"passed":4,"failed":0,"total":4,"skipped":0,"successRate":100},"tsc":"pending","enyzme":"pending"}
