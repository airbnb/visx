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

import { Area } from '../src';
import { AreaProps } from '../src/shapes/Area';

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
      </svg>
    );
    expect(container.querySelector('path')).toBeInTheDocument();
  });

  test('should have the .visx-area class', () => {
    const { container } = render(
      <svg>
        <Area data={fakeData} x={x} y={y} />
      </svg>
    );
    expect(container.querySelector('path')).toHaveClass('visx-area');
  });

  test('should expose its ref via an innerRef prop', () => {
    const fakeRef = React.createRef<SVGPathElement>();
    const { container } = render(
      <svg>
        <Area data={fakeData} x={x} y={y} innerRef={fakeRef} />
      </svg>
    );
    const pathElement = container.querySelector('path');
    expect(fakeRef.current).toBe(pathElement);
  });

  test('should handle children as function prop', () => {
    const childrenFn = jest.fn(() => null);
    render(
      <svg>
        <Area data={fakeData} x={x} y={y}>
          {childrenFn}
        </Area>
      </svg>
    );
    
    expect(childrenFn).toHaveBeenCalled();
    const args = childrenFn.mock.calls[0][0];
    expect(args).toHaveProperty('path');
  });

  test('should handle x and y props correctly', () => {
    const childrenFn = jest.fn(() => null);
    
    // Test number props
    render(
      <svg>
        <Area data={fakeData} x={42} y={42}>
          {childrenFn}
        </Area>
      </svg>
    );
    
    let args = childrenFn.mock.calls[0][0];
    expect(args.path.x()()).toBe(42);
    expect(args.path.y()()).toBe(42);

    childrenFn.mockClear();

    // Test function props
    render(
      <svg>
        <Area data={fakeData} x={() => 42} y={() => 42}>
          {childrenFn}
        </Area>
      </svg>
    );
    
    args = childrenFn.mock.calls[0][0];
    expect(args.path.x()()).toBe(42);
    expect(args.path.x0()()).toBe(42);
    expect(args.path.x1()).toBeNull();
    expect(args.path.y()()).toBe(42);
    expect(args.path.y0()()).toBe(42);
    expect(args.path.y1()).toBeNull();
  });

  test('should handle default defined prop and generate path string', () => {
    const childrenFn = jest.fn(() => null);
    render(
      <svg>
        <Area data={fakeData} x={x} y={y}>
          {childrenFn}
        </Area>
      </svg>
    );
    
    const args = childrenFn.mock.calls[0][0];
    expect(args.path.defined()()).toBe(true);
    expect(typeof args.path(fakeData)).toBe('string');
  });
});
// MIGRATION STATUS: {"eslint":"pending","jest":{"passed":6,"failed":0,"total":6,"skipped":0,"successRate":100},"tsc":"pending","enyzme":"converted"}
