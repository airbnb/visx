import React from 'react';
import { BarGroupHorizontal } from '../src';
import { shallow, mount } from 'enzyme';

describe('<BarGroupHorizontal />', () => {
  beforeEach(() => {
    global.console.error = jest.fn();
  });

  test('it should be defined', () => {
    expect(BarGroupHorizontal).toBeDefined();
  });

  test('it should have className .vx-bar-group-horizontal', () => {
    const wrapper = shallow(<BarGroupHorizontal y0Scale={() => {}} data={[]} />);
    expect(wrapper.prop('className')).toEqual('vx-bar-group-horizontal');
  });

  test('it should set className prop', () => {
    const wrapper = shallow(<BarGroupHorizontal y0Scale={() => {}} className="test" data={[]} />);
    expect(wrapper.prop('className')).toEqual('vx-bar-group-horizontal test');
  });

  test('it should require a data prop', () => {
    const wrapper = shallow(<BarGroupHorizontal y0Scale={() => {}} />);
    expect(console.error).toBeCalled();
    expect(console.error.mock.calls[0][0]).toEqual(
      'Warning: Failed prop type: The prop `data` is marked as required in `BarGroupHorizontal`, but its value is `undefined`.\n    in BarGroupHorizontal'
    );
  });

  test('it should set top & left props', () => {
    const wrapper = shallow(
      <BarGroupHorizontal y0Scale={() => {}} className="test" data={[]} top={2} left={3} />
    );
    expect(wrapper.prop('top')).toEqual(2);
    expect(wrapper.prop('left')).toEqual(3);
  });
});
