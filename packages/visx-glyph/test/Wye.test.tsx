import React from 'react';
import { shallow } from 'enzyme';

import { GlyphWye } from '../src';

describe('<GlyphWye />', () => {
  test('it should be defined', () => {
    expect(GlyphWye).toBeDefined();
  });

  test('it should be wrapped in a <Glyph />', () => {
    const wrapper = shallow(<GlyphWye />);
    expect(wrapper.dive().prop('className')).toBe('visx-glyph');
  });

  test('it should add className to <path />', () => {
    const wrapper = shallow(<GlyphWye className="test" />);
    expect(wrapper.find('.test')).toHaveLength(1);
  });

  test('it should take a children as function prop', () => {
    const fn = jest.fn();
    shallow(<GlyphWye>{fn}</GlyphWye>);
    expect(fn).toHaveBeenCalled();
  });

  test('it should call children function with { path }', () => {
    const fn = jest.fn();
    shallow(<GlyphWye>{fn}</GlyphWye>);
    const args = fn.mock.calls[0][0];
    const keys = Object.keys(args);
    expect(keys).toContain('path');
  });

  test('it should take a size prop as a number', () => {
    const fn = jest.fn();
    shallow(<GlyphWye size={42}>{fn}</GlyphWye>);
    const args = fn.mock.calls[0][0];
    expect(args.path.size()()).toBe(42);
  });

  test('it should take a size prop as a function', () => {
    const fn = jest.fn();
    const sizeFn = () => 42;
    shallow(<GlyphWye size={sizeFn}>{fn}</GlyphWye>);
    const args = fn.mock.calls[0][0];
    expect(args.path.size()()).toBe(42);
  });
});
