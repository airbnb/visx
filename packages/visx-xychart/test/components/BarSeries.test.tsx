import { vi } from 'vitest';
import React, { useContext, useEffect } from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DataContext, AnimatedBarSeries, BarSeries, useEventEmitter } from '../../src';
import getDataContext from '../mocks/getDataContext';
import setupTooltipTest from '../mocks/setupTooltipTest';
import { XYCHART_EVENT_SOURCE } from '../../src/constants';

const series = { data: [{}, {}], xAccessor: () => 0, yAccessor: () => 10 };
const seriesMissingData = {
  data: [{ x: 1 }, { x: 0, y: 3 }, { y: 2 }],
  xAccessor: (d: { x?: number }) => d.x,
  yAccessor: (d: { y?: number }) => d.y,
};

describe('<BarSeries />', () => {
  it('should be defined', () => {
    expect(BarSeries).toBeDefined();
  });

  it('should render rects', () => {
    const { container } = render(
      <DataContext.Provider value={getDataContext({ key: 'bar', ...series })}>
        <svg>
          <BarSeries dataKey={'bar'} {...series} />
        </svg>
      </DataContext.Provider>,
    );
    expect(container.querySelectorAll('rect')).toHaveLength(2);
  });

  it('should render rounded rects if radius is set', () => {
    const { container } = render(
      <DataContext.Provider value={getDataContext({ key: 'bar', ...series })}>
        <svg>
          <BarSeries dataKey={'bar'} radiusAll radius={4} {...series} />
        </svg>
      </DataContext.Provider>,
    );
    expect(container.querySelectorAll('path')).toHaveLength(2);
  });

  it('should use colorAccessor if passed', () => {
    const { container } = render(
      <DataContext.Provider value={getDataContext({ key: 'bar', ...series })}>
        <svg>
          <BarSeries
            dataKey={'bar'}
            {...series}
            colorAccessor={(_, i) => (i === 0 ? 'banana' : null)}
          />
        </svg>
      </DataContext.Provider>,
    );
    const rects = container.querySelectorAll('rect');
    expect(rects[0]).toHaveAttribute('fill', 'banana');
    expect(rects[1]).not.toHaveAttribute('fill', 'banana');
  });

  it('should not render rects if x or y is invalid', () => {
    const { container } = render(
      <DataContext.Provider value={getDataContext({ key: 'barMissingData', ...seriesMissingData })}>
        <svg>
          <BarSeries dataKey={'barMissingData'} {...seriesMissingData} />
        </svg>
      </DataContext.Provider>,
    );
    expect(container.querySelectorAll('rect')).toHaveLength(1);
  });

  it('should invoke showTooltip/hideTooltip on pointermove/pointerout', async () => {
    expect.assertions(2);

    const showTooltip = vi.fn();
    const hideTooltip = vi.fn();

    const EventEmitter = () => {
      const emit = useEventEmitter();

      useEffect(() => {
        if (emit) {
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

    const ConditionalEventEmitter = () => {
      const { dataRegistry } = useContext(DataContext);
      // BarSeries won't render until its data is registered
      // wait for that to emit the events
      return dataRegistry?.get('bar') ? <EventEmitter /> : null;
    };

    setupTooltipTest(
      <>
        <BarSeries dataKey={'bar'} {...series} />
        <ConditionalEventEmitter />
      </>,
      { showTooltip, hideTooltip },
    );

    // Wait for async event handlers to be called
    await waitFor(() => {
      expect(showTooltip).toHaveBeenCalledTimes(1);
    });

    expect(hideTooltip).toHaveBeenCalledTimes(1);
  });
});

describe('<AnimatedBarSeries />', () => {
  it('should be defined', () => {
    expect(AnimatedBarSeries).toBeDefined();
  });
  it('should render an animated.rect', () => {
    const { container } = render(
      <DataContext.Provider value={getDataContext({ key: 'bar', ...series })}>
        <svg>
          <AnimatedBarSeries dataKey={'bar'} {...series} />
        </svg>
      </DataContext.Provider>,
    );
    expect(container.querySelectorAll('rect')).toHaveLength(series.data.length);
  });
});
