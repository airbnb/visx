import React from 'react';
import { shallow, render } from 'enzyme';

import { Glyph } from '../src';

describe('<Glyph />', () => {
  test('it should be defined', () => {
    expect(Glyph).toBeDefined();
  });

  test('it should be wrapped in a <Glyph />', () => {
    const wrapper = shallow(<Glyph />);
    expect(wrapper.prop('className')).toBe('visx-glyph');
  });

  test('it should add className to <path />', () => {
    const wrapper = shallow(<Glyph className="test" />);
    expect(wrapper.find('.test')).toHaveLength(1);
  });

  test('it should take top,left number props', () => {
    const wrapper = render(<Glyph top={2} left={2} />);
    expect(wrapper[0].attribs.transform as string).toBe('translate(2, 2)');
  });
});
