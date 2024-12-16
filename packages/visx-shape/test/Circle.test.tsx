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

import { Circle } from '../src';

describe('<Circle />', () => {
  test('it should be defined', () => {
    expect(Circle).toBeDefined();
  });

  test('it should have the .visx-circle class', () => {
    const { container } = render(
      <svg>
        <Circle className="test" />
      </svg>
    );
    const circle = container.querySelector('circle');
    expect(circle).toHaveClass('visx-circle', 'test');
  });

  test('it should expose its ref via an innerRef prop', () => {
    const fakeRef = React.createRef<SVGCircleElement>();
    const { container } = render(
      <svg>
        <Circle innerRef={fakeRef} />
      </svg>
    );
    const circle = container.querySelector('circle');
    expect(fakeRef.current).toBe(circle);
  });
});
// MIGRATION STATUS: {"eslint":"pending","jest":{"passed":3,"failed":0,"total":3,"skipped":0,"successRate":100},"tsc":"pending","enyzme":"converted"}
