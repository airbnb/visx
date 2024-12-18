import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { scaleLinear } from '@visx/scale';
import { Grid } from '../src';

describe('<Grid />', () => {
  it('should be defined', () => {
    expect(Grid).toBeDefined();
  });

  it('should create grid lines', () => {
    const xScale = scaleLinear({
      domain: [0, 10],
      range: [0, 100],
    });

    const yScale = scaleLinear({
      domain: [0, 10],
      range: [0, 100],
    });

    const { container } = render(
      <svg>
        <Grid
          xScale={xScale}
          yScale={yScale}
          width={400}
          height={400}
          strokeDasharray="3,3"
          strokeOpacity={0.3}
          pointerEvents="none"
        />
      </svg>,
    );

    // Verify grid containers exist
    expect(container.querySelector('.visx-rows')).toBeInTheDocument();
    expect(container.querySelector('.visx-columns')).toBeInTheDocument();

    // Verify lines are rendered
    const lines = container.querySelectorAll('line');
    expect(lines.length).toBeGreaterThan(0);

    // Verify line attributes
    const firstLine = lines[0];
    expect(firstLine).toHaveAttribute('stroke-dasharray', '3,3');
    expect(firstLine).toHaveAttribute('stroke-opacity', '0.3');
    expect(firstLine).toHaveAttribute('pointer-events', 'none');
  });
});
