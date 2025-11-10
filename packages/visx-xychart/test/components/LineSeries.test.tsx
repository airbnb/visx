import { vi } from 'vitest';
import React, { useContext, useEffect } from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AnimatedLineSeries, DataContext, LineSeries, useEventEmitter } from '../../src';
import getDataContext from '../mocks/getDataContext';
import setupTooltipTest from '../mocks/setupTooltipTest';
import { XYCHART_EVENT_SOURCE } from '../../src/constants';

const series = { data: [{}], xAccessor: () => 4, yAccessor: () => 7 };

describe('<LineSeries />', () => {
  it('should be defined', () => {
    expect(LineSeries).toBeDefined();
  });

  it('should render a LinePath', () => {
    const { container } = render(
      <DataContext.Provider value={getDataContext({ key: 'line', ...series })}>
        <svg>
          <LineSeries dataKey={'line'} {...series} />
        </svg>
      </DataContext.Provider>,
    );
    expect(container.querySelectorAll('path')).toHaveLength(1);
  });

  it('should set strokeLinecap="round" to make datum surrounded by nulls visible', () => {
    const { container } = render(
      <DataContext.Provider value={getDataContext({ key: 'line', ...series })}>
        <svg>
          <LineSeries dataKey={'line'} {...series} />
        </svg>
      </DataContext.Provider>,
    );
    expect(container.querySelector('path')).toHaveAttribute('stroke-linecap', 'round');
  });

  it('should render Glyphs if focus/blur handlers are set', () => {
    const { container } = render(
      <DataContext.Provider value={getDataContext({ key: 'line', ...series })}>
        <svg>
          <LineSeries dataKey={'line'} {...series} onFocus={() => {}} />
        </svg>
      </DataContext.Provider>,
    );
    expect(container.querySelectorAll('circle')).toHaveLength(series.data.length);
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
      // LineSeries won't render until its data is registered
      // wait for that to emit the events
      return dataRegistry?.get('line') ? <EventEmitter /> : null;
    };

    setupTooltipTest(
      <>
        <LineSeries dataKey={'line'} {...series} />
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

  it('should use colorAccessor if passed', () => {
    const { container } = render(
      <DataContext.Provider value={getDataContext({ key: 'line', ...series })}>
        <svg>
          <LineSeries dataKey={'line'} {...series} colorAccessor={(_) => 'banana'} />
        </svg>
      </DataContext.Provider>,
    );
    expect(container.querySelector('path')).toHaveAttribute('stroke', 'banana');
  });
});

describe('<AnimatedLineSeries />', () => {
  it('should be defined', () => {
    expect(AnimatedLineSeries).toBeDefined();
  });
  it('should render an animated.path', () => {
    const { container } = render(
      <DataContext.Provider value={getDataContext({ key: 'line', ...series })}>
        <svg>
          <AnimatedLineSeries dataKey={'line'} {...series} />
        </svg>
      </DataContext.Provider>,
    );
    expect(container.querySelectorAll('path')).toHaveLength(1);
  });
});
