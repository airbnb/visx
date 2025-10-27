import { vi } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { scaleLinear } from '@visx/scale';
import { AreaClosed } from '../src';

interface Datum {
  x: Date;
  y: number;
}

const data: Datum[] = [
  { x: new Date('2017-01-01'), y: 5 },
  { x: new Date('2017-01-02'), y: 5 },
  { x: new Date('2017-01-03'), y: 5 },
];

const yScale = scaleLinear({ domain: [0, 100], range: [100, 0] });

const x = () => 50;
const y = () => 50;

describe('<AreaClosed />', () => {
  test('it should be defined', () => {
    expect(AreaClosed).toBeDefined();
  });

  test('it should have the .visx-area-closed class', () => {
    const { container } = render(
      <svg>
        <AreaClosed data={data} yScale={yScale} x={x} y1={y} />
      </svg>,
    );
    const path = container.querySelector('path');
    expect(path).toHaveClass('visx-area-closed');
  });

  test('it should expose its ref via an innerRef prop', () => {
    const fakeRef = React.createRef<SVGPathElement>();
    const { container } = render(
      <svg>
        <AreaClosed data={data} yScale={yScale} x={x} y1={y} innerRef={fakeRef} />
      </svg>,
    );
    const path = container.querySelector('path');
    expect(fakeRef.current).toBe(path);
  });

  test('it should handle children function prop', () => {
    const childrenFn = vi.fn((_) => null);
    render(
      <svg>
        <AreaClosed data={data} yScale={yScale} x={x} y1={y}>
          {childrenFn}
        </AreaClosed>
      </svg>,
    );

    expect(childrenFn).toHaveBeenCalled();
    const args = childrenFn.mock.calls[0][0];
    expect(args).toHaveProperty('path');
  });

  test('it should generate correct path data', () => {
    const { container } = render(
      <svg>
        <AreaClosed data={data} yScale={yScale} x={x} y1={y} />
      </svg>,
    );
    const path = container.querySelector('path');
    expect(path).toHaveAttribute('d');
    expect(typeof path?.getAttribute('d')).toBe('string');
  });

  test('it should handle number and function props', () => {
    const childrenFn = vi.fn((_: { path: any }) => null);
    const args = [data[0], 0, data] as const;
    // Test with number prop
    render(
      <svg>
        <AreaClosed data={data} yScale={yScale} x={42} y1={42}>
          {childrenFn}
        </AreaClosed>
      </svg>,
    );

    const { path } = childrenFn.mock.calls[0][0];
    expect(path.x()(...args)).toBe(42);
    expect(path.y0()(...args)).toBe(yScale.range()[0]);
    expect(path.y1()?.(...args)).toBe(42);

    // Test with function prop
    childrenFn.mockClear();
    render(
      <svg>
        <AreaClosed data={data} yScale={yScale} x={() => 42} y1={() => 42}>
          {childrenFn}
        </AreaClosed>
      </svg>,
    );

    const [{ path: path2 }] = childrenFn.mock.calls[0];
    expect(path2.x()(...args)).toBe(42);
    expect(path2.y0()(...args)).toBe(yScale.range()[0]);
    expect(path2.y1()?.(...args)).toBe(42);
    expect(path2.defined()(...args)).toBe(true);
  });
});
