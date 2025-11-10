import { vi } from 'vitest';
import React, { useContext, useEffect, useRef } from 'react';
import '@testing-library/jest-dom';
import { render, waitFor } from '@testing-library/react';
import {
  AnimatedBarGroup,
  BarGroup,
  BarSeries,
  DataContext,
  DataProvider,
  useEventEmitter,
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

const seriesMissingData = {
  data: [{ y: 5 }, { x: 7 }, { x: 7, y: 20 }],
  ...accessors,
};

describe('<BarGroup />', () => {
  it('should be defined', () => {
    expect(BarSeries).toBeDefined();
  });

  it('should render rects', () => {
    const { container } = render(
      <DataProvider {...providerProps}>
        <svg>
          <BarGroup>
            <BarSeries dataKey={'bar1'} {...series1} />
            <BarSeries dataKey={'bar2'} {...series2} />
          </BarGroup>
        </svg>
      </DataProvider>,
    );
    expect(container.querySelectorAll('rect')).toHaveLength(4);
  });

  it('should render BarRounded if radius is set', () => {
    const { container } = render(
      <DataProvider {...providerProps}>
        <svg>
          <BarGroup>
            <BarSeries dataKey={'bar1'} radiusAll radius={4} {...series1} />
            <BarSeries dataKey={'bar2'} {...series2} />
          </BarGroup>
        </svg>
      </DataProvider>,
    );
    expect(container.querySelectorAll('path')).toHaveLength(2);
  });

  it('should use colorAccessor if passed', () => {
    const { container } = render(
      <DataProvider {...providerProps}>
        <svg>
          <BarGroup>
            <BarSeries dataKey={'bar1'} {...series1} />
            <BarSeries
              dataKey={'bar2'}
              {...series2}
              colorAccessor={(_, i) => (i === 0 ? 'banana' : null)}
            />
          </BarGroup>
        </svg>
      </DataProvider>,
    );
    const rects = container.querySelectorAll('rect');
    expect(rects[0]).not.toHaveAttribute('fill', 'banana');
    expect(rects[1]).not.toHaveAttribute('fill', 'banana');
    expect(rects[2]).toHaveAttribute('fill', 'banana');
    expect(rects[3]).not.toHaveAttribute('fill', 'banana');
  });

  it('should not render rects with invalid x or y', () => {
    const { container } = render(
      <DataProvider {...providerProps}>
        <svg>
          <BarGroup>
            <BarSeries dataKey={'bar1'} {...series1} />
            <BarSeries dataKey={'seriesMissingData'} {...seriesMissingData} />
          </BarGroup>
        </svg>
      </DataProvider>,
    );
    expect(container.querySelectorAll('rect')).toHaveLength(3);
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
        <BarGroup>
          <BarSeries dataKey={'bar1'} {...series1} />
          <BarSeries dataKey={'bar2'} {...series2} />
        </BarGroup>
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

describe('<AnimatedBarGroup />', () => {
  it('should be defined', () => {
    expect(AnimatedBarGroup).toBeDefined();
  });
  it('should render an animated.rect', () => {
    const { container } = render(
      <DataProvider {...providerProps}>
        <svg>
          <AnimatedBarGroup>
            <BarSeries dataKey={'bar1'} {...series1} />
            <BarSeries dataKey={'bar2'} {...series2} />
          </AnimatedBarGroup>
        </svg>
      </DataProvider>,
    );
    expect(container.querySelectorAll('rect')).toHaveLength(4);
  });
});
