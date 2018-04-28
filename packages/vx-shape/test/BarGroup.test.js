import React from 'react';
import { BarGroup } from '../src';
import { shallow, mount } from 'enzyme';

describe('<BarGroup />', () => {
  beforeEach(() => {
    global.console.error = jest.fn();
  });

  test('it should be defined', () => {
    expect(BarGroup).toBeDefined();
  });

  test('it should have className .vx-bar-group', () => {
    const wrapper = shallow(<BarGroup x0Scale={() => {}} data={[]} />);
    expect(wrapper.prop('className')).toEqual('vx-bar-group');
  });

  test('it should set className prop', () => {
    const wrapper = shallow(<BarGroup x0Scale={() => {}} className="test" data={[]} />);
    expect(wrapper.prop('className')).toEqual('vx-bar-group test');
  });

  test('it should require a data prop', () => {
    const wrapper = shallow(<BarGroup x0Scale={() => {}} />);
    expect(console.error).toBeCalled();
    expect(console.error.mock.calls[0][0]).toEqual(
      'Warning: Failed prop type: The prop `data` is marked as required in `BarGroup`, but its value is `undefined`.\n    in BarGroup'
    );
  });

  test('it should set top & left props', () => {
    const wrapper = shallow(
      <BarGroup x0Scale={() => {}} className="test" data={[]} top={2} left={3} />
    );
    expect(wrapper.prop('top')).toEqual(2);
    expect(wrapper.prop('left')).toEqual(3);
  });
});
