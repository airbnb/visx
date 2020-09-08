import React from 'react';
import { shallow } from 'enzyme';

import { PatternPath } from '../src';

describe('<PatternPath />', () => {
  test('it should be defined', () => {
    expect(PatternPath).toBeDefined();
  });

  test('it should require an id prop', () => {
    // @ts-ignore allow invalid props
    expect(() => shallow(<PatternPath width={4} height={4} />)).toThrow();
  });

  test('it should require a width prop', () => {
    // @ts-ignore allow invalid props
    expect(() => shallow(<PatternPath id="test" height={4} />)).toThrow();
  });

  test('it should require a height prop', () => {
    // @ts-ignore allow invalid props
    expect(() => shallow(<PatternPath id="test" width={4} />)).toThrow();
  });

  test('it should render a rect background if background prop defined', () => {
    const wrapper = shallow(<PatternPath id="test" height={4} width={4} background="blue" />);
    expect(wrapper.find('rect')).toHaveLength(1);
  });

  test('it should not render a rect background if no background prop', () => {
    const wrapper = shallow(<PatternPath id="test" height={4} width={4} />);
    expect(wrapper.find('rect')).toHaveLength(0);
  });
});
