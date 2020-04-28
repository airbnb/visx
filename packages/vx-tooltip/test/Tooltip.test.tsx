import React from 'react';
import { shallow } from 'enzyme';
import { Tooltip, defaultStyles } from '../src';

describe('<Tooltip />', () => {
  test('it should be defined', () => {
    expect(Tooltip).toBeDefined();
  });

  it('should render with the correct default styles', () => {
    const wrapper = shallow(<Tooltip>Hello</Tooltip>);
    const styles = wrapper.props().style;
    Object.entries(defaultStyles).forEach(([key, value]) => {
      expect(styles[key]).toBe(value);
    });
  });

  it('should render with no default styles', () => {
    const wrapper = shallow(<Tooltip unstyled={true}>Hello</Tooltip>);
    const styles = wrapper.props().style;
    Object.keys(defaultStyles).forEach(key => {
      expect(styles[key]).toBe(undefined);
    });
  });
});
