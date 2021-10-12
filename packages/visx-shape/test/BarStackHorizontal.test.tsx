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
    expect(wrapper.prop('className')).toEqual('visx-bar-stack-horizontal');
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
    expect(wrapper.prop('className')).toEqual('visx-bar-stack-horizontal test');
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
    expect(wrapper.prop('top')).toEqual(2);
    expect(wrapper.prop('left')).toEqual(3);
  });
});
