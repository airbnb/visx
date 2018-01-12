import React from 'react';
import { shallow, mount } from 'enzyme';
import { Legend } from '../src';
import { scaleLinear } from '../../vx-scale';

const defaultProps = {
  scale: scaleLinear({
    rangeRound: [10, 0],
    domain: [0, 10],
  }),
};

describe('<Legend />', () => {
  test('it should be defined', () => {
    expect(Legend).toBeDefined();
  });

  test('it should default style to display: flex, flex-direction: column ', () => {
    const wrapper = shallow(<Legend {...defaultProps} />);
    expect(wrapper.prop('style')).toEqual({
      display: 'flex',
      flexDirection: 'column',
    });
  });

  test('it should extend style prop', () => {
    const wrapper = shallow(
      <Legend {...defaultProps} style={{ display: 'block' }} />,
    );
    expect(wrapper.prop('style')).toEqual({
      display: 'block',
      flexDirection: 'column',
    });
  });

  test('it should pass through direction prop to style prop', () => {
    const wrapper = shallow(
      <Legend {...defaultProps} direction="row" />,
    );
    expect(wrapper.prop('style')).toEqual({
      display: 'flex',
      flexDirection: 'row',
    });
  });

  test('it should pass onClick prop to <LegendItem />', () => {
    const event = jest.fn(event => jest.fn());
    const onClick = jest.fn(data => event);
    const wrapper = mount(
      <Legend {...defaultProps} onClick={onClick} />,
    );
    wrapper
      .find('LegendItem')
      .last()
      .simulate('click');
    // called twice, once to bind data, once when click event
    expect(onClick.mock.calls.length).toEqual(2);
    expect(event.mock.calls.length).toEqual(1);
    // called with click event
    expect(event.mock.calls[0][0].type).toEqual('click');
    expect(onClick.mock.calls[1][0]).toEqual({
      datum: 10,
      index: 1,
      text: '10',
      value: 0,
    });
  });
});
