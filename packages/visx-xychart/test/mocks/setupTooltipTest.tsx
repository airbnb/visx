/* eslint-disable import/no-extraneous-dependencies */
import { vi } from 'vitest';
import { render } from '@testing-library/react';
/* eslint-enable import/no-extraneous-dependencies */
import React from 'react';
import type { TooltipContextType } from '../../src';
import { DataProvider, EventEmitterProvider, TooltipContext } from '../../src';

const providerProps = {
  initialDimensions: { width: 100, height: 100 },
  xScale: { type: 'linear' },
  yScale: { type: 'linear' },
} as const;

const defaultTooltipContext = {
  tooltipOpen: false,
  showTooltip: vi.fn(),
  updateTooltip: vi.fn(),
  hideTooltip: vi.fn(),
};

// sets up boilerplate context for testing tooltips
export default function setupTooltipTest(
  children: React.ReactNode,
  tooltipContext?: Partial<TooltipContextType<object>>,
) {
  return render(
    <DataProvider {...providerProps}>
      <EventEmitterProvider>
        <TooltipContext.Provider value={{ ...defaultTooltipContext, ...tooltipContext }}>
          <svg>{children}</svg>
        </TooltipContext.Provider>
      </EventEmitterProvider>
    </DataProvider>,
  );
}
