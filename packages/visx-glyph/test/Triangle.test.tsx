import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { GlyphTriangle } from '../src';

describe('<GlyphTriangle />', () => {
  test('should be defined', () => {
    expect(GlyphTriangle).toBeDefined();
  });

  test('should render with glyph class', () => {
    const { container } = render(
      <svg>
        <GlyphTriangle>
          {({ path }) => <path className="visx-glyph" d={path.toString()} />}
        </GlyphTriangle>
      </svg>,
    );
    const element = container.querySelector('.visx-glyph');
    expect(element).toBeInTheDocument();
  });

  test('should render with custom class', () => {
    const { container } = render(
      <svg>
        <GlyphTriangle className="test">
          {({ path }) => <path className="test" d={path.toString()} />}
        </GlyphTriangle>
      </svg>,
    );
    const element = container.querySelector('.test');
    expect(element).toBeInTheDocument();
  });

  test('should call children function', () => {
    const fn = jest.fn();
    render(
      <svg>
        <GlyphTriangle>{fn}</GlyphTriangle>
      </svg>,
    );
    expect(fn).toHaveBeenCalled();
  });

  test('should pass path to children function', () => {
    const fn = jest.fn();
    render(
      <svg>
        <GlyphTriangle>{fn}</GlyphTriangle>
      </svg>,
    );
    const args = fn.mock.calls[0][0];
    expect(args).toHaveProperty('path');
  });

  test('should handle size prop correctly', () => {
    const fn = jest.fn();

    // Test number size
    render(
      <svg>
        <GlyphTriangle size={42}>{fn}</GlyphTriangle>
      </svg>,
    );
    expect(fn.mock.calls[0][0].path.size()()).toBe(42);

    // Test function size
    fn.mockClear();
    const sizeFn = () => 42;
    render(
      <svg>
        <GlyphTriangle size={sizeFn}>{fn}</GlyphTriangle>
      </svg>,
    );
    expect(fn.mock.calls[0][0].path.size()()).toBe(42);
  });
});
