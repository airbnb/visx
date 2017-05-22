import React from 'react';
import { AxisLeft } from '../src';
import { shallow } from 'enzyme';

describe('<AxisLeft />', () => {
  test('it should be defined', () => {
    expect(AxisLeft).toBeDefined()
  })

  test('it should render with class .vx-axis-left', () => {
    const wrapper = shallow(<AxisLeft />)
    expect(wrapper.prop('className')).toEqual('vx-axis-left')
  })

  test('it should set className', () => {
    const wrapper = shallow(<AxisLeft className='test' />)
    expect(wrapper.prop('className')).toEqual('vx-axis-left test')
  })

  test('it should default labelOffset prop to 36', () => {
    const wrapper = shallow(<AxisLeft />)
    expect(wrapper.prop('labelOffset')).toEqual(36)
  })

  test('it should set labelOffset prop', () => {
    const labelOffset = 3
    const wrapper = shallow(<AxisLeft labelOffset={labelOffset} />)
    expect(wrapper.prop('labelOffset')).toEqual(labelOffset)
  })

  test('it should default tickLength prop to 8', () => {
    const wrapper = shallow(<AxisLeft />)
    expect(wrapper.prop('tickLength')).toEqual(8)
  })

  test('it should set tickLength prop', () => {
    const tickLength = 15
    const wrapper = shallow(<AxisLeft tickLength={tickLength} />)
    expect(wrapper.prop('tickLength')).toEqual(tickLength)
  })
})
