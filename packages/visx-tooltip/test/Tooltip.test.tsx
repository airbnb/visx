import React from 'react';
import { shallow } from 'enzyme';
import { Tooltip, defaultStyles } from '../src';

describe('<Tooltip />', () => {
  test('it should be defined', () => {
    expect(Tooltip).toBeDefined();
  });

  it('should render with the default styles', () => {
    const wrapper = shallow(<Tooltip>Hello</Tooltip>);
    const styles = wrapper.props().style;
    Object.entries(defaultStyles).forEach(([key, value]) => {
      expect(styles[key]).toBe(value);
    });
  });

  it('should render with no default styles', () => {
    const wrapper = shallow(<Tooltip unstyled>Hello</Tooltip>);
    const styles = wrapper.props().style;
    Object.keys(defaultStyles).forEach((key) => {
      expect(styles[key]).toBeUndefined();
    });
  });

  it('should overwrite default styles when given the style prop', () => {
    const newStyles: React.CSSProperties = {
      position: 'relative',
      backgroundColor: 'green',
      color: 'red',
      padding: '.8rem .8rem',
      borderRadius: '13px',
      fontSize: '17px',
      boxShadow: '0 2px 3px rgba(133,133,133,0.5)',
      lineHeight: '2em',
    };
    const wrapper = shallow(<Tooltip style={newStyles} />);
    const styles = wrapper.props().style;
    Object.entries(newStyles).forEach(([key, value]) => {
      expect(styles[key]).toBe(value);
    });
  });
});
