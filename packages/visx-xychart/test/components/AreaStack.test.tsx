import { vi } from 'vitest';
import React, { useContext, useEffect, useRef } from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  AreaStack,
  AreaSeries,
  DataProvider,
  DataContext,
  useEventEmitter,
  AnimatedAreaStack,
} from '../../src';
import setupTooltipTest from '../mocks/setupTooltipTest';
import { XYCHART_EVENT_SOURCE } from '../../src/constants';

const providerProps = {
  initialDimensions: { width: 100, height: 100 },
  xScale: { type: 'linear' },
  yScale: { type: 'linear' },
} as const;

const accessors = {
  xAccessor: (d: { x?: number }) => d?.x,
  yAccessor: (d: { y?: number }) => d?.y,
};

const series1 = {
  data: [
    { x: 10, y: 5 },
    { x: 7, y: 5 },
  ],
  ...accessors,
};

const series2 = {
  data: [
    { x: 10, y: 5 },
    { x: 7, y: 20 },
  ],
  ...accessors,
};

describe('<AreaStack />', () => {
  it('should be defined', () => {
    expect(AreaSeries).toBeDefined();
  });

  it('should render Areas', () => {
    const { container } = render(
      <DataProvider {...providerProps}>
        <svg>
          <AreaStack>
            <AreaSeries dataKey={'area1'} {...series1} />
            <AreaSeries dataKey={'area2'} {...series2} />
          </AreaStack>
        </svg>
      </DataProvider>,
    );
    const Areas = container.querySelectorAll('.visx-area');
    expect(Areas).toHaveLength(2);
  });

  it('should render LinePaths if renderLine=true', () => {
    const { container } = render(
      <DataProvider {...providerProps}>
        <svg>
          <AreaStack renderLine>
            <AreaSeries dataKey={'area1'} {...series1} />
            <AreaSeries dataKey={'area2'} {...series2} />
          </AreaStack>
        </svg>
      </DataProvider>,
    );
    const LinePaths = container.querySelectorAll('.visx-line');
    expect(LinePaths).toHaveLength(2);
  });

  it('should render Glyphs if focus/blur handlers are set', () => {
    const { container } = render(
      <DataProvider {...providerProps}>
        <svg>
          <AreaStack onFocus={() => {}}>
            <AreaSeries dataKey={'area1'} {...series1} />
          </AreaStack>
        </svg>
      </DataProvider>,
    );
    const Circles = container.querySelectorAll('circle');
    expect(Circles).toHaveLength(series1.data.length);
  });

  it('should update scale domain to include stack sums including negative values', async () => {
    let yScale: any;

    function Assertion() {
      yScale = useContext(DataContext).yScale;
      return null;
    }

    render(
      <DataProvider {...providerProps}>
        <svg>
          <AreaStack>
            <AreaSeries dataKey={'area1'} {...series1} />
            <AreaSeries
              dataKey={'area2'}
              {...series2}
              data={[
                { x: 10, y: 5 },
                { x: 7, y: -20 },
              ]}
            />
          </AreaStack>
        </svg>
        <Assertion />
      </DataProvider>,
    );

    await waitFor(() => {
      expect(yScale.domain()).toEqual([-20, 10]);
    });
  });

  it('should invoke showTooltip/hideTooltip on pointermove/pointerout', async () => {
    expect.assertions(2);

    const showTooltip = vi.fn();
    const hideTooltip = vi.fn();

    const EventEmitter = () => {
      const emit = useEventEmitter();
      const { yScale } = useContext(DataContext);
      const hasEmitted = useRef(false);

      useEffect(() => {
        // checking for yScale ensures stack data is registered and stacks are rendered
        if (emit && yScale && !hasEmitted.current) {
          hasEmitted.current = true;

          // Get the SVG element to use as event target
          const svg = document.querySelector('svg');

          // Create PointerEvent with proper target
          const moveEvent = new PointerEvent('pointermove', {
            bubbles: true,
            clientX: 50,
            clientY: 50,
          });
          Object.defineProperty(moveEvent, 'target', {
            value: svg,
            enumerable: true,
          });

          const outEvent = new PointerEvent('pointerout', {
            bubbles: true,
          });
          Object.defineProperty(outEvent, 'target', {
            value: svg,
            enumerable: true,
          });

          emit(
            'pointermove',
            moveEvent as unknown as React.PointerEvent<Element>,
            XYCHART_EVENT_SOURCE,
          );
          emit(
            'pointerout',
            outEvent as unknown as React.PointerEvent<Element>,
            XYCHART_EVENT_SOURCE,
          );
        }
      });

      return null;
    };

    setupTooltipTest(
      <>
        <AreaStack>
          <AreaSeries dataKey={'area1'} {...series1} />
          <AreaSeries dataKey={'area2'} {...series2} />
        </AreaStack>
        <EventEmitter />
      </>,
      { showTooltip, hideTooltip },
    );

    // Wait for both async event handlers to be called
    await waitFor(() => {
      expect(showTooltip).toHaveBeenCalledTimes(2); // one per key
      expect(hideTooltip).toHaveBeenCalledTimes(1);
    });
  });
});

describe('<AnimatedAreaStack />', () => {
  it('should be defined', () => {
    expect(AnimatedAreaStack).toBeDefined();
  });
  it('should render an animated.path', () => {
    const { container } = render(
      <DataProvider {...providerProps}>
        <svg>
          <AnimatedAreaStack renderLine={false}>
            <AreaSeries dataKey={'area1'} {...series1} />
            <AreaSeries dataKey={'area2'} {...series2} />
          </AnimatedAreaStack>
        </svg>
      </DataProvider>,
    );
    const Circles = container.querySelectorAll('path');
    expect(Circles).toHaveLength(2);
  });
});
