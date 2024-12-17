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
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'; // Add jest-dom matchers
import { ResizeObserver } from '@juggle/resize-observer';
import { useTooltipInPortal } from '../src';
import type { UseTooltipPortalOptions } from '../src/hooks/useTooltipInPortal';

interface TooltipWithZIndexProps {
  zIndexOption?: UseTooltipPortalOptions['zIndex'];
  zIndexProp?: UseTooltipPortalOptions['zIndex'];
}

const TooltipWithZIndex = ({ zIndexOption, zIndexProp }: TooltipWithZIndexProps) => {
  const { TooltipInPortal } = useTooltipInPortal({
    polyfill: ResizeObserver,
    zIndex: zIndexOption,
  });
  return (
    <TooltipInPortal zIndex={zIndexProp} data-testid="tooltip-portal">
      Hello
    </TooltipInPortal>
  );
};

describe('useTooltipInPortal()', () => {
  test('it should be defined', () => {
    expect(useTooltipInPortal).toBeDefined();
  });

  it('should pass zIndex prop from options to Portal', async () => {
    const { baseElement } = render(<TooltipWithZIndex zIndexOption={1} />);
    
    await waitFor(() => {
      const portalDiv = baseElement.querySelector('[style*="z-index: 1"]');
      expect(portalDiv).toBeInTheDocument();
      expect(portalDiv).toHaveStyle('z-index: 1');
    }, {
      timeout: 1000,
      interval: 100,
    });
  });

  it('should pass zIndex prop from component to Portal', async () => {
    const { baseElement } = render(
      <TooltipWithZIndex zIndexOption={1} zIndexProp="var(--tooltip-zindex)" />
    );

    await waitFor(() => {
      const portalDiv = baseElement.querySelector('[style*="z-index: var(--tooltip-zindex)"]');
      expect(portalDiv).toBeInTheDocument(); 
      expect(portalDiv).toHaveStyle('z-index: var(--tooltip-zindex)');
    }, {
      timeout: 1000,
      interval: 100,
    });
  });
});
// MIGRATION STATUS: {"eslint":"pass","jest":{"passed":3,"failed":0,"total":3,"skipped":0,"successRate":100},"tsc":"pending","enyzme":"converted"}
