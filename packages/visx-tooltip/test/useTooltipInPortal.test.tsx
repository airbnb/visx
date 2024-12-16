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
import { ResizeObserver } from '@juggle/resize-observer';
import { useTooltipInPortal } from '../src';
import { UseTooltipPortalOptions } from '../src/hooks/useTooltipInPortal';
import Portal from '../src/Portal';

jest.mock('../src/Portal', () => ({
  __esModule: true,
  default: jest.fn(({ children }) => <div>{children}</div>),
}));

interface TooltipWithZIndexProps {
  zIndexOption?: UseTooltipPortalOptions['zIndex'];
  zIndexProp?: UseTooltipPortalOptions['zIndex'];
}

const TooltipWithZIndex = ({ zIndexOption, zIndexProp }: TooltipWithZIndexProps) => {
  const { TooltipInPortal } = useTooltipInPortal({
    polyfill: ResizeObserver,
    zIndex: zIndexOption,
  });
  return <TooltipInPortal zIndex={zIndexProp}>Hello</TooltipInPortal>;
};

describe('useTooltipInPortal()', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('it should be defined', () => {
    expect(useTooltipInPortal).toBeDefined();
  });

  it('should pass zIndex prop from options to Portal', () => {
    render(<TooltipWithZIndex zIndexOption={1} />);
    expect(Portal).toHaveBeenCalledWith(
      expect.objectContaining({ zIndex: 1 }),
      expect.any(Object),
    );
  });

  it('should pass zIndex prop from component to Portal', () => {
    render(<TooltipWithZIndex zIndexOption={1} zIndexProp="var(--tooltip-zindex)" />);
    expect(Portal).toHaveBeenCalledWith(
      expect.objectContaining({ zIndex: 'var(--tooltip-zindex)' }),
      expect.any(Object),
    );
  });
});
// MIGRATION STATUS: {"eslint":"pending","jest":{"passed":3,"failed":0,"total":3,"skipped":0,"successRate":100},"tsc":"pending","enyzme":"converted"}
