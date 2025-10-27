import { vi } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Area } from '../src';

interface Datum {
  x: Date;
  y: number;
}

const fakeData: Datum[] = [
  { x: new Date('2017-01-01'), y: 5 },
  { x: new Date('2017-01-02'), y: 5 },
  { x: new Date('2017-01-03'), y: 5 },
];

const xScale = () => 50;
const yScale = () => 50;
yScale.range = () => [100, 0];

const x = () => xScale();
const y = () => yScale();

describe('<Area />', () => {
  test('should be defined', () => {
    const { container } = render(
      <svg>
        <Area data={fakeData} x={x} y={y} />
      </svg>,
    );
    expect(container.querySelector('path')).toBeInTheDocument();
  });

  test('should have the .visx-area class', () => {
    const { container } = render(
      <svg>
        <Area data={fakeData} x={x} y={y} />
      </svg>,
    );
    expect(container.querySelector('path')).toHaveClass('visx-area');
  });

  test('should expose its ref via an innerRef prop', () => {
    const fakeRef = React.createRef<SVGPathElement>();
    const { container } = render(
      <svg>
        <Area data={fakeData} x={x} y={y} innerRef={fakeRef} />
      </svg>,
    );
    const pathElement = container.querySelector('path');
    expect(fakeRef.current).toBe(pathElement);
  });

  test('should handle children as function prop', () => {
    const childrenFn = vi.fn(() => null);
    render(
      <svg>
        <Area data={fakeData} x={x} y={y}>
          {childrenFn}
        </Area>
      </svg>,
    );

    expect(childrenFn).toHaveBeenCalled();
    const args = childrenFn.mock.calls[0][0];
    expect(args).toHaveProperty('path');
  });

  test('should handle x and y props correctly', () => {
    const childrenFn = vi.fn((_: { path: any }) => null);
    const args = [fakeData[0], 0, fakeData] as const;

    // Test number props
    render(
      <svg>
        <Area data={fakeData} x={42} y={42}>
          {childrenFn}
        </Area>
      </svg>,
    );

    const [{ path }] = childrenFn.mock.calls[0];
    expect(path.x()(...args)).toBe(42);
    expect(path.y()(...args)).toBe(42);

    childrenFn.mockClear();

    // Test function props
    render(
      <svg>
        <Area data={fakeData} x={() => 42} y={() => 42}>
          {childrenFn}
        </Area>
      </svg>,
    );

    const [{ path: path2 }] = childrenFn.mock.calls[0];

    expect(path2.x()(...args)).toBe(42);
    expect(path2.x0()(...args)).toBe(42);
    expect(path2.x1()).toBeNull();
    expect(path2.y()(...args)).toBe(42);
    expect(path2.y0()(...args)).toBe(42);
    expect(path2.y1()).toBeNull();
  });

  test('should handle default defined prop and generate path string', () => {
    const childrenFn = vi.fn((_: { path: any }) => null);
    const args = [fakeData[0], 0, fakeData] as const;
    render(
      <svg>
        <Area data={fakeData} x={x} y={y}>
          {childrenFn}
        </Area>
      </svg>,
    );

    const [{ path }] = childrenFn.mock.calls[0];
    expect(path.defined()(...args)).toBe(true);
    expect(typeof path(fakeData)).toBe('string');
  });
});
