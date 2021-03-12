import React, { useContext, useEffect } from 'react';
import { animated } from 'react-spring';
import { mount } from 'enzyme';
import { Area, LinePath } from '@visx/shape';
import { AnimatedAreaSeries, DataContext, AreaSeries, useEventEmitter } from '../../src';
import getDataContext from '../mocks/getDataContext';
import setupTooltipTest from '../mocks/setupTooltipTest';
import { XYCHART_EVENT_SOURCE } from '../../src/constants';

const series = { key: 'line', data: [{}], xAccessor: () => 4, yAccessor: () => 7 };

describe('<AreaSeries />', () => {
  it('should be defined', () => {
    expect(AreaSeries).toBeDefined();
  });

  it('should render an Area', () => {
    const wrapper = mount(
      <DataContext.Provider value={getDataContext(series)}>
        <svg>
          <AreaSeries dataKey={series.key} {...series} />
        </svg>
      </DataContext.Provider>,
    );
    // @ts-ignore produces a union type that is too complex to represent.ts(2590)
    expect(wrapper.find(Area)).toHaveLength(1);
  });

  it('should set strokeLinecap="round" to make datum surrounded by nulls visible', () => {
    const wrapper = mount(
      <DataContext.Provider value={getDataContext(series)}>
        <svg>
          <AreaSeries dataKey={series.key} renderLine={false} {...series} />
        </svg>
      </DataContext.Provider>,
    );
    expect(wrapper.find('path').prop('strokeLinecap')).toBe('round');
  });

  it('should use x/y0Accessors an Area', () => {
    const y0Accessor = jest.fn(() => 3);
    const wrapper = mount(
      <DataContext.Provider value={getDataContext(series)}>
        <svg>
          <AreaSeries dataKey={series.key} {...series} y0Accessor={y0Accessor} />
        </svg>
      </DataContext.Provider>,
    );

    const callCount = y0Accessor.mock.calls.length;
    expect(y0Accessor).toHaveBeenCalled();
    const y0Area = wrapper.find(Area).prop('y0') as Function;
    y0Area();
    expect(y0Accessor).toHaveBeenCalledTimes(callCount + 1);
  });

  it('should render a LinePath is renderLine=true', () => {
    const wrapper = mount(
      <DataContext.Provider value={getDataContext(series)}>
        <svg>
          <AreaSeries renderLine dataKey={series.key} {...series} />
        </svg>
      </DataContext.Provider>,
    );
    // @ts-ignore produces a union type that is too complex to represent.ts(2590)
    expect(wrapper.find(LinePath)).toHaveLength(1);
  });

  it('should render Glyphs if focus/blur handlers are set', () => {
    const wrapper = mount(
      <DataContext.Provider value={getDataContext(series)}>
        <svg>
          <AreaSeries dataKey={series.key} {...series} onFocus={() => {}} />
        </svg>
      </DataContext.Provider>,
    );
    expect(wrapper.find('circle')).toHaveLength(series.data.length);
  });

  it('should invoke showTooltip/hideTooltip on pointermove/pointerout', () => {
    expect.assertions(2);

    const showTooltip = jest.fn();
    const hideTooltip = jest.fn();

    const ConditionalEventEmitter = () => {
      const { dataRegistry } = useContext(DataContext);
      // AreaSeries won't render until its data is registered
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
        <AreaSeries dataKey={series.key} {...series} />
        <ConditionalEventEmitter />
      </>,
      { showTooltip, hideTooltip },
    );
  });
});

describe('<AnimatedAreaSeries />', () => {
  it('should be defined', () => {
    expect(AnimatedAreaSeries).toBeDefined();
  });
  it('should render an animated.path', () => {
    const wrapper = mount(
      <DataContext.Provider value={getDataContext(series)}>
        <svg>
          <AnimatedAreaSeries renderLine={false} dataKey={series.key} {...series} />
        </svg>
      </DataContext.Provider>,
    );
    expect(wrapper.find(animated.path)).toHaveLength(1);
  });
});
