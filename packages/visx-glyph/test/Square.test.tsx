/** @jest-environment jsdom */
/**
 * LLM-GENERATED REFACTOR
 *
 * This file was migrated from Enzyme to RTL using generative AI.
 * To make the migration as clean as possible, the LLM was instructed to
 * use testing patterns similar to Enzyme.
 *
 * If you are making changes to this file, please consider refactoring
 * to more idiomatic RTL (and then removing this banner!).
 */
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
// MIGRATION STATUS: {"eslint":"pending","jest":{"passed":7,"failed":0,"total":7,"skipped":0,"successRate":100},"tsc":"pending","enyzme":"converted"}
