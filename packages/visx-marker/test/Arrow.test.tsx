import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { MarkerArrow } from '../src';

describe('<MarkerArrow />', () => {
  test('it should be defined', () => {
    expect(MarkerArrow).toBeDefined();
  });

  test('it should render marker with polyline', () => {
    const { container } = render(
      <svg>
        <defs>
          <MarkerArrow id="marker-arrow-test" />
        </defs>
      </svg>,
    );

    const marker = container.querySelector('marker');
    const polyline = container.querySelector('polyline');

    expect(marker).toBeInTheDocument();
    expect(marker).toHaveAttribute('id', 'marker-arrow-test');
    expect(polyline).toBeInTheDocument();
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
      </svg>,
    );

    const marker = container.querySelector('marker');
    expect(marker).toBeInTheDocument();
    expect(marker).toHaveAttribute('markerWidth', max.toString());
    expect(marker).toHaveAttribute('markerHeight', max.toString());
    expect(marker).toHaveAttribute('refX', midX.toString());
    expect(marker).toHaveAttribute('refY', midY.toString());

    const g = container.querySelector('g');
    expect(g).toBeInTheDocument();
    expect(g).toHaveAttribute('transform', `translate(${strokeWidth}, ${strokeWidth})`);

    const polyline = container.querySelector('polyline');
    expect(polyline).toBeInTheDocument();
    expect(polyline).toHaveAttribute('points', '0 0, 8 4, 0 8');
  });
});
