import React from 'react';
import { shallow } from 'enzyme';

import { HeatmapCircle } from '../src';
// @ts-ignore
import { genBins } from '../../vx-mock-data/src';

const data: {
  bin: number;
  bins: { bin: number; count: number }[];
}[] = genBins(1, 1);

const xScale = () => 50;
const yScale = () => 50;
const HeatmapWrapper = (props = {}) =>
  shallow(<HeatmapCircle data={data} xScale={xScale} yScale={yScale} {...props} />);

describe('<HeatmapCircle />', () => {
  test('it should be defined', () => {
    expect(HeatmapCircle).toBeDefined();
  });

  test('it should have the .vx-heatmap-circles class', () => {
    const wrapper = HeatmapWrapper();
    expect(wrapper.prop('className')).toBe('vx-heatmap-circles');
  });

  test('it should have the .vx-heatmap-circle class', () => {
    const wrapper = HeatmapWrapper({ className: 'test' });
    expect(wrapper.find('circle').prop('className')).toBe('vx-heatmap-circle test');
  });

  test('it should set <circle /> r to radius - gap', () => {
    const wrapper = HeatmapWrapper({ radius: 10, gap: 2 });
    expect(wrapper.find('circle').prop('r')).toBe(8);
  });
});
