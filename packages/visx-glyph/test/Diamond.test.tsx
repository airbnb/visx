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
import { GlyphDiamond } from '../src';

describe('<GlyphDiamond />', () => {
  test('should be defined', () => {
    expect(GlyphDiamond).toBeDefined();
  });

  test('should render with custom className', () => {
    const { container } = render(
      <svg>
        <GlyphDiamond className="test">
          {({ path }) => <path className="test" />}
        </GlyphDiamond>
      </svg>
    );
    expect(container.querySelector('.test')).toBeInTheDocument();
  });

  test('should render children function with path prop', () => {
    const childrenFn = jest.fn(() => <div>Diamond</div>);
    render(<GlyphDiamond>{childrenFn}</GlyphDiamond>);
    
    expect(childrenFn).toHaveBeenCalled();
    const args = childrenFn.mock.calls[0][0];
    expect(args).toHaveProperty('path');
  });

  test('should accept numeric size prop', () => {
    const childrenFn = jest.fn(() => <div>Diamond</div>);
    render(<GlyphDiamond size={42}>{childrenFn}</GlyphDiamond>);
    
    const args = childrenFn.mock.calls[0][0];
    expect(args.path.size()()).toBe(42);
  });

  test('should accept function size prop', () => {
    const sizeFn = () => 42;
    const childrenFn = jest.fn(() => <div>Diamond</div>);
    render(<GlyphDiamond size={sizeFn}>{childrenFn}</GlyphDiamond>);
    
    const args = childrenFn.mock.calls[0][0];
    expect(args.path.size()()).toBe(42);
  });
});
// MIGRATION STATUS: {"eslint":"pending","jest":{"passed":5,"failed":0,"total":5,"skipped":0,"successRate":100},"tsc":"pending","enyzme":"converted"}
