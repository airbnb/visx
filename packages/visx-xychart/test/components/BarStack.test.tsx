import { vi } from 'vitest';
import React, { useContext, useEffect } from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  BarStack,
  BarSeries,
  DataProvider,
  DataContext,
  useEventEmitter,
  AnimatedBarStack,
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
  key: 'bar1',
  data: [
    { x: 10, y: 5 },
    { x: 7, y: 5 },
  ],
  ...accessors,
};

const series2 = {
  key: 'bar2',
  data: [
    { x: 10, y: 5 },
    { x: 7, y: 20 },
  ],
  ...accessors,
};
const seriesMissingData = {
  key: 'seriesMissingData',
  data: [{ y: 5 }, { x: 7 }, { x: 7, y: 20 }],
  ...accessors,
};

describe('<BarStack />', () => {
  it('should be defined', () => {
    expect(BarSeries).toBeDefined();
  });

  it('should render rects', () => {
    const { container } = render(
      <DataProvider {...providerProps}>
        <svg>
          <BarStack>
            <BarSeries dataKey={series1.key} {...series1} />
            <BarSeries dataKey={series2.key} {...series2} />
          </BarStack>
        </svg>
      </DataProvider>,
    );
    const RectElements = container.querySelectorAll('rect');
    expect(RectElements).toHaveLength(4);
  });

  it('should render BarRounded if radius is set', () => {
    const { container } = render(
      <DataProvider {...providerProps}>
        <svg>
          <BarStack>
            <BarSeries dataKey={series1.key} radiusAll radius={4} {...series1} />
            <BarSeries dataKey={series2.key} {...series2} />
          </BarStack>
        </svg>
      </DataProvider>,
    );
    expect(container.querySelectorAll('path')).toHaveLength(2);
  });

  it('should use colorAccessor if passed', () => {
    const { container } = render(
      <DataProvider {...providerProps}>
        <svg>
          <BarStack>
            <BarSeries dataKey={series1.key} {...series1} />
            <BarSeries
              dataKey={series2.key}
              {...series2}
              colorAccessor={(_, i) => (i === 0 ? 'banana' : null)}
            />
          </BarStack>
        </svg>
      </DataProvider>,
    );
    const RectElements = container.querySelectorAll('rect');
    expect(RectElements[0]).not.toHaveAttribute('fill', 'banana');
    expect(RectElements[1]).not.toHaveAttribute('fill', 'banana');
    expect(RectElements[2]).toHaveAttribute('fill', 'banana');
    expect(RectElements[3]).not.toHaveAttribute('fill', 'banana');
  });

  it('should not render rects if x or y are invalid', () => {
    const { container } = render(
      <DataProvider {...providerProps}>
        <svg>
          <BarStack>
            <BarSeries dataKey={series1.key} {...series1} />
            <BarSeries dataKey={seriesMissingData.key} {...seriesMissingData} />
          </BarStack>
        </svg>
      </DataProvider>,
    );
    const RectElements = container.querySelectorAll('rect');
    expect(RectElements).toHaveLength(3);
  });

  it('should update scale domain to include stack sums including negative values', () => {
    expect.hasAssertions();

    function Assertion() {
      const { yScale, dataRegistry } = useContext(DataContext);
      // eslint-disable-next-line jest/no-if
      if (yScale && dataRegistry?.keys().length === 2) {
        expect(yScale.domain()).toEqual([-20, 10]);
      }
      return null;
    }

    render(
      <DataProvider {...providerProps}>
        <svg>
          <BarStack>
            <BarSeries dataKey={series1.key} {...series1} />
            <BarSeries
              dataKey={series2.key}
              {...series2}
              data={[
                { x: 10, y: 5 },
                { x: 7, y: -20 },
              ]}
            />
          </BarStack>
        </svg>
        <Assertion />
      </DataProvider>,
    );
  });

  it('should invoke showTooltip/hideTooltip on pointermove/pointerout', async () => {
    expect.assertions(2);

    const showTooltip = vi.fn();
    const hideTooltip = vi.fn();

    const EventEmitter = () => {
      const emit = useEventEmitter();
      const { yScale } = useContext(DataContext);

      useEffect(() => {
        // checking for yScale ensures stack data is registered and stacks are rendered
        if (emit && yScale) {
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
        <BarStack>
          <BarSeries dataKey={series1.key} {...series1} />
          <BarSeries dataKey={series2.key} {...series2} />
        </BarStack>
        <EventEmitter />
      </>,
      { showTooltip, hideTooltip },
    );

    // Wait for async event handlers to be called
    await waitFor(() => {
      expect(showTooltip).toHaveBeenCalledTimes(2); // one per key
    });

    expect(hideTooltip).toHaveBeenCalledTimes(1);
  });
});

describe('<AnimatedBarStack />', () => {
  it('should be defined', () => {
    expect(AnimatedBarStack).toBeDefined();
  });
  it('should render an animated.rect', () => {
    const { container } = render(
      <DataProvider {...providerProps}>
        <svg>
          <AnimatedBarStack>
            <BarSeries dataKey={series1.key} {...series1} />
            <BarSeries dataKey={series2.key} {...series2} />
          </AnimatedBarStack>
        </svg>
      </DataProvider>,
    );
    const RectElements = container.querySelectorAll('rect');
    expect(RectElements).toHaveLength(4);
  });
});
