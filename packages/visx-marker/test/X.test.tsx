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
import { MarkerX } from '../src';
import MarkerCross from '../src/markers/Cross';

jest.mock('../src/markers/Cross', () => {
  const MockMarkerCross = jest.fn(({ orient }: { orient: string }) => (
    <div data-testid="marker-cross" data-orient={orient} />
  ));
  return { __esModule: true, default: MockMarkerCross };
});

describe('<MarkerX />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('it should be defined', () => {
    expect(MarkerX).toBeDefined();
  });

  test('it should render MarkerCross rotated 45deg', () => {
    const { getByTestId } = render(<MarkerX id="marker-x-test" />);
    const cross = getByTestId('marker-cross');
    expect(cross).toHaveAttribute('data-orient', '45');
  });
});
// MIGRATION STATUS: {"eslint":"pending","jest":{"passed":2,"failed":0,"total":2,"skipped":0,"successRate":100},"tsc":"pending","enyzme":"converted"}
