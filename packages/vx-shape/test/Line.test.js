import React from 'react';
import { shallow } from 'enzyme';
import { Line } from '../src';

const LineWrapper = ({ ...restProps }) => shallow(<Line {...restProps} />);

describe('<Line />', () => {
  test('it should be defined', () => {
    expect(Line).toBeDefined();
  });

  test('it should contain a <line/>', () => {
    expect(LineWrapper().find('line').length).toBe(1);
  });

  test('it should have the .vx-line class', () => {
    expect(LineWrapper().prop('className')).toBe('vx-line');
  });
});
