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

import { LinePath } from '../src';
import { LinePathProps } from '../src/shapes/LinePath';

interface Datum {
  x: number;
  y: number;
}

const linePathProps = {
  data: [
    { x: 0, y: 0 },
    { x: 1, y: 1 },
  ],
  x: (d: Datum) => d.x,
  y: (d: Datum) => d.y,
};

describe('<LinePath />', () => {
  it('should be defined', () => {
    expect(LinePath).toBeDefined();
  });

  it('should have the .visx-linepath class', () => {
    const { container } = render(
      <svg>
        <LinePath {...linePathProps} />
      </svg>
    );
    const path = container.querySelector('path');
    expect(path).toHaveClass('visx-linepath');
  });

  it('should default to strokeLinecap="round" for superior missing data rendering', () => {
    const { container } = render(
      <svg>
        <LinePath {...linePathProps} />
      </svg>
    );
    const path = container.querySelector('path');
    expect(path).toHaveAttribute('stroke-linecap', 'round');
  });

  it('should render path element', () => {
    const { container } = render(
      <svg>
        <LinePath {...linePathProps} />
      </svg>
    );
    const paths = container.querySelectorAll('path');
    expect(paths.length).toBeGreaterThan(0);
  });

  it('should take a children as function prop', () => {
    const fn = jest.fn(() => null);
    render(
      <svg>
        <LinePath>{fn}</LinePath>
      </svg>
    );
    expect(fn).toHaveBeenCalled();
  });

  it('should call children function with { path }', () => {
    const fn = jest.fn(() => null);
    render(
      <svg>
        <LinePath>{fn}</LinePath>
      </svg>
    );
    const args = fn.mock.calls[0][0];
    expect(args).toHaveProperty('path');
  });

  it('should expose its ref via an innerRef prop', () => {
    const fakeRef = React.createRef<SVGPathElement>();
    const { container } = render(
      <svg>
        <LinePath data={linePathProps.data} innerRef={fakeRef} />
      </svg>
    );
    const pathElement = container.querySelector('path');
    expect(fakeRef.current).toBe(pathElement);
  });
});
// MIGRATION STATUS: {"eslint":"pending","jest":{"passed":7,"failed":0,"total":7,"skipped":0,"successRate":100},"tsc":"pending","enyzme":"converted"}
