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
import { scaleLinear } from '@visx/scale';
import { ViolinPlot, computeStats } from '../src';

const data = [1, 2, 3, 4, 5, 6, 6, 7, 8, 9, 1];
const { binData } = computeStats(data);

const valueScale = scaleLinear({
  range: [10, 0],
  round: true,
  domain: [0, 10],
});

describe('<VoilinPlot />', () => {
  test('it should be defined', () => {
    expect(ViolinPlot).toBeDefined();
  });

  test('it should have className .visx-violin', () => {
    const wrapper = shallow(
      <ViolinPlot data={binData} left={3} width={100} valueScale={valueScale} />,
    );
    expect(wrapper.prop('className')).toBe('visx-violin');
  });

  test('it should render one path element', () => {
    const wrapper = shallow(
      <ViolinPlot data={binData} left={3} width={100} valueScale={valueScale} />,
    );
    expect(wrapper.find('path')).toHaveLength(1);
  });
});
// MIGRATION STATUS: {"eslint":"pending","jest":{"passed":3,"failed":0,"total":3,"skipped":0,"successRate":100},"tsc":"pending","enyzme":"pending"}
