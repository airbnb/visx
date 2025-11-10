import { vi } from 'vitest';
import React, { useContext, useEffect } from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AnimatedGlyphSeries, DataContext, GlyphSeries, useEventEmitter } from '../../src';
import getDataContext from '../mocks/getDataContext';
import setupTooltipTest from '../mocks/setupTooltipTest';
import { XYCHART_EVENT_SOURCE } from '../../src/constants';

const series = { data: [{}, {}], xAccessor: () => 4, yAccessor: () => 7 };
const seriesMissingData = {
  data: [{ x: 1 }, { x: 0, y: 3 }, { y: 2 }],
  xAccessor: (d: { x?: number }) => d.x,
  yAccessor: (d: { y?: number }) => d.y,
};

describe('<GlyphSeries />', () => {
  it('should be defined', () => {
    expect(GlyphSeries).toBeDefined();
  });

  it('should render a DefaultGlyph for each Datum', () => {
    const { container } = render(
      <DataContext.Provider value={getDataContext({ key: 'glyph', ...series })}>
        <svg>
          <GlyphSeries dataKey={'glyph'} {...series} />
        </svg>
      </DataContext.Provider>,
    );
    expect(container.querySelectorAll('circle')).toHaveLength(series.data.length);
  });

  it('should use colorAccessor if passed', () => {
    const { container } = render(
      <DataContext.Provider value={getDataContext({ key: 'glyph', ...series })}>
        <svg>
          <GlyphSeries
            dataKey={'glyph'}
            {...series}
            colorAccessor={(_, i) => (i === 0 ? 'banana' : null)}
          />
        </svg>
      </DataContext.Provider>,
    );
    const circles = container.querySelectorAll('circle');
    expect(circles[0]).toHaveAttribute('fill', 'banana');
    expect(circles[1]).not.toHaveAttribute('fill', 'banana');
  });

  it('should not render Glyphs if x or y is invalid', () => {
    const { container } = render(
      <DataContext.Provider value={getDataContext({ key: 'barMissingData', ...seriesMissingData })}>
        <svg>
          <GlyphSeries dataKey={'barMissingData'} {...seriesMissingData} />
        </svg>
      </DataContext.Provider>,
    );
    expect(container.querySelectorAll('circle')).toHaveLength(1);
  });

  it('should render a custom Glyph for each Datum', () => {
    const customRenderGlyph = () => <rect className="custom-glyph" />;
    const { container } = render(
      <DataContext.Provider value={getDataContext({ key: 'glyph', ...series })}>
        <svg>
          <GlyphSeries dataKey={'glyph'} {...series} renderGlyph={customRenderGlyph} />
        </svg>
      </DataContext.Provider>,
    );
    expect(container.querySelectorAll('.custom-glyph')).toHaveLength(series.data.length);
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
      // GlyphSeries won't render until its data is registered
      // wait for that to emit the events
      return dataRegistry?.get('glyph') ? <EventEmitter /> : null;
    };

    setupTooltipTest(
      <>
        <GlyphSeries dataKey={'glyph'} {...series} />
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

describe('<AnimatedGlyphSeries />', () => {
  it('should be defined', () => {
    expect(AnimatedGlyphSeries).toBeDefined();
  });
  it('should render an animated.g for each datum', () => {
    const { container } = render(
      <DataContext.Provider value={getDataContext({ key: 'glyph', ...series })}>
        <svg>
          <AnimatedGlyphSeries dataKey={'glyph'} {...series} />
        </svg>
      </DataContext.Provider>,
    );
    expect(container.querySelectorAll('g')).toHaveLength(series.data.length);
  });
});
