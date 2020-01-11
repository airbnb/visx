import React from 'react';
import { shallow } from 'enzyme';

import { BarStackHorizontal } from '../src';

const scale = () => 5;
scale.domain = () => [0, 100] as [number, number];
scale.range = () => [0, 100] as [number, number];
scale.bandwidth = () => 5;
scale.step = () => 5;
scale.paddingInner = () => 5;
scale.paddingOuter = () => 5;
scale.copy = () => scale;

describe('<BarStackHorizontal />', () => {
  test('it should be defined', () => {
    expect(BarStackHorizontal).toBeDefined();
  });

  test('it should have className .vx-bar-stack-horizontal', () => {
    const wrapper = shallow(
      <BarStackHorizontal
        data={[]}
        top={2}
        left={3}
        y={d => d}
        xScale={scale}
        yScale={scale}
        color={d => d}
        keys={[]}
      />,
    );
    expect(wrapper.prop('className')).toEqual('vx-bar-stack-horizontal');
  });

  test('it should set className prop', () => {
    const wrapper = shallow(
      <BarStackHorizontal
        className="test"
        data={[]}
        top={2}
        left={3}
        y={d => d}
        xScale={scale}
        yScale={scale}
        color={d => d}
        keys={[]}
      />,
    );
    expect(wrapper.prop('className')).toEqual('vx-bar-stack-horizontal test');
  });

  test('it should set top & left props', () => {
    const wrapper = shallow(
      <BarStackHorizontal
        className="test"
        data={[]}
        top={2}
        left={3}
        y={d => d}
        xScale={scale}
        yScale={scale}
        color={d => d}
        keys={[]}
      />,
    );
    expect(wrapper.prop('top')).toEqual(2);
    expect(wrapper.prop('left')).toEqual(3);
  });
});
