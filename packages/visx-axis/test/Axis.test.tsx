import { vi } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { scaleBand, scaleLinear } from '@visx/scale';
import { Axis } from '../src';
import type { AxisRendererProps } from '../src';
import { addMock, removeMock } from './svgMock';

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
    vi.clearAllMocks();
    addMock();
  });
  afterEach(removeMock);

  it('should be defined', () => {
    expect(Axis).toBeDefined();
  });

  it('should render with class .visx-axis', () => {
    const { container } = render(
      <svg>
        <Axis {...axisProps} />
      </svg>,
    );
    const axis = container.querySelector('.visx-axis');
    expect(axis).toBeInTheDocument();
  });

  it('should call children function with required args', () => {
    // eslint-disable-next-line
    const mockFn = vi.fn(({ }) => null);
    render(
      <svg>
        <Axis {...axisProps}>{mockFn}</Axis>
      </svg>,
    );

    const args = mockFn.mock.calls[0][0] as AxisRendererProps<typeof axisProps.scale>;
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

  it('should set user-specified class names', () => {
    const { container } = render(
      <svg>
        <Axis
          {...axisProps}
          axisClassName="axis-test-class"
          axisLineClassName="axisline-test-class"
          labelClassName="label-test-class"
          tickClassName="tick-test-class"
        />
      </svg>,
    );

    expect(container.querySelector('.visx-axis.axis-test-class')).toBeInTheDocument();
    expect(container.querySelector('.visx-axis-line.axisline-test-class')).toBeInTheDocument();
    expect(container.querySelector('.visx-axis-label.label-test-class')).toBeInTheDocument();
    expect(container.querySelector('.visx-axis-tick.tick-test-class')).toBeInTheDocument();
  });

  it('should pass the output of tickLabelProps to tick labels', () => {
    const tickProps = { fontSize: 50, fill: 'magenta' };
    const { container } = render(
      <svg>
        <Axis {...axisProps} tickLabelProps={() => tickProps} />
      </svg>,
    );

    const tickLabels = container.querySelectorAll('text');
    expect(tickLabels.length).toBeGreaterThan(0);
    expect(tickLabels[0]).toHaveAttribute('font-size', '50');
    expect(tickLabels[0]).toHaveAttribute('fill', 'magenta');
  });

  it('should call the tickLabelProps func with correct signature', () => {
    // eslint-disable-next-line
    const tickLabelPropsSpy = vi.fn(({ }, { }, { }) => ({}));
    render(
      <svg>
        <Axis {...axisProps} tickLabelProps={tickLabelPropsSpy} />
      </svg>,
    );

    const firstCall = tickLabelPropsSpy.mock.calls[0];
    expect(typeof firstCall[0]).toBe('number');
    expect(typeof firstCall[1]).toBe('number');
    expect(Array.isArray(firstCall[2])).toBe(true);
  });

  it('should pass labelProps to the axis label', () => {
    const labelProps = { fontSize: 50, fill: 'magenta' };
    const { container } = render(
      <svg>
        <Axis {...axisProps} labelProps={labelProps} />
      </svg>,
    );

    const label = container.querySelector('.visx-axis-label');
    expect(label).toHaveAttribute('font-size', '50');
    expect(label).toHaveAttribute('fill', 'magenta');
  });

  it('should handle hideZero prop correctly', () => {
    const { container } = render(
      <svg>
        <Axis {...axisProps} hideZero={false} />
      </svg>,
    );

    const { container: hiddenContainer } = render(
      <svg>
        <Axis {...axisProps} hideZero />
      </svg>,
    );

    const allLines = container.querySelectorAll('.visx-axis-tick line');
    const hiddenZero = hiddenContainer.querySelectorAll('.visx-axis-tick line');

    expect(hiddenZero.length).toBeGreaterThan(0);
    expect(allLines).toHaveLength(hiddenZero.length + 1);
  });

  it('should handle axis line visibility', () => {
    const { container } = render(
      <svg>
        <Axis {...axisProps} hideAxisLine={false} />
      </svg>,
    );
    expect(container.querySelector('.visx-axis-line')).toBeInTheDocument();

    const { container: hiddenContainer } = render(
      <svg>
        <Axis {...axisProps} hideAxisLine />
      </svg>,
    );
    expect(hiddenContainer.querySelector('.visx-axis-line')).not.toBeInTheDocument();
  });

  it('should handle ticks visibility', () => {
    const { container: visible } = render(
      <svg>
        <Axis {...axisProps} hideTicks={false} />
      </svg>,
    );
    expect(visible.querySelectorAll('.visx-axis-tick line').length).toBeGreaterThan(0);

    const { container: hidden } = render(
      <svg>
        <Axis {...axisProps} hideTicks />
      </svg>,
    );
    const ticks = hidden.querySelectorAll('.visx-axis-tick line');
    expect(ticks).toHaveLength(0);
  });

  it('should render specified tick values', () => {
    const { container: empty } = render(
      <svg>
        <Axis {...axisProps} tickValues={[]} />
      </svg>,
    );
    expect(empty.querySelectorAll('.visx-axis-tick')).toHaveLength(0);

    const { container: single } = render(
      <svg>
        <Axis {...axisProps} tickValues={[2]} />
      </svg>,
    );
    expect(single.querySelectorAll('.visx-axis-tick')).toHaveLength(1);

    const { container: multiple } = render(
      <svg>
        <Axis {...axisProps} tickValues={[0, 1, 2, 3, 4, 5, 6]} />
      </svg>,
    );
    expect(multiple.querySelectorAll('.visx-axis-tick')).toHaveLength(7);
  });

  it('should format ticks correctly', () => {
    const { container } = render(
      <svg>
        <Axis {...axisProps} tickValues={[0]} tickFormat={() => 'test!!!'} />
      </svg>,
    );

    const tickText = container.querySelector('.visx-axis-tick text');
    expect(tickText).toHaveTextContent('test!!!');
  });

  it('should provide tick index to tickFormat function', () => {
    const { container } = render(
      <svg>
        <Axis {...axisProps} tickValues={[9]} tickFormat={(val, i) => `index-${i}`} />
      </svg>,
    );

    const tickText = container.querySelector('.visx-axis-tick text');
    expect(tickText).toHaveTextContent('index-0');
  });

  it('should handle tick styling', () => {
    const { container } = render(
      <svg>
        <Axis {...axisProps} tickValues={[0]} strokeWidth={2} />
      </svg>,
    );

    const tickLines = container.querySelectorAll('line');
    expect(tickLines.length).toBeGreaterThan(0);
    expect(tickLines[0]).toHaveAttribute('stroke-width', '2');
    expect(tickLines[0]).toHaveAttribute('stroke-linecap', 'square');
  });

  it('should handle band scales', () => {
    const { container } = render(
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
      </svg>,
    );

    const lines = container.querySelectorAll('line');
    expect(lines.length).toBeGreaterThan(0);

    const firstLine = lines[0];
    const secondLine = lines[1];

    expect(firstLine).toHaveAttribute('x1', '8');
    expect(firstLine).toHaveAttribute('y1', '0');
    expect(firstLine).toHaveAttribute('x2', '8');
    expect(firstLine).toHaveAttribute('y2', '8');

    expect(secondLine).toHaveAttribute('x1', '3');
    expect(secondLine).toHaveAttribute('y1', '0');
    expect(secondLine).toHaveAttribute('x2', '3');
    expect(secondLine).toHaveAttribute('y2', '8');
  });

  it('should expose its ref via an innerRef prop', () => {
    const fakeRef = React.createRef<SVGGElement>();
    const { container } = render(
      <svg>
        <Axis {...axisProps} innerRef={fakeRef} />
      </svg>,
    );

    const axisElement = container.querySelector('g.visx-axis');
    expect(fakeRef.current).toBe(axisElement);
  });
});
