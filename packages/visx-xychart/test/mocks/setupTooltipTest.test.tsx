import React from 'react';
import { mount } from 'enzyme';
import { DataProvider, EventEmitterProvider, TooltipContext, TooltipContextType } from '../../src';

const providerProps = {
  initialDimensions: { width: 100, height: 100 },
  xScale: { type: 'linear' },
  yScale: { type: 'linear' },
} as const;

const defaultTooltipContext = {
  tooltipOpen: false,
  showTooltip: jest.fn(),
  updateTooltip: jest.fn(),
  hideTooltip: jest.fn(),
};

// sets up boilerplate context for testing tooltips
export default function setupTooltipTest(
  children: React.ReactNode,
  tooltipContext?: Partial<TooltipContextType<object>>,
) {
  return mount(
    <DataProvider {...providerProps}>
      <EventEmitterProvider>
        <TooltipContext.Provider value={{ ...defaultTooltipContext, ...tooltipContext }}>
          <svg>{children}</svg>
        </TooltipContext.Provider>
      </EventEmitterProvider>
    </DataProvider>,
  );
}
