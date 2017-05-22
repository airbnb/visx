import React from 'react';
import { BarGroup } from '../src';
import { shallow, mount } from 'enzyme';

describe('<BarGroup />', () => {
  beforeEach(() => {
    global.console.error = jest.fn()
  })

  test('it should be defined', () => {
    expect(BarGroup).toBeDefined()
  })

  test('it should have className .vx-bar-group', () => {
    const wrapper = shallow(<BarGroup data={[]} />)
    expect(wrapper.prop('className')).toEqual('vx-bar-group')
  })

  test('it should set className prop', () => {
    const wrapper = shallow(<BarGroup className='test' data={[]} />)
    expect(wrapper.prop('className')).toEqual('vx-bar-group test')
  })

  test('it should require a data prop', () => {
    const wrapper = shallow(<BarGroup />);
    expect(console.error).toBeCalled()
    expect(console.error.mock.calls[0][0]).toEqual("Warning: Failed prop type: The prop `data` is marked as required in `BarGroup`, but its value is `undefined`.\n    in BarGroup")
  })
})
