import React, { useContext, useEffect } from 'react';
import { animated } from 'react-spring';
import { mount } from 'enzyme';
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
    const wrapper = mount(
      <DataContext.Provider value={getDataContext(series)}>
        <svg>
          <GlyphSeries dataKey={series.key} {...series} />
        </svg>
      </DataContext.Provider>,
    );
    expect(wrapper.find('circle')).toHaveLength(series.data.length);
  });

  it('should use colorAccessor if passed', () => {
    const wrapper = mount(
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
    const circles = wrapper.find('circle');
    expect(circles.at(0).prop('fill')).toBe('banana');
    expect(circles.at(1).prop('fill')).not.toBe('banana');
  });

  it('should not render Glyphs if x or y is invalid', () => {
    const wrapper = mount(
      <DataContext.Provider value={getDataContext(seriesMissingData)}>
        <svg>
          <GlyphSeries dataKey={seriesMissingData.key} {...seriesMissingData} />
        </svg>
      </DataContext.Provider>,
    );
    expect(wrapper.find('circle')).toHaveLength(1);
  });

  it('should render a custom Glyph for each Datum', () => {
    const customRenderGlyph = () => <rect className="custom-glyph" />;
    const wrapper = mount(
      <DataContext.Provider value={getDataContext(series)}>
        <svg>
          <GlyphSeries dataKey={series.key} {...series} renderGlyph={customRenderGlyph} />
        </svg>
      </DataContext.Provider>,
    );
    expect(wrapper.find('.custom-glyph')).toHaveLength(series.data.length);
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
    const wrapper = mount(
      <DataContext.Provider value={getDataContext(series)}>
        <svg>
          <AnimatedGlyphSeries dataKey={series.key} {...series} />
        </svg>
      </DataContext.Provider>,
    );
    expect(wrapper.find(animated.g)).toHaveLength(series.data.length);
  });
});
