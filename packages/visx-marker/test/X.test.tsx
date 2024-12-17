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

import { MarkerX } from '../src';

describe('<MarkerX />', () => {
  test('it should be defined', () => {
    expect(MarkerX).toBeDefined();
  });

  test('it should render marker with 45 degree rotation', () => {
    const { container } = render(
      <svg>
        <defs>
          <MarkerX id="marker-x-test" />
        </defs>
      </svg>
    );

    const marker = container.querySelector('#marker-x-test');
    expect(marker).toBeInTheDocument();
    expect(marker).toHaveAttribute('orient', '45');
  });
});
// MIGRATION STATUS: {"eslint":"pending","jest":{"passed":2,"failed":0,"total":2,"skipped":0,"successRate":100},"tsc":"pending","enyzme":"converted"}
