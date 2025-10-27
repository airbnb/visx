import { vi } from 'vitest';
import React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { scaleLinear } from '@visx/scale';
import { AnimatedAxis } from '../src';
import { addMock, removeMock } from './svgMock';

describe('AnimatedAxis', () => {
  const defaultProps = {
    scale: scaleLinear({
      domain: [0, 10],
      range: [0, 100],
    }),
    orientation: 'bottom',
  } as const;

  beforeEach(() => {
    vi.clearAllMocks();
    addMock();
  });
  afterEach(removeMock);

  it('should be defined', () => {
    expect(AnimatedAxis).toBeDefined();
  });

  it('should render without errors', async () => {
    const { container } = render(
      <svg width={100} height={100}>
        <AnimatedAxis {...defaultProps} />
      </svg>,
    );

    await waitFor(() => {
      // Check for SVG container
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();

      // Check for axis line
      const axisLine = container.querySelector('.visx-axis-line');
      expect(axisLine).toBeInTheDocument();

      // Check for tick elements
      const ticks = container.querySelectorAll('.visx-axis-tick');
      expect(ticks.length).toBeGreaterThan(0);

      // Check for tick labels
      const tickLabels = container.querySelectorAll('text');
      expect(tickLabels.length).toBeGreaterThan(0);
    });
  });
});
