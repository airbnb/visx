import React from 'react';
import { BarStackHorizontal } from '../src';
import { shallow } from 'enzyme';

const yScale = jest.fn();
yScale.bandwidth = jest.fn();
yScale.step = jest.fn();
yScale.paddingInner = jest.fn();
yScale.paddingOuter = jest.fn();

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
        xScale={d => d}
        yScale={yScale}
        zScale={d => d}
        keys={[]}
      />
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
        xScale={d => d}
        yScale={yScale}
        zScale={d => d}
        keys={[]}
      />
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
        xScale={d => d}
        yScale={yScale}
        zScale={d => d}
        keys={[]}
      />
    );
    expect(wrapper.prop('top')).toEqual(2);
    expect(wrapper.prop('left')).toEqual(3);
  });
});
