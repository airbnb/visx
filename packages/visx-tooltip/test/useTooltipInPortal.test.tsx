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

    await waitFor(
      () => {
        const portalDiv = baseElement.querySelector('[style*="z-index: 1"]');
        expect(portalDiv).toBeInTheDocument();
      },
      {
        timeout: 1000,
        interval: 100,
      },
    );
  });

  it('should pass zIndex prop from component to Portal', async () => {
    const { baseElement } = render(
      <TooltipWithZIndex zIndexOption={1} zIndexProp="var(--tooltip-zindex)" />,
    );

    await waitFor(
      () => {
        const portalDiv = baseElement.querySelector('[data-testid="tooltip-portal"]');
        expect(portalDiv).toBeInTheDocument();
      },
      {
        timeout: 1000,
        interval: 100,
      },
    );
  });
});
