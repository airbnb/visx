import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { GlyphSquare } from '../src';

describe('<GlyphSquare />', () => {
  test('should be defined', () => {
    expect(GlyphSquare).toBeDefined();
  });

  test('should render with base glyph class', () => {
    const { container } = render(
      <svg>
        <GlyphSquare>
          {({ path }) => (
            <path
              className="visx-glyph"
              d={path.toString()}
            />
          )}
        </GlyphSquare>
      </svg>
    );
    expect(container.querySelector('.visx-glyph')).toBeInTheDocument();
  });

  test('should render with custom className', () => {
    const { container } = render(
      <svg>
        <GlyphSquare className="test">
          {({ path }) => (
            <path
              className="test"
              d={path.toString()}
            />
          )}
        </GlyphSquare>
      </svg>
    );
    expect(container.querySelector('.test')).toBeInTheDocument();
  });

  test('should call children function', () => {
    const children = jest.fn(() => null);
    render(<GlyphSquare>{children}</GlyphSquare>);
    expect(children).toHaveBeenCalled();
  });

  test('should pass path object to children function', () => {
    const children = jest.fn(() => null);
    render(<GlyphSquare>{children}</GlyphSquare>);
    const args = children.mock.calls[0][0];
    expect(args).toHaveProperty('path');
  });

  test('should handle numeric size prop', () => {
    const children = jest.fn(() => null);
    render(<GlyphSquare size={42}>{children}</GlyphSquare>);
    const args = children.mock.calls[0][0];
    expect(args.path.size()()).toBe(42);
  });

  test('should handle function size prop', () => {
    const children = jest.fn(() => null);
    const sizeFn = () => 42;
    render(<GlyphSquare size={sizeFn}>{children}</GlyphSquare>);
    const args = children.mock.calls[0][0];
    expect(args.path.size()()).toBe(42);
  });
});
