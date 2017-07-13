import React from 'react';
import { Axis } from '../src';
import { shallow } from 'enzyme';
import { scaleLinear } from '../../vx-scale';

const fakeScale = scaleLinear({
  rangeRound: [10, 0],
  domain: [0, 10],
});

describe('<Axis />', () => {
  test('it should be defined', () => {
    expect(Axis).toBeDefined()
  })

  test('it should render with class .vx-axis', () => {
    const wrapper = shallow(<Axis scale={fakeScale} />)
    expect(wrapper.prop('className')).toEqual('vx-axis')
  })

  test('it should pass users class down to element', () => {
    const fakeClass = "test-class"
    const wrapper = shallow(<Axis scale={fakeScale} className={fakeClass} />)
    expect(wrapper.prop('className')).toEqual(`vx-axis ${fakeClass}`);
  })

  test('it should render the 0th element if the user so declares', () => {
    // Note that we're explicitly passing in false so that we're testing
    // the rendering, NOT wether or not this is a default value.
    const wrapper = shallow(<Axis scale={fakeScale} hideZero={false} />)
    expect(wrapper.find('.vx-axis-ticks').at(0).key()).toBe('vx-tick-0-0');
  })

  test('it should not show 0th tick if the user so declares', () => {
    const wrapper = shallow(<Axis scale={fakeScale} hideZero />)
    expect(wrapper.find('.vx-axis-ticks').at(0).key()).toBe('vx-tick-1-1');
  })

  test('it should SHOW an axis line if the user so declares', () => {
    // Again, we're explicitly passing in false so we're testing 
    // the rendering, NOT the default value.
    const wrapper = shallow(<Axis scale={fakeScale} hideAxisLine={false} />)
    expect(wrapper.children().not(".vx-axis-ticks").find("Line").length).toBe(1);
  })

  test('it should HIDE an axis line if the user so declares', () => {
    const wrapper = shallow(<Axis scale={fakeScale} hideAxisLine />)
    expect(wrapper.children().not(".vx-axis-ticks").find("Line").length).toBe(0);
  })

  test('it should SHOW ticks if the user', () => {
    // Again, we're explicitly passing in false so we're testing 
    // the rendering, NOT the default value.
    const wrapper = shallow(<Axis scale={fakeScale} hideTicks={false} />)
    expect(wrapper.children().find(".vx-axis-ticks").find("Line").length).toBeGreaterThan(0);
  })

  test('it should HIDE ticks if the user', () => {
    const wrapper = shallow(<Axis scale={fakeScale} hideTicks />)
    expect(wrapper.children().find(".vx-axis-ticks").find("Line").length).toBe(0);
  })
})
