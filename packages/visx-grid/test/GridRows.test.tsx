import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom'; // Added for toHaveAttribute matcher
import { scaleLinear } from '@visx/scale';
import { GridRows } from '../src';

describe('<GridRows />', () => {
  it('should be defined', () => {
    expect(GridRows).toBeDefined();
  });

  it('should create grid lines with correct attributes', () => {
    const { container } = render(
      <svg width={400} height={400}>
        <GridRows
          scale={scaleLinear({ range: [0, 100] })}
          width={400}
          strokeDasharray="3,3"
          strokeOpacity={0.3}
          pointerEvents="none"
        />
      </svg>,
    );

    const lines = container.querySelectorAll('.visx-line');
    expect(lines).toHaveLength(11);

    // Verify line attributes were passed through
    lines.forEach((line) => {
      expect(line).toHaveAttribute('stroke-dasharray', '3,3');
      expect(line).toHaveAttribute('stroke-opacity', '0.3');
      expect(line).toHaveAttribute('pointer-events', 'none');
    });
  });
});
