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
import { Line } from '../src';

describe('<Line />', () => {
  test('it should be defined', () => {
    expect(Line).toBeDefined();
  });

  test('it should contain a <line />', () => {
    const { container } = render(<svg><Line /></svg>);
    expect(container.querySelector('line')).toBeInTheDocument();
  });

  test('it should have the .visx-line class', () => {
    const { container } = render(<svg><Line /></svg>);
    expect(container.querySelector('line')).toHaveClass('visx-line');
  });

  test('it should expose its ref via an innerRef prop', () => {
    const fakeRef = React.createRef<SVGLineElement>();
    const { container } = render(
      <svg>
        <Line innerRef={fakeRef} />
      </svg>,
    );
    const lineElement = container.querySelector('line');
    expect(fakeRef.current).toBe(lineElement);
  });

  test('it should set shapeRendering to auto if not rectilinear', () => {
    const { container } = render(
      <svg>
        <Line
          to={{
            x: 50,
            y: 100,
          }}
        />
      </svg>,
    );
    expect(container.querySelector('line')).toHaveAttribute('shape-rendering', 'auto');
  });

  test('it should set shapeRendering to crispEdges if rectilinear', () => {
    const { container } = render(
      <svg>
        <Line
          to={{
            x: 0,
            y: 100,
          }}
        />
      </svg>,
    );
    expect(container.querySelector('line')).toHaveAttribute('shape-rendering', 'crispEdges');

    const { container: container2 } = render(
      <svg>
        <Line
          to={{
            x: 100,
            y: 0,
          }}
        />
      </svg>,
    );
    expect(container2.querySelector('line')).toHaveAttribute('shape-rendering', 'crispEdges');
  });
});
// MIGRATION STATUS: {"eslint":"pending","jest":{"passed":6,"failed":0,"total":6,"skipped":0,"successRate":100},"tsc":"pending","enyzme":"converted"}
