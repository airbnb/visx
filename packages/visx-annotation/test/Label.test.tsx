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
import { ResizeObserver } from '@juggle/resize-observer';
import { Label } from '../src';

jest.mock('@visx/text/lib/Text', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

jest.mock('@visx/group/lib/Group', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <g>{children}</g>,
}));

describe('<Label />', () => {
  const renderLabel = (props: React.ComponentProps<typeof Label>) =>
    render(
      <svg>
        <Label {...props} />
      </svg>,
    );

  it('should be defined', () => {
    expect(Label).toBeDefined();
  });

  it('should render title text', () => {
    const { getByText } = renderLabel({
      title: 'title test',
      resizeObserverPolyfill: ResizeObserver,
    });
    expect(getByText('title test')).toBeInTheDocument();
  });

  it('should render subtitle text', () => {
    const { getByText } = renderLabel({
      title: 'title test',
      subtitle: 'subtitle test',
      resizeObserverPolyfill: ResizeObserver,
    });
    expect(getByText('subtitle test')).toBeInTheDocument();
  });

  it('should render background', () => {
    const { container } = renderLabel({
      title: 'title test',
      showBackground: true,
      resizeObserverPolyfill: ResizeObserver,
    });
    const rect = container.querySelector('rect');
    expect(rect).toBeInTheDocument();
  });

  it('should render anchor line', () => {
    const { container } = renderLabel({
      title: 'title test',
      showAnchorLine: true,
      resizeObserverPolyfill: ResizeObserver,
    });
    const line = container.querySelector('line');
    expect(line).toBeInTheDocument();
  });
});
// MIGRATION STATUS: {"eslint":"pending","jest":{"passed":5,"failed":0,"total":5,"skipped":0,"successRate":100},"tsc":"pending","enyzme":"converted"}
