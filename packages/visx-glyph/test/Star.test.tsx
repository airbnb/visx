import React from 'react';
import { vi } from 'vitest';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { GlyphStar } from '../src';

describe('<GlyphStar />', () => {
  const renderGlyph = (props = {}) =>
    render(
      <svg>
        <GlyphStar {...props} />
      </svg>,
    );

  test('should be defined', () => {
    expect(GlyphStar).toBeDefined();
  });

  test('should render with correct class', () => {
    const { container } = renderGlyph();
    expect(container.querySelector('.visx-glyph')).toBeInTheDocument();
  });

  test('should render with custom className', () => {
    const { container } = renderGlyph({ className: 'test' });
    expect(container.querySelector('.test')).toBeInTheDocument();
  });

  test('should call children function', () => {
    const fn = vi.fn(() => <svg />);
    renderGlyph({ children: fn });
    expect(fn).toHaveBeenCalled();
  });

  test('should pass path to children function', () => {
    const fn = vi.fn(() => <svg />);
    renderGlyph({ children: fn });
    const args = fn.mock.calls[0][0];
    expect(args).toHaveProperty('path');
  });

  test('should handle numeric size prop', () => {
    const fn = vi.fn(() => <svg />);
    renderGlyph({ children: fn, size: 42 });
    const args = fn.mock.calls[0][0];
    expect(args.path.size()()).toBe(42);
  });

  test('should handle function size prop', () => {
    const fn = vi.fn(() => <svg />);
    renderGlyph({ children: fn, size: () => 42 });
    const args = fn.mock.calls[0][0];
    expect(args.path.size()()).toBe(42);
  });
});
