import { vi } from 'vitest';
import React, { useContext, useEffect } from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AnimatedAreaSeries, DataContext, AreaSeries, useEventEmitter } from '../../src';
import getDataContext from '../mocks/getDataContext';
import setupTooltipTest from '../mocks/setupTooltipTest';
import { XYCHART_EVENT_SOURCE } from '../../src/constants';

const series = { data: [{}], xAccessor: () => 4, yAccessor: () => 7 };

describe('<AreaSeries />', () => {
  it('should be defined', () => {
    expect(AreaSeries).toBeDefined();
  });

  it('should render an Area', () => {
    const { container } = render(
      <DataContext.Provider value={getDataContext({ key: 'line', ...series })}>
        <svg>
          <AreaSeries dataKey={'line'} {...series} />
        </svg>
      </DataContext.Provider>,
    );
    const Path = container.querySelector('path');
    expect(Path).toBeInTheDocument();
  });

  it('should set strokeLinecap="round" to make datum surrounded by nulls visible', () => {
    const { container } = render(
      <DataContext.Provider value={getDataContext({ key: 'line', ...series })}>
        <svg>
          <AreaSeries dataKey={'line'} renderLine={false} {...series} />
        </svg>
      </DataContext.Provider>,
    );
    const Path = container.querySelector('path');
    expect(Path).toBeInTheDocument();
    expect(Path).toHaveAttribute('stroke-linecap', 'round');
  });

  it('should use x/y0Accessors in an Area', () => {
    const y0Accessor = vi.fn(() => 3);
    const { container } = render(
      <DataContext.Provider value={getDataContext({ key: 'line', ...series })}>
        <svg>
          <AreaSeries dataKey={'line'} {...series} y0Accessor={y0Accessor} />
        </svg>
      </DataContext.Provider>,
    );

    const Path = container.querySelector('path');
    expect(Path).toBeInTheDocument();
    expect(y0Accessor).toHaveBeenCalled();
  });

  it('should render a LinePath is renderLine=true', () => {
    const { container } = render(
      <DataContext.Provider value={getDataContext({ key: 'line', ...series })}>
        <svg>
          <AreaSeries renderLine dataKey={'line'} {...series} />
        </svg>
      </DataContext.Provider>,
    );

    const LinePath = container.querySelector('.visx-line');
    expect(LinePath).toBeInTheDocument();
  });

  it('should render Glyphs if focus/blur handlers are set', () => {
    const { container } = render(
      <DataContext.Provider value={getDataContext({ key: 'line', ...series })}>
        <svg>
          {/* eslint-disable-next-line */}
          <AreaSeries dataKey={"line"} {...series} onFocus={() => { }} />
        </svg>
      </DataContext.Provider>,
    );

    const Circles = container.querySelectorAll('circle');
    expect(Circles).toHaveLength(series.data.length);
  });

  it('should invoke showTooltip/hideTooltip on pointermove/pointerout', async () => {
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
      // AreaSeries won't render until its data is registered
      // wait for that to emit the events
      return dataRegistry?.get('line') ? <EventEmitter /> : null;
    };

    setupTooltipTest(
      <>
        <AreaSeries dataKey={'line'} {...series} />
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

describe('<AnimatedAreaSeries />', () => {
  it('should be defined', () => {
    expect(AnimatedAreaSeries).toBeDefined();
  });
  it('should render an animated.path', () => {
    const { container } = render(
      <DataContext.Provider value={getDataContext({ key: 'line', ...series })}>
        <svg>
          <AnimatedAreaSeries renderLine={false} dataKey={'line'} {...series} />
        </svg>
      </DataContext.Provider>,
    );
    const Path = container.querySelectorAll('path');
    expect(Path).toHaveLength(1);
  });
});
