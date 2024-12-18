import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { MarkerCircle } from '../src';

describe('<MarkerCircle />', () => {
  test('it should be defined', () => {
    expect(MarkerCircle).toBeDefined();
  });

  test('it should render a marker containing a circle', () => {
    const { container } = render(
      <svg>
        <MarkerCircle id="marker-circle-test" />
      </svg>,
    );

    const marker = container.querySelector('marker');
    const circle = container.querySelector('circle');

    expect(marker).toBeInTheDocument();
    expect(circle).toBeInTheDocument();
  });

  test('it should size correctly', () => {
    const size = 8;
    const strokeWidth = 1;
    const diameter = size * 2;
    const bounds = diameter + strokeWidth;
    const mid = bounds / 2;

    const { container } = render(
      <svg>
        <MarkerCircle id="marker-circle-test" size={size} strokeWidth={strokeWidth} />
      </svg>,
    );

    // Check marker attributes
    const marker = container.querySelector('marker');
    expect(marker).toHaveAttribute('markerWidth', bounds.toString());
    expect(marker).toHaveAttribute('markerHeight', bounds.toString());
    expect(marker).toHaveAttribute('refX', '0');
    expect(marker).toHaveAttribute('refY', mid.toString());

    // Check circle attributes
    const circle = container.querySelector('circle');
    expect(circle).toHaveAttribute('r', size.toString());
    expect(circle).toHaveAttribute('cx', mid.toString());
    expect(circle).toHaveAttribute('cy', mid.toString());
  });
});
