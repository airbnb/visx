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
      </svg>
    );
    const path = container.querySelector('path');
    expect(path).toHaveClass('visx-area-closed');
  });

  test('it should expose its ref via an innerRef prop', () => {
    const fakeRef = React.createRef<SVGPathElement>();
    const { container } = render(
      <svg>
        <AreaClosed data={data} yScale={yScale} x={x} y1={y} innerRef={fakeRef} />
      </svg>
    );
    const path = container.querySelector('path');
    expect(fakeRef.current).toBe(path);
  });

  test('it should handle children function prop', () => {
    const childrenFn = jest.fn(() => null);
    render(
      <svg>
        <AreaClosed data={data} yScale={yScale} x={x} y1={y}>
          {childrenFn}
        </AreaClosed>
      </svg>
    );
    
    expect(childrenFn).toHaveBeenCalled();
    const args = childrenFn.mock.calls[0][0];
    expect(args).toHaveProperty('path');
  });

  test('it should generate correct path data', () => {
    const { container } = render(
      <svg>
        <AreaClosed data={data} yScale={yScale} x={x} y1={y} />
      </svg>
    );
    const path = container.querySelector('path');
    expect(path).toHaveAttribute('d');
    expect(typeof path?.getAttribute('d')).toBe('string');
  });

  test('it should handle number and function props', () => {
    const childrenFn = jest.fn(() => null);
    
    // Test with number prop
    render(
      <svg>
        <AreaClosed data={data} yScale={yScale} x={42} y1={42}>
          {childrenFn}
        </AreaClosed>
      </svg>
    );
    
    let args = childrenFn.mock.calls[0][0];
    expect(args.path.x()()).toBe(42);
    expect(args.path.y0()()).toBe(yScale.range()[0]);
    expect(args.path.y1()()).toBe(42);

    // Test with function prop
    childrenFn.mockClear();
    render(
      <svg>
        <AreaClosed data={data} yScale={yScale} x={() => 42} y1={() => 42}>
          {childrenFn}
        </AreaClosed>
      </svg>
    );
    
    args = childrenFn.mock.calls[0][0];
    expect(args.path.x()()).toBe(42);
    expect(args.path.y0()()).toBe(yScale.range()[0]);
    expect(args.path.y1()()).toBe(42);
    expect(args.path.defined()()).toBe(true);
  });
});
// MIGRATION STATUS: {"eslint":"pending","jest":{"passed":6,"failed":0,"total":6,"skipped":0,"successRate":100},"tsc":"pending","enyzme":"converted"}
