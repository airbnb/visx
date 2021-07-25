/* eslint import/no-extraneous-dependencies: 'off' */
import React from 'react';
import { render } from '@testing-library/react';
import { DataProvider, EventEmitterProvider, TooltipContext, TooltipContextType } from '../../src';

const providerProps = {
  initialDimensions: { width: 100, height: 100 },
  xScale: { type: 'linear' },
  yScale: { type: 'linear' },
} as const;

const defaultTooltipContext = {
  tooltipOpen: false,
  /* eslint-disable no-undef */
  showTooltip: jest.fn(), // eslint doesn't know jest is in context in non-.test file
  updateTooltip: jest.fn(),
  hideTooltip: jest.fn(),
  /* eslint-enable no-undef */
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
