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
import { GlyphWye } from '../src';

describe('<GlyphWye />', () => {
  test('should be defined', () => {
    expect(GlyphWye).toBeDefined();
  });

  test('should render with base glyph class', () => {
    const { getByTestId } = render(
      <svg>
        <GlyphWye>
          {({ path }) => <path data-testid="test-path" className="visx-glyph" d={path.toString()} />}
        </GlyphWye>
      </svg>
    );
    
    const pathElement = getByTestId('test-path');
    expect(pathElement).toBeInTheDocument();
    expect(pathElement).toHaveClass('visx-glyph');
  });

  test('should render with custom class name', () => {
    const { getByTestId } = render(
      <svg>
        <GlyphWye>
          {({ path }) => (
            <path 
              data-testid="test-path" 
              className="test visx-glyph" 
              d={path.toString()} 
            />
          )}
        </GlyphWye>
      </svg>
    );
    
    const pathElement = getByTestId('test-path');
    expect(pathElement).toBeInTheDocument();
    expect(pathElement).toHaveClass('test');
    expect(pathElement).toHaveClass('visx-glyph');
  });

  test('should call children function prop', () => {
    const fn = jest.fn(() => null);
    render(
      <svg>
        <GlyphWye>{fn}</GlyphWye>
      </svg>
    );
    expect(fn).toHaveBeenCalledTimes(1);
  });

  test('should pass path object to children function', () => {
    const fn = jest.fn(() => null);
    render(
      <svg>
        <GlyphWye>{fn}</GlyphWye>
      </svg>
    );
    expect(fn).toHaveBeenCalledTimes(1);
    const args = fn.mock.calls[0][0];
    expect(args).toHaveProperty('path');
  });

  test('should handle numeric size prop', () => {
    const fn = jest.fn(() => null);
    render(
      <svg>
        <GlyphWye size={42}>{fn}</GlyphWye>
      </svg>
    );
    expect(fn).toHaveBeenCalledTimes(1);
    const args = fn.mock.calls[0][0];
    expect(args.path.size()()).toBe(42);
  });

  test('should handle function size prop', () => {
    const fn = jest.fn(() => null);
    const sizeFn = () => 42;
    render(
      <svg>
        <GlyphWye size={sizeFn}>{fn}</GlyphWye>
      </svg>
    );
    expect(fn).toHaveBeenCalledTimes(1);
    const args = fn.mock.calls[0][0];
    expect(args.path.size()()).toBe(42);
  });
});
// MIGRATION STATUS: {"eslint":"pending","jest":{"passed":7,"failed":0,"total":7,"skipped":0,"successRate":100},"tsc":"pending","enyzme":"converted"}
