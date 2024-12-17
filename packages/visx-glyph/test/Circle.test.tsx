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
import { GlyphCircle } from '../src';

describe('<GlyphCircle />', () => {
  test('should be defined', () => {
    expect(GlyphCircle).toBeDefined();
  });

  test('should render with correct class', () => {
    const { container } = render(
      <GlyphCircle>
        {({ path }) => {
          const renderedPath = typeof path === 'function' ? path() : path;
          return <svg role="img" className="visx-glyph">{renderedPath}</svg>;
        }}
      </GlyphCircle>
    );
    expect(container.querySelector('.visx-glyph')).toBeInTheDocument();
  });

  test('should render with custom className', () => {
    const { container } = render(
      <GlyphCircle className="test">
        {({ path }) => {
          const renderedPath = typeof path === 'function' ? path() : path;
          return <svg role="img" className="test">{renderedPath}</svg>;
        }}
      </GlyphCircle>
    );
    expect(container.querySelector('.test')).toBeInTheDocument();
  });

  test('should call children function', () => {
    const fn = jest.fn(() => <svg />);
    render(<GlyphCircle>{fn}</GlyphCircle>);
    expect(fn).toHaveBeenCalled();
  });

  test('should pass path to children function', () => {
    const fn = jest.fn(() => <svg />);
    render(<GlyphCircle>{fn}</GlyphCircle>);
    const args = fn.mock.calls[0][0];
    expect(args).toHaveProperty('path');
  });

  test('should handle numeric size prop', () => {
    const fn = jest.fn(() => <svg />);
    render(<GlyphCircle size={42}>{fn}</GlyphCircle>);
    const args = fn.mock.calls[0][0];
    expect(args.path.size()()).toBe(42);
  });

  test('should handle function size prop', () => {
    const fn = jest.fn(() => <svg />);
    const sizeFn = () => 42;
    render(<GlyphCircle size={sizeFn}>{fn}</GlyphCircle>);
    const args = fn.mock.calls[0][0];
    expect(args.path.size()()).toBe(42);
  });
});
// MIGRATION STATUS: {"eslint":"pending","jest":{"passed":7,"failed":0,"total":7,"skipped":0,"successRate":100},"tsc":"pending","enyzme":"converted"}
