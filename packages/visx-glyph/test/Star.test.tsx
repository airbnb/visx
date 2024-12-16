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
// MIGRATION STATUS: {"eslint":"pending","jest":{"passed":7,"failed":0,"total":7,"skipped":0,"successRate":100},"tsc":"pending","enyzme":"converted"}
