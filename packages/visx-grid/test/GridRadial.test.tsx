import { vi } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { scaleLinear } from '@visx/scale';
import { GridRadial } from '../src';

const gridProps = {
  innerRadius: 0,
  outerRadius: 10,
  scale: scaleLinear({
    range: [1, 100],
    domain: [1, 10],
  }),
  startAngle: 0,
  endAngle: Math.PI * 2,
};

describe('<GridRadial />', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should be defined', () => {
    expect(GridRadial).toBeDefined();
  });

  it('should render with class .visx-grid-radial', () => {
    const { container } = render(
      <svg>
        <GridRadial {...gridProps} />
      </svg>,
    );
    const group = container.querySelector('.visx-grid-radial');
    expect(group).toBeInTheDocument();
  });

  it('should set user-specified lineClassName', () => {
    const { container } = render(
      <svg>
        <GridRadial {...gridProps} lineClassName="test-class" />
      </svg>,
    );
    const paths = container.querySelectorAll('path');
    expect(paths.length).toBeGreaterThan(0);
    paths.forEach((path) => {
      expect(path).toHaveClass('test-class');
    });
  });

  it('should render `numTicks` grid line arcs', () => {
    const { container } = render(
      <svg>
        <GridRadial {...gridProps} numTicks={5} />
      </svg>,
    );
    const paths = container.querySelectorAll('path.visx-arc');
    expect(paths).toHaveLength(5);

    const { container: container2 } = render(
      <svg>
        <GridRadial {...gridProps} numTicks={10} />
      </svg>,
    );
    const paths2 = container2.querySelectorAll('path.visx-arc');
    expect(paths2).toHaveLength(10);
  });

  it('should render grid line arcs according to tickValues', () => {
    const { container } = render(
      <svg>
        <GridRadial {...gridProps} tickValues={[1, 2, 3]} />
      </svg>,
    );
    const paths = container.querySelectorAll('path.visx-arc');
    expect(paths).toHaveLength(3);
  });
});
