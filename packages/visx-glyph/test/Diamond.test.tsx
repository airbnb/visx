import React from 'react';
import { shallow } from 'enzyme';

import { GlyphDiamond } from '../src';

describe('<GlyphDiamond />', () => {
  test('it should be defined', () => {
    expect(GlyphDiamond).toBeDefined();
  });

  test('it should be wrapped in a <Glyph />', () => {
    const wrapper = shallow(<GlyphDiamond />);
    expect(wrapper.dive().prop('className')).toBe('visx-glyph');
  });

  test('it should add className to <path />', () => {
    const wrapper = shallow(<GlyphDiamond className="test" />);
    expect(wrapper.find('.test')).toHaveLength(1);
  });

  test('it should take a children as function prop', () => {
    const fn = jest.fn();
    shallow(<GlyphDiamond>{fn}</GlyphDiamond>);
    expect(fn).toHaveBeenCalled();
  });

  test('it should call children function with { path }', () => {
    const fn = jest.fn();
    shallow(<GlyphDiamond>{fn}</GlyphDiamond>);
    const args = fn.mock.calls[0][0];
    const keys = Object.keys(args);
    expect(keys).toContain('path');
  });

  test('it should take a size prop as a number', () => {
    const fn = jest.fn();
    shallow(<GlyphDiamond size={42}>{fn}</GlyphDiamond>);
    const args = fn.mock.calls[0][0];
    expect(args.path.size()()).toBe(42);
  });

  test('it should take a size prop as a function', () => {
    const fn = jest.fn();
    const sizeFn = () => 42;
    shallow(<GlyphDiamond size={sizeFn}>{fn}</GlyphDiamond>);
    const args = fn.mock.calls[0][0];
    expect(args.path.size()()).toBe(42);
  });
});
