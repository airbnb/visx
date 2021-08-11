import React, { useContext, useEffect } from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AnimatedGlyphSeries, DataContext, GlyphSeries, useEventEmitter } from '../../src';
import getDataContext from '../mocks/getDataContext';
import setupTooltipTest from '../mocks/setupTooltipTest';
import { XYCHART_EVENT_SOURCE } from '../../src/constants';

const series = { key: 'glyph', data: [{}, {}], xAccessor: () => 4, yAccessor: () => 7 };
const seriesMissingData = {
  key: 'barMissingData',
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
      <DataContext.Provider value={getDataContext(series)}>
        <svg>
          <GlyphSeries dataKey={series.key} {...series} />
        </svg>
      </DataContext.Provider>,
    );
    expect(container.querySelectorAll('circle')).toHaveLength(series.data.length);
  });

  it('should use colorAccessor if passed', () => {
    const { container } = render(
      <DataContext.Provider value={getDataContext(series)}>
        <svg>
          <GlyphSeries
            dataKey={series.key}
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
      <DataContext.Provider value={getDataContext(seriesMissingData)}>
        <svg>
          <GlyphSeries dataKey={seriesMissingData.key} {...seriesMissingData} />
        </svg>
      </DataContext.Provider>,
    );
    expect(container.querySelectorAll('circle')).toHaveLength(1);
  });

  it('should render a custom Glyph for each Datum', () => {
    const customRenderGlyph = () => <rect className="custom-glyph" />;
    const { container } = render(
      <DataContext.Provider value={getDataContext(series)}>
        <svg>
          <GlyphSeries dataKey={series.key} {...series} renderGlyph={customRenderGlyph} />
        </svg>
      </DataContext.Provider>,
    );
    expect(container.querySelectorAll('.custom-glyph')).toHaveLength(series.data.length);
  });

  it('should invoke showTooltip/hideTooltip on pointermove/pointerout', () => {
    expect.assertions(2);

    const showTooltip = jest.fn();
    const hideTooltip = jest.fn();

    const ConditionalEventEmitter = () => {
      const { dataRegistry } = useContext(DataContext);
      // GlyphSeries won't render until its data is registered
      // wait for that to emit the events
      return dataRegistry?.get(series.key) ? <EventEmitter /> : null;
    };

    const EventEmitter = () => {
      const emit = useEventEmitter();

      useEffect(() => {
        if (emit) {
          // @ts-ignore not a React.MouseEvent
          emit('pointermove', new MouseEvent('pointermove'), XYCHART_EVENT_SOURCE);
          expect(showTooltip).toHaveBeenCalledTimes(1);

          // @ts-ignore not a React.MouseEvent
          emit('pointerout', new MouseEvent('pointerout'), XYCHART_EVENT_SOURCE);
          expect(showTooltip).toHaveBeenCalledTimes(1);
        }
      });

      return null;
    };

    setupTooltipTest(
      <>
        <GlyphSeries dataKey={series.key} {...series} />
        <ConditionalEventEmitter />
      </>,
      { showTooltip, hideTooltip },
    );
  });
});

describe('<AnimatedGlyphSeries />', () => {
  it('should be defined', () => {
    expect(AnimatedGlyphSeries).toBeDefined();
  });
  it('should render an animated.g for each datum', () => {
    const { container } = render(
      <DataContext.Provider value={getDataContext(series)}>
        <svg>
          <AnimatedGlyphSeries dataKey={series.key} {...series} />
        </svg>
      </DataContext.Provider>,
    );
    expect(container.querySelectorAll('g')).toHaveLength(series.data.length);
  });
});
