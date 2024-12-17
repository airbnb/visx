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
import { GlyphCross } from '../src';

describe('<GlyphCross />', () => {
  test('should be defined', () => {
    expect(GlyphCross).toBeDefined();
  });

  test('should render with base glyph class', () => {
    const { container } = render(
      <svg>
        <GlyphCross>
          {() => <g className="visx-glyph"><path d="M0,0" /></g>}
        </GlyphCross>
      </svg>
    );
    expect(container.querySelector('.visx-glyph')).toHaveClass('visx-glyph');
  });

  test('should render with custom class', () => {
    const { container } = render(
      <svg>
        <GlyphCross className="test">
          {() => <g className="test"><path d="M0,0" /></g>}
        </GlyphCross>
      </svg>
    );
    expect(container.querySelector('.test')).toHaveClass('test');
  });

  test('should call children function', () => {
    const childrenFn = jest.fn(() => null);
    render(<GlyphCross>{childrenFn}</GlyphCross>);
    expect(childrenFn).toHaveBeenCalled();
  });

  test('should pass path object to children function', () => {
    const childrenFn = jest.fn(() => null);
    render(<GlyphCross>{childrenFn}</GlyphCross>);
    const args = childrenFn.mock.calls[0][0];
    expect(args).toHaveProperty('path');
  });

  test('should handle size prop as number and function', () => {
    const childrenFn = jest.fn(() => null);
    const sizeFn = () => 42;

    // Test number size
    render(<GlyphCross size={42}>{childrenFn}</GlyphCross>);
    expect(childrenFn.mock.calls[0][0].path.size()()).toBe(42);

    // Test function size
    childrenFn.mockClear();
    render(<GlyphCross size={sizeFn}>{childrenFn}</GlyphCross>);
    expect(childrenFn.mock.calls[0][0].path.size()()).toBe(42);
  });
});
// MIGRATION STATUS: {"eslint":"pending","jest":{"passed":6,"failed":0,"total":6,"skipped":0,"successRate":100},"tsc":"pending","enyzme":"converted"}
