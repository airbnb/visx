import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { MarkerLine } from '../src';

describe('<MarkerLine />', () => {
  test('it should be defined', () => {
    expect(MarkerLine).toBeDefined();
  });

  test('it should render a marker and rect', () => {
    const { container } = render(
      <svg>
        <MarkerLine id="marker-line-test" />
      </svg>,
    );

    const marker = container.querySelector('marker');
    const rect = container.querySelector('rect');
    expect(marker).toBeInTheDocument();
    expect(rect).toBeInTheDocument();
  });

  test('it should render with correct attributes', () => {
    const size = 8;
    const strokeWidth = 1;
    const stroke = 'blue';

    const { container } = render(
      <svg>
        <MarkerLine id="marker-line-test" size={size} stroke={stroke} strokeWidth={strokeWidth} />
      </svg>,
    );

    const marker = container.querySelector('marker');
    const rect = container.querySelector('rect');

    // Calculate expected values
    const max = Math.max(size, strokeWidth * 2);
    const midX = max / 2;
    const midY = size / 2;

    // Check marker attributes
    expect(marker).toHaveAttribute('markerWidth', max.toString());
    expect(marker).toHaveAttribute('markerHeight', size.toString());
    expect(marker).toHaveAttribute('refX', midX.toString());
    expect(marker).toHaveAttribute('refY', midY.toString());
    expect(marker).toHaveAttribute('fill', stroke);

    // Check rect element attributes
    expect(rect).toHaveAttribute('width', strokeWidth.toString());
    expect(rect).toHaveAttribute('height', size.toString());
    expect(rect).toHaveAttribute('x', midX.toString());
  });
});
