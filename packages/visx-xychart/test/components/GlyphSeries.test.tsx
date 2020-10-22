import React, { useContext, useEffect } from 'react';
import { animated } from 'react-spring';
import { mount } from 'enzyme';
import { AnimatedGlyphSeries, DataContext, GlyphSeries, useEventEmitter } from '../../src';
import getDataContext from '../mocks/getDataContext';
import setupTooltipTest from '../mocks/setupTooltipTest';

const series = { key: 'glyph', data: [{}, {}], xAccessor: () => 4, yAccessor: () => 7 };

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

  it('should invoke showTooltip/hideTooltip on mousemove/mouseout', () => {
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
          emit('mousemove', new MouseEvent('mousemove'));
          expect(showTooltip).toHaveBeenCalledTimes(1);

          // @ts-ignore not a React.MouseEvent
          emit('mouseout', new MouseEvent('mouseout'));
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
