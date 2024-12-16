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

import { Glyph } from '../src';

describe('<Glyph />', () => {
  const renderGlyph = (props = {}) => {
    return render(
      <svg>
        <Glyph {...props} />
      </svg>
    );
  };

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
// MIGRATION STATUS: {"eslint":"pending","jest":{"passed":4,"failed":0,"total":4,"skipped":0,"successRate":100},"tsc":"pending","enyzme":"converted"}
