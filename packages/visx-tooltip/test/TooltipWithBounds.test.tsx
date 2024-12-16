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
import { TooltipWithBounds, defaultStyles } from '../src';
import { Tooltip } from '../src/tooltips/Tooltip';

jest.mock('../src/tooltips/Tooltip', () => ({
  __esModule: true,
  default: jest.fn(() => null),
}));

describe('<TooltipWithBounds />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('it should be defined', () => {
    expect(TooltipWithBounds).toBeDefined();
  });

  it('should render the Tooltip with default styles by default', () => {
    render(<TooltipWithBounds>Hello</TooltipWithBounds>);
    
    const props = jest.mocked(Tooltip).mock.calls[0][0];
    Object.entries(defaultStyles).forEach(([key, value]) => {
      expect(props.style[key]).toBe(value);
    });
  });

  it('should render the tooltip without default styles if unstyled is set to true', () => {
    render(<TooltipWithBounds unstyled>Hello</TooltipWithBounds>);
    
    const props = jest.mocked(Tooltip).mock.calls[0][0];
    Object.keys(defaultStyles).forEach((key) => {
      expect(props.style[key]).toBeUndefined();
    });
  });
});
// MIGRATION STATUS: {"eslint":"pending","jest":{"passed":1,"failed":2,"total":3,"skipped":0,"successRate":33.33333333333333},"tsc":"pending","enyzme":"converted"}
