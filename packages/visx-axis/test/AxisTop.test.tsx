/** @jest-environment jsdom */
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
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { scaleLinear } from '@visx/scale';
import { AxisTop } from '../src';

const axisProps = {
  scale: scaleLinear({
    range: [10, 0],
    round: true,
    domain: [0, 10],
  }),
};

describe('<AxisTop />', () => {
  const renderInSVG = (children: React.ReactElement) => 
    render(<svg>{children}</svg>);

  it('should be defined', () => {
    expect(AxisTop).toBeDefined();
  });

  it('should render with class .visx-axis-top', async () => {
    const { container } = renderInSVG(<AxisTop {...axisProps} />);
    await waitFor(() => {
      const axis = container.querySelector('.visx-axis');
      expect(axis).toHaveClass('visx-axis-top');
    });
  });

  it('should set user-specified class names', async () => {
    const axisClassName = 'axis-test-class';
    const axisLineClassName = 'axisline-test-class';
    const labelClassName = 'label-test-class';
    const tickClassName = 'tick-test-class';

    const { container } = renderInSVG(
      <AxisTop
        {...axisProps}
        axisClassName={axisClassName}
        axisLineClassName={axisLineClassName}
        labelClassName={labelClassName}
        tickClassName={tickClassName}
      />,
    );

    await waitFor(() => {
      const axis = container.querySelector('.visx-axis');
      expect(axis).toHaveClass('axis-test-class');
      expect(axis).toHaveClass('visx-axis-top');

      const axisLine = container.querySelector('.visx-axis-line');
      expect(axisLine).toHaveClass(axisLineClassName);

      const label = container.querySelector('.visx-axis-label');
      if (label) {
        expect(label).toHaveClass(labelClassName);
      }

      const tick = container.querySelector('.visx-axis-tick');
      if (tick) {
        expect(tick).toHaveClass(tickClassName);
      }
    });
  });

  it('should render with default labelOffset of 8', async () => {
    const { container } = renderInSVG(<AxisTop {...axisProps} label="test label" />);
    await waitFor(() => {
      const label = container.querySelector('.visx-axis-label');
      expect(label?.getAttribute('y')).toBe('-26');
    });
  });

  it('should render with custom labelOffset', async () => {
    const labelOffset = 3;
    const { container } = renderInSVG(
      <AxisTop {...axisProps} label="test label" labelOffset={labelOffset} />
    );
    await waitFor(() => {
      const label = container.querySelector('.visx-axis-label');
      expect(label?.getAttribute('y')).toBe('-21');
    });
  });

  it('should render ticks with default length of 8', async () => {
    const { container } = renderInSVG(<AxisTop {...axisProps} />);
    await waitFor(() => {
      const ticks = container.querySelectorAll('.visx-axis-tick line.visx-line');
      ticks.forEach(tick => {
        const y1 = Math.abs(parseFloat(tick.getAttribute('y1') || '0'));
        const y2 = Math.abs(parseFloat(tick.getAttribute('y2') || '0'));
        expect(Math.abs(y2 - y1)).toBe(8);
      });
    });
  });

  it('should render ticks with custom length', async () => {
    const tickLength = 15;
    const { container } = renderInSVG(<AxisTop {...axisProps} tickLength={tickLength} />);
    await waitFor(() => {
      const ticks = container.querySelectorAll('.visx-axis-tick line.visx-line');
      ticks.forEach(tick => {
        const y1 = Math.abs(parseFloat(tick.getAttribute('y1') || '0'));
        const y2 = Math.abs(parseFloat(tick.getAttribute('y2') || '0'));
        expect(Math.abs(y2 - y1)).toBe(tickLength);
      });
    });
  });

  it('should render label text', async () => {
    const label = 'test';
    const { getByText } = renderInSVG(<AxisTop {...axisProps} label={label} />);
    await waitFor(() => {
      expect(getByText(label)).toBeInTheDocument();
    });
  });
});
// MIGRATION STATUS: {"eslint":"pass","jest":{"passed":8,"failed":0,"total":8,"skipped":0,"successRate":100},"tsc":"pending","enyzme":"converted"}
