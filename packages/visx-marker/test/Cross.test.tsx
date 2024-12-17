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

import { MarkerCross } from '../src';

describe('<MarkerCross />', () => {
  test('it should be defined', () => {
    expect(MarkerCross).toBeDefined();
  });

  test('it should render a Marker containing a polyline', () => {
    const { container } = render(
      <svg>
        <MarkerCross id="marker-cross-test" />
      </svg>,
    );
    expect(container.querySelector('marker')).toBeTruthy();
    expect(container.querySelector('polyline')).toBeTruthy();
  });

  test('it should size correctly', () => {
    const size = 8;
    const strokeWidth = 1;
    const bounds = size + strokeWidth;
    const mid = size / 2;
    const points = `0 ${mid}, ${mid} ${mid}, ${mid} 0, ${mid} ${size}, ${mid} ${mid}, ${size} ${mid}`;

    const { container } = render(
      <svg>
        <MarkerCross id="marker-cross-test" size={size} strokeWidth={strokeWidth} />
      </svg>,
    );

    const marker = container.querySelector('marker');
    const polyline = container.querySelector('polyline');

    expect(marker).toBeTruthy();
    expect(marker?.getAttribute('markerWidth')).toBe(bounds.toString());
    expect(marker?.getAttribute('markerHeight')).toBe(bounds.toString());
    expect(marker?.getAttribute('refX')).toBe(mid.toString());
    expect(marker?.getAttribute('refY')).toBe(mid.toString());
    expect(polyline?.getAttribute('points')).toBe(points);
  });
});
// MIGRATION STATUS: {"eslint":"pass","jest":{"passed":3,"failed":0,"total":3,"skipped":0,"successRate":100},"tsc":"pending","enyzme":"converted"}
