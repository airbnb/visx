import React from 'react';
import { BarStack } from '../src';
import { shallow } from 'enzyme';

describe('<BarStack />', () => {
  test('it should be defined', () => {
    expect(BarStack).toBeDefined()
  })

  test('it should have className .vx-bar-stack', () => {
    const wrapper = shallow(
      <BarStack
        data={[]}
        top={2}
        left={3}
        x={d => d}
        xScale={d => d}
        yScale={d => d}
        zScale={d => d}
        keys={[]}
      />
    )
    expect(wrapper.prop('className')).toEqual('vx-bar-stack')
  })

  test('it should set className prop', () => {
    const wrapper = shallow(
      <BarStack
        className='test'
        data={[]}
        top={2}
        left={3}
        x={d => d}
        xScale={d => d}
        yScale={d => d}
        zScale={d => d}
        keys={[]}
      />
    )
    expect(wrapper.prop('className')).toEqual('vx-bar-stack test')
  })

  test('it should set top & left props', () => {
    const wrapper = shallow(
      <BarStack
        className='test'
        data={[]}
        top={2}
        left={3}
        x={d => d}
        xScale={d => d}
        yScale={d => d}
        zScale={d => d}
        keys={[]}
      />
    )
    expect(wrapper.prop('top')).toEqual(2)
    expect(wrapper.prop('left')).toEqual(3)
  })
})