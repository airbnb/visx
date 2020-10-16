import React, { useContext, useEffect } from 'react';
import { animated } from 'react-spring';
import { mount } from 'enzyme';
import { Area, LinePath } from '@visx/shape';
import { AnimatedAreaSeries, DataContext, AreaSeries, useEventEmitter } from '../../src';
import getDataContext from '../mocks/getDataContext';
import setupTooltipTest from '../mocks/setupTooltipTest';

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

  it('should invoke showTooltip/hideTooltip on mousemove/mouseout', () => {
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
