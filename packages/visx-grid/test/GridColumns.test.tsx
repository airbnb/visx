import React from 'react';
import { render } from '@testing-library/react';
import { scaleLinear } from '@visx/scale';
import { GridColumns } from '../src';

describe('<GridColumns />', () => {
  it('should be defined', () => {
    expect(GridColumns).toBeDefined();
  });

  it('should create grid lines', () => {
    const { container } = render(
      <svg>
        <GridColumns
          scale={scaleLinear({ range: [0, 100] })}
          height={400}
          strokeDasharray="3,3"
          strokeOpacity={0.3}
          pointerEvents="none"
        />
      </svg>,
    );

    const lines = container.querySelectorAll('.visx-line');
    expect(lines).toHaveLength(11);
  });
});
