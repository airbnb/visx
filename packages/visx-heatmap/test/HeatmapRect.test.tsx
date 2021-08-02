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
