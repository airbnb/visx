import React from 'react';
import { shallow } from 'enzyme';

import { GlyphTriangle } from '../src';

describe('<GlyphTriangle />', () => {
  test('it should be defined', () => {
    expect(GlyphTriangle).toBeDefined();
  });

  test('it should be wrapped in a <Glyph />', () => {
    const wrapper = shallow(<GlyphTriangle />);
    expect(wrapper.dive().prop('className')).toBe('visx-glyph');
  });

  test('it should add className to <path />', () => {
    const wrapper = shallow(<GlyphTriangle className="test" />);
    expect(wrapper.find('.test')).toHaveLength(1);
  });

  test('it should take a children as function prop', () => {
    const fn = jest.fn();
    shallow(<GlyphTriangle>{fn}</GlyphTriangle>);
    expect(fn).toHaveBeenCalled();
  });

  test('it should call children function with { path }', () => {
    const fn = jest.fn();
    shallow(<GlyphTriangle>{fn}</GlyphTriangle>);
    const args = fn.mock.calls[0][0];
    const keys = Object.keys(args);
    expect(keys).toContain('path');
  });

  test('it should take a size prop as a number', () => {
    const fn = jest.fn();
    shallow(<GlyphTriangle size={42}>{fn}</GlyphTriangle>);
    const args = fn.mock.calls[0][0];
    expect(args.path.size()()).toBe(42);
  });

  test('it should take a size prop as a function', () => {
    const fn = jest.fn();
    const sizeFn = () => 42;
    shallow(<GlyphTriangle size={sizeFn}>{fn}</GlyphTriangle>);
    const args = fn.mock.calls[0][0];
    expect(args.path.size()()).toBe(42);
  });
});
