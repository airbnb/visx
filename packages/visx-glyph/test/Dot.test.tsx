import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { GlyphDot } from '../src';

describe('<GlyphDot />', () => {
  const renderGlyph = (props = {}) =>
    render(
      <svg>
        <GlyphDot {...props} />
      </svg>,
    );

  test('should be defined', () => {
    expect(GlyphDot).toBeDefined();
  });

  test('should render with correct class', () => {
    const { container } = renderGlyph();
    expect(container.querySelector('.visx-glyph')).toBeInTheDocument();
  });

  test('should render with custom className', () => {
    const { container } = renderGlyph({ className: 'test' });
    expect(container.querySelector('.test')).toBeInTheDocument();
  });
});
