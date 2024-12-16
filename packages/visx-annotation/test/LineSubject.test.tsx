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
import { LineSubject } from '../src';

describe('<LineSubject />', () => {
  it('should be defined', () => {
    expect(LineSubject).toBeDefined();
  });

  it('should render a line', () => {
    const { container } = render(
      <svg width={100} height={100}>
        <LineSubject min={0} max={100} x={50} y={50} />
      </svg>
    );
    const lineElement = container.querySelector('line');
    expect(lineElement).toBeInTheDocument();
  });
});
// MIGRATION STATUS: {"eslint":"pending","jest":{"passed":2,"failed":0,"total":2,"skipped":0,"successRate":100},"tsc":"pending","enyzme":"converted"}
