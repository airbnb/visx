import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Glyph } from '../src';

describe('<Glyph />', () => {
  const renderGlyph = (props = {}) =>
    render(
      <svg>
        <Glyph {...props} />
      </svg>,
    );

  test('it should be defined', () => {
    expect(Glyph).toBeDefined();
  });

  test('it should render with default className', () => {
    const { container } = renderGlyph();
    const glyph = container.querySelector('.visx-glyph');
    expect(glyph).toBeInTheDocument();
    expect(glyph).toHaveClass('visx-glyph');
  });

  test('it should render with custom className', () => {
    const { container } = renderGlyph({ className: 'test' });
    const glyph = container.querySelector('.test');
    expect(glyph).toBeInTheDocument();
    expect(glyph).toHaveClass('test');
  });

  test('it should apply transform with top/left props', () => {
    const { container } = renderGlyph({ top: 2, left: 2 });
    const glyph = container.querySelector('.visx-glyph');
    expect(glyph).toHaveAttribute('transform', 'translate(2, 2)');
  });
});
