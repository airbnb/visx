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

import { MarkerArrow } from '../src';

describe('<MarkerArrow />', () => {
  test('it should be defined', () => {
    expect(MarkerArrow).toBeDefined();
  });

  test('it should render marker with correct structure', () => {
    const { container } = render(
      <svg>
        <defs>
          <MarkerArrow id="marker-circle-test" />
        </defs>
      </svg>
    );
    
    const marker = container.querySelector('marker');
    expect(marker).toBeInTheDocument();
    expect(marker).toHaveAttribute('id', 'marker-circle-test');
  });

  test('it should size correctly', () => {
    const size = 8;
    const strokeWidth = 1;
    const max = size + strokeWidth * 2;
    const midX = size;
    const midY = max / 2;

    const { container } = render(
      <svg>
        <defs>
          <MarkerArrow id="marker-circle-test" size={size} strokeWidth={strokeWidth} />
        </defs>
      </svg>
    );

    const marker = container.querySelector('marker');
    expect(marker).toBeInTheDocument();
    expect(marker).toHaveAttribute('markerWidth', max.toString());
    expect(marker).toHaveAttribute('markerHeight', max.toString());
    expect(marker).toHaveAttribute('refX', midX.toString());
    expect(marker).toHaveAttribute('refY', midY.toString());

    const polyline = container.querySelector('polyline');
    expect(polyline).toBeInTheDocument();
    expect(polyline).toHaveAttribute('points', '0 0, 8 4, 0 8');
  });
});
// MIGRATION STATUS: {"eslint":"pass","jest":{"passed":3,"failed":0,"total":3,"skipped":0,"successRate":100},"tsc":"pending","enyzme":"converted"}
