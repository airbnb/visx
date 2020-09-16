import React from 'react';
import { shallow } from 'enzyme';

import { GlyphStar } from '../src';

describe('<GlyphStar />', () => {
  test('it should be defined', () => {
    expect(GlyphStar).toBeDefined();
  });

  test('it should be wrapped in a <Glyph />', () => {
    const wrapper = shallow(<GlyphStar />);
    expect(wrapper.dive().prop('className')).toBe('vx-glyph');
  });

  test('it should add className to <path />', () => {
    const wrapper = shallow(<GlyphStar className="test" />);
    expect(wrapper.find('.test')).toHaveLength(1);
  });

  test('it should take a children as function prop', () => {
    const fn = jest.fn();
    shallow(<GlyphStar>{fn}</GlyphStar>);
    expect(fn).toHaveBeenCalled();
  });

  test('it should call children function with { path }', () => {
    const fn = jest.fn();
    shallow(<GlyphStar>{fn}</GlyphStar>);
    const args = fn.mock.calls[0][0];
    const keys = Object.keys(args);
    expect(keys.includes('path')).toEqual(true);
  });

  test('it should take a size prop as a number', () => {
    const fn = jest.fn();
    shallow(<GlyphStar size={42}>{fn}</GlyphStar>);
    const args = fn.mock.calls[0][0];
    expect(args.path.size()()).toBe(42);
  });

  test('it should take a size prop as a function', () => {
    const fn = jest.fn();
    const sizeFn = () => 42;
    shallow(<GlyphStar size={sizeFn}>{fn}</GlyphStar>);
    const args = fn.mock.calls[0][0];
    expect(args.path.size()()).toBe(42);
  });
});
