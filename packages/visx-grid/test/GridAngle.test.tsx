import { vi } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';

import { scaleLinear } from '@visx/scale';
import { GridAngle } from '../src';
import * as polarToCartesian from '../src/utils/polarToCartesian';

const gridProps = {
  innerRadius: 0,
  outerRadius: 10,
  scale: scaleLinear({
    range: [0, 2 * Math.PI],
    domain: [1, 10],
  }),
};

describe('<GridAngle />', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render with class .visx-grid-angle', () => {
    const { container } = render(
      <svg>
        <GridAngle {...gridProps} />
      </svg>,
    );
    const element = container.querySelector('g.visx-group');
    expect(element).toBeTruthy();
    expect(element?.classList.contains('visx-grid-angle')).toBe(true);
  });

  it('should set user-specified lineClassName', () => {
    const { container } = render(
      <svg>
        <GridAngle {...gridProps} lineClassName="test-class" />
      </svg>,
    );
    const lines = container.querySelectorAll('line.test-class');
    expect(lines.length).toBeGreaterThan(0);
  });

  it('should render `numTicks` grid lines', () => {
    const { container } = render(
      <svg>
        <GridAngle {...gridProps} numTicks={5} />
      </svg>,
    );
    const lines = container.querySelectorAll('line');
    expect(lines).toHaveLength(5);

    const { container: container2 } = render(
      <svg>
        <GridAngle {...gridProps} numTicks={10} />
      </svg>,
    );
    const lines2 = container2.querySelectorAll('line');
    expect(lines2).toHaveLength(10);
  });

  it('should render grid lines according to tickValues', () => {
    const { container } = render(
      <svg>
        <GridAngle {...gridProps} tickValues={[1, 2, 3]} />
      </svg>,
    );
    const lines = container.querySelectorAll('line');
    expect(lines).toHaveLength(3);
  });

  it('should compute radial lines using innerRadius and outerRadius', () => {
    const polarToCartesianSpy = vi.spyOn(polarToCartesian, 'default');
    const innerRadius = 4;
    const outerRadius = 7;

    render(
      <svg>
        <GridAngle {...gridProps} innerRadius={innerRadius} outerRadius={outerRadius} />
      </svg>,
    );

    expect(polarToCartesianSpy.mock.calls.length).toBeGreaterThanOrEqual(2);

    const fromPointCall = polarToCartesianSpy.mock.calls[0][0];
    const toPointCall = polarToCartesianSpy.mock.calls[1][0];

    expect(fromPointCall.radius).toBe(innerRadius);
    expect(toPointCall.radius).toBe(outerRadius);

    polarToCartesianSpy.mockRestore();
  });
});
