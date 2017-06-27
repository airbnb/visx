import React from 'react';
import { shallow } from 'enzyme';
import { Group } from '../src';

describe('<Group />', () => {
  test('it should be defined', () => {
    expect(Group).toBeDefined();
  });

  test('it should have class=\'cx-group\'', () => {
    const wrapper = shallow(<Group />);
    expect(wrapper.prop('className')).toEqual('cx-group');
  });

  test('it should default props top=0 left=0', () => {
    const wrapper = shallow(<Group />);
    expect(wrapper.prop('transform')).toEqual('translate(0, 0)');
  });

  test('it should set props top, left, className', () => {
    const wrapper = shallow(
      <Group
        className='test'
        top={3}
        left={4}
      />
    );
    expect(wrapper.prop('transform')).toEqual('translate(4, 3)');
    expect(wrapper.prop('className')).toEqual('cx-group test');
  });

  test('it should set restProps', () => {
    const wrapper = shallow(<Group clipPath="url(#myClip)" stroke="mapleSyrup" />);
    expect(wrapper.prop('clipPath')).toEqual('url(#myClip)');
    expect(wrapper.prop('stroke')).toEqual('mapleSyrup');
  });
});
