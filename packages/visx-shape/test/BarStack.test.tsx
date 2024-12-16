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
import { scaleBand } from '@visx/scale';
import { BarStack } from '../src';

const scale = scaleBand({
  domain: [0, 100],
  range: [0, 100],
});

describe('<BarStack />', () => {
  test('it should be defined', () => {
    expect(BarStack).toBeDefined();
  });

  test('it should have className .visx-bar-stack', () => {
    const { container } = render(
      <svg>
        <BarStack
          data={[]}
          top={2}
          left={3}
          x={(d) => d}
          xScale={scale}
          yScale={scale}
          color={(d) => d}
          keys={[]}
        />
      </svg>
    );
    
    expect(container.querySelector('.visx-bar-stack')).toBeInTheDocument();
  });

  test('it should set className prop', () => {
    const { container } = render(
      <svg>
        <BarStack
          className="test"
          data={[]}
          top={2}
          left={3}
          x={(d) => d}
          xScale={scale}
          yScale={scale}
          color={(d) => d}
          keys={[]}
        />
      </svg>
    );

    const element = container.querySelector('.visx-bar-stack');
    expect(element).toHaveClass('visx-bar-stack');
    expect(element).toHaveClass('test');
  });

  test('it should set top & left props', () => {
    const { container } = render(
      <svg>
        <BarStack
          className="test"
          data={[]}
          top={2}
          left={3}
          x={(d) => d}
          xScale={scale}
          yScale={scale}
          color={(d) => d}
          keys={[]}
        />
      </svg>
    );

    const element = container.querySelector('.visx-bar-stack');
    expect(element).toHaveAttribute('transform', 'translate(3, 2)');
  });
});
// MIGRATION STATUS: {"eslint":"pending","jest":{"passed":4,"failed":0,"total":4,"skipped":0,"successRate":100},"tsc":"pending","enyzme":"converted"}
