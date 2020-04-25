import React from 'react';
import { shallow } from 'enzyme';
import { Tooltip, tooltipDefaultStyles } from '../src';

describe('<Tooltip />', () => {
  test('it should be defined', () => {
    expect(Tooltip).toBeDefined();
  });

  it('should render with the correct default styles', () => {
    const wrapper = shallow(<Tooltip>Hello</Tooltip>);
    const styles = wrapper.props().style;
    Object.entries(tooltipDefaultStyles).forEach(([key, value]) => {
      expect(styles[key]).toBe(value);
    });
  });

  it('should render with no default styles', () => {
    const wrapper = shallow(<Tooltip withDefaultStyles={false}>Hello</Tooltip>);
    const styles = wrapper.props().style;
    Object.keys(tooltipDefaultStyles).forEach(key => {
      expect(styles[key]).toBe(undefined);
    });
  });
});
