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
import { Line } from '@visx/shape';
import { Text } from '@visx/text';
import { scaleBand, scaleLinear } from '@visx/scale';
import { Axis } from '../src';

jest.mock('@visx/shape', () => ({
  Line: jest.fn((props) => {
    const { className = '', from, to, strokeWidth, strokeLinecap, stroke, ...rest } = props;
    return (
      <line 
        className={className}
        data-testid={className.includes('visx-axis-tick') ? 'axis-tick-line' : 'axis-line'}
        data-from={JSON.stringify(from)}
        data-to={JSON.stringify(to)}
        strokeWidth={strokeWidth}
        strokeLinecap={strokeLinecap}
        stroke={stroke}
        {...rest}
      />
    );
  })
}));

jest.mock('@visx/text', () => ({
  Text: jest.fn((props) => {
    const { className = '', children, fontSize, fill, ...rest } = props;
    return (
      <text 
        data-testid={className.includes('visx-axis-label') ? 'axis-label' : 'axis-tick-label'}
        className={className}
        fontSize={fontSize} 
        fill={fill} 
        {...rest}
      >
        {children}
      </text>
    );
  })
}));

const axisProps = {
  orientation: 'left' as const,
  scale: scaleLinear({
    range: [10, 0],
    round: true,
    domain: [0, 10],
  }),
  label: 'test axis',
};

describe('<Axis />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(Axis).toBeDefined();
  });

  it('should render with class .visx-axis', () => {
    const { container } = render(<svg><Axis {...axisProps} /></svg>);
    expect(container.querySelector('.visx-axis')).toBeInTheDocument();
  });

  it('should call children function with required args', () => {
    const mockFn = jest.fn(() => null);
    render(<svg><Axis {...axisProps}>{mockFn}</Axis></svg>);
    
    const args = mockFn.mock.calls[0][0];
    expect(args.axisFromPoint).toBeDefined();
    expect(args.axisToPoint).toBeDefined();
    expect(args.horizontal).toBeDefined();
    expect(args.tickSign).toBeDefined();
    expect(args.numTicks).toBeDefined();
    expect(args.label).toBeDefined();
    expect(args.rangePadding).toBeDefined();
    expect(args.tickLength).toBeDefined();
    expect(args.tickFormat).toBeDefined();
    expect(args.tickPosition).toBeDefined();
    expect(args.ticks).toBeDefined();
    expect(Object.keys(args.ticks[0])).toEqual(['value', 'index', 'from', 'to', 'formattedValue']);
  });

  it('should set user-specified class names', async () => {
    const { container } = render(
      <svg>
        <Axis
          {...axisProps}
          axisClassName="axis-test-class"
          axisLineClassName="axisline-test-class"
          labelClassName="label-test-class"
          tickClassName="tick-test-class"
        />
      </svg>
    );

    await waitFor(() => {
      expect(container.querySelector('.visx-axis.axis-test-class')).toBeInTheDocument();
      expect(container.querySelector('.visx-axis-line.axisline-test-class')).toBeInTheDocument();
      expect(container.querySelector('.visx-axis-label.label-test-class')).toBeInTheDocument();
      expect(container.querySelector('.visx-axis-tick.tick-test-class')).toBeInTheDocument();
    });
  });

  it('should pass the output of tickLabelProps to tick labels', async () => {
    const tickProps = { fontSize: 50, fill: 'magenta' };
    const { getAllByTestId } = render(
      <svg><Axis {...axisProps} tickLabelProps={() => tickProps} /></svg>
    );
    
    await waitFor(() => {
      const tickLabels = getAllByTestId('axis-tick-label');
      expect(tickLabels.length).toBeGreaterThan(0);
      expect(tickLabels[0]).toHaveAttribute('font-size', '50');
      expect(tickLabels[0]).toHaveAttribute('fill', 'magenta');
    });
  });

  it('should call the tickLabelProps func with correct signature', () => {
    const tickLabelPropsSpy = jest.fn(() => ({}));
    render(
      <svg>
        <Axis {...axisProps} tickLabelProps={tickLabelPropsSpy} />
      </svg>
    );

    const firstCall = tickLabelPropsSpy.mock.calls[0];
    expect(typeof firstCall[0]).toBe('number');
    expect(typeof firstCall[1]).toBe('number');
    expect(Array.isArray(firstCall[2])).toBe(true);
  });

  it('should pass labelProps to the axis label', async () => {
    const labelProps = { fontSize: 50, fill: 'magenta' };
    const { getByTestId } = render(<svg><Axis {...axisProps} labelProps={labelProps} /></svg>);

    await waitFor(() => {
      const label = getByTestId('axis-label');
      expect(label).toHaveAttribute('font-size', '50');
      expect(label).toHaveAttribute('fill', 'magenta');
    });
  });

  it('should handle hideZero prop correctly', () => {
    const { container } = render(
      <svg><Axis {...axisProps} hideZero={false} /></svg>
    );
    expect(container.querySelector('.visx-axis-tick')).toBeInTheDocument();

    const { container: hiddenContainer } = render(
      <svg><Axis {...axisProps} hideZero /></svg>
    );
    expect(hiddenContainer.querySelector('.visx-axis-tick-0')).not.toBeInTheDocument();
  });

  it('should handle axis line visibility', async () => {
    const { container } = render(
      <svg><Axis {...axisProps} hideAxisLine={false} /></svg>
    );
    await waitFor(() => {
      expect(container.querySelector('.visx-axis-line')).toBeInTheDocument();
    });

    const { container: hiddenContainer } = render(
      <svg><Axis {...axisProps} hideAxisLine /></svg>
    );
    expect(hiddenContainer.querySelector('.visx-axis-line')).not.toBeInTheDocument();
  });

  it('should handle ticks visibility', async () => {
    const { container: visible } = render(
      <svg><Axis {...axisProps} hideTicks={false} /></svg>
    );
    await waitFor(() => {
      expect(visible.querySelectorAll('.visx-axis-tick').length).toBeGreaterThan(0);
    });

    const { container: hidden } = render(
      <svg><Axis {...axisProps} hideTicks /></svg>
    );
    await waitFor(() => {
      const ticks = hidden.querySelectorAll('line.visx-axis-tick');
      expect(ticks.length).toBe(0);
    });
  });

  it('should render specified tick values', () => {
    const { container: empty } = render(
      <svg><Axis {...axisProps} tickValues={[]} /></svg>
    );
    expect(empty.querySelectorAll('.visx-axis-tick').length).toBe(0);

    const { container: single } = render(
      <svg><Axis {...axisProps} tickValues={[2]} /></svg>
    );
    expect(single.querySelectorAll('.visx-axis-tick').length).toBe(1);

    const { container: multiple } = render(
      <svg><Axis {...axisProps} tickValues={[0, 1, 2, 3, 4, 5, 6]} /></svg>
    );
    expect(multiple.querySelectorAll('.visx-axis-tick').length).toBe(7);
  });

  it('should format ticks correctly', async () => {
    const { getAllByTestId } = render(
      <svg>
        <Axis {...axisProps} tickValues={[0]} tickFormat={() => 'test!!!'} />
      </svg>
    );
    
    await waitFor(() => {
      const tickLabels = getAllByTestId('axis-tick-label');
      expect(tickLabels.length).toBeGreaterThan(0);
      expect(tickLabels[0]).toHaveTextContent('test!!!');
    });
  });

  it('should handle tick styling', async () => {
    const { container } = render(<svg><Axis {...axisProps} strokeWidth={2} /></svg>);
    
    await waitFor(() => {
      const tickLines = container.querySelectorAll('line');
      expect(tickLines.length).toBeGreaterThan(0);
      expect(tickLines[0]).toHaveAttribute('stroke-width', '2');
      expect(tickLines[0]).toHaveAttribute('stroke-linecap', 'square');
    });
  });

  it('should handle band scales', async () => {
    render(
      <svg>
        <Axis
          orientation="bottom"
          scale={scaleBand({
            range: [10, 0],
            round: true,
            domain: ['a', 'b'],
          })}
          tickStroke="blue"
        />
      </svg>
    );

    await waitFor(() => {
      const MockLine = Line as jest.Mock;
      const calls = MockLine.mock.calls;
      expect(calls.length).toBeGreaterThan(0);
      const firstCall = calls[0][0];
      const secondCall = calls[1][0];
      
      expect(firstCall.from).toEqual({ x: 8, y: 0 });
      expect(firstCall.to).toEqual({ x: 8, y: 8 });
      expect(secondCall.from).toEqual({ x: 3, y: 0 });
      expect(secondCall.to).toEqual({ x: 3, y: 8 });
    });
  });

  it('should expose its ref via an innerRef prop', () => {
    const fakeRef = React.createRef<SVGGElement>();
    const { container } = render(
      <svg>
        <Axis {...axisProps} innerRef={fakeRef} />
      </svg>
    );
    
    const axisElement = container.querySelector('g.visx-axis');
    expect(fakeRef.current).toBe(axisElement);
  });
});
// MIGRATION STATUS: {"eslint":"pending","jest":{"passed":15,"failed":0,"total":15,"skipped":0,"successRate":100},"tsc":"pending","enyzme":"converted"}
