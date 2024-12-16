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

import { HeatmapRect } from '../src';

const data: {
  bin: number;
  bins: { bin: number; count: number }[];
}[] = [{ bin: 0, bins: [{ bin: 0, count: 1 }] }];

const xScale = () => 50;
const yScale = () => 50;

const HeatmapWrapper = (props = {}) =>
  shallow(<HeatmapRect data={data} xScale={xScale} yScale={yScale} {...props} />);

describe('<HeatmapRect />', () => {
  test('it should be defined', () => {
    expect(HeatmapRect).toBeDefined();
  });

  test('it should have the .visx-heatmap-rects class', () => {
    const wrapper = HeatmapWrapper();
    expect(wrapper.prop('className')).toBe('visx-heatmap-rects');
  });

  test('it should have the .visx-heatmap-rect class', () => {
    const wrapper = HeatmapWrapper({ className: 'test' });
    expect(wrapper.find('rect').prop('className')).toBe('visx-heatmap-rect test');
  });

  test('it should set <rect /> width & height to bin{Width,Height} - gap', () => {
    const wrapper = HeatmapWrapper({ binWidth: 10, binHeight: 14, gap: 2 });
    expect(wrapper.find('rect').prop('width')).toBe(8);
    expect(wrapper.find('rect').prop('height')).toBe(12);
  });
});
// MIGRATION STATUS: {"eslint":"pending","jest":{"passed":0,"failed":0,"total":0,"skipped":0,"successRate":0},"tsc":"pending","enyzme":"pending"}
