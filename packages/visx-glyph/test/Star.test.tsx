import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { GlyphStar } from '../src';

describe('<GlyphStar />', () => {
  test('should be defined', () => {
    expect(GlyphStar).toBeDefined();
  });

  test('should render with base glyph class', () => {
    const mockFn = jest.fn(({ path }) => (
      <svg>
        <path className="visx-glyph" d={path.toString()} />
      </svg>
    ));
    const { container } = render(<GlyphStar>{mockFn}</GlyphStar>);
    expect(container.querySelector('.visx-glyph')).toBeInTheDocument();
  });

  test('should render with custom class name', () => {
    const mockFn = jest.fn(({ path }) => (
      <svg>
        <path className="test" d={path.toString()} />
      </svg>
    ));
    const { container } = render(<GlyphStar className="test">{mockFn}</GlyphStar>);
    expect(container.querySelector('.test')).toBeInTheDocument();
  });

  test('should call children function prop', () => {
    const mockFn = jest.fn(() => null);
    render(<GlyphStar>{mockFn}</GlyphStar>);
    expect(mockFn).toHaveBeenCalled();
  });

  test('should pass path object to children function', () => {
    const mockFn = jest.fn(() => null);
    render(<GlyphStar>{mockFn}</GlyphStar>);
    const args = mockFn.mock.calls[0][0];
    expect(args).toHaveProperty('path');
  });

  test('should handle numeric size prop', () => {
    const mockFn = jest.fn(() => null);
    render(<GlyphStar size={42}>{mockFn}</GlyphStar>);
    const args = mockFn.mock.calls[0][0];
    expect(args.path.size()()).toBe(42);
  });

  test('should handle function size prop', () => {
    const mockFn = jest.fn(() => null);
    const sizeFn = () => 42;
    render(<GlyphStar size={sizeFn}>{mockFn}</GlyphStar>);
    const args = mockFn.mock.calls[0][0];
    expect(args.path.size()()).toBe(42);
  });
});
