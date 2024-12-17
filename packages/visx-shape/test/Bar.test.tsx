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

import { Bar } from '../src';

describe('<Bar />', () => {
  test('it should be defined', () => {
    expect(Bar).toBeDefined();
  });

  test('it should have the .visx-bar class', () => {
    const { container } = render(
      <svg>
        <Bar className="test" />
      </svg>
    );
    const rect = container.querySelector('rect');
    expect(rect).toHaveClass('visx-bar', 'test');
  });

  test('it should expose its ref via an innerRef prop', () => {
    const fakeRef = React.createRef<SVGRectElement>();
    const { container } = render(
      <svg>
        <Bar innerRef={fakeRef} />
      </svg>
    );
    const rectElement = container.querySelector('rect');
    expect(fakeRef.current).toBe(rectElement);
  });
});
// MIGRATION STATUS: {"eslint":"pending","jest":{"passed":3,"failed":0,"total":3,"skipped":0,"successRate":100},"tsc":"pending","enyzme":"converted"}
