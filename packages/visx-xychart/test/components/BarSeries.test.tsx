import React, { useContext, useEffect } from 'react';
import { mount } from 'enzyme';
import { DataContext, BarSeries, useEventEmitter } from '../../src';
import getDataContext from '../mocks/getDataContext';
import setupTooltipTest from '../mocks/setupTooltipTest';

const series = { key: 'bar', data: [{}, {}], xAccessor: () => 0, yAccessor: () => 10 };

describe('<BarSeries />', () => {
  it('should be defined', () => {
    expect(BarSeries).toBeDefined();
  });

  it('should render rects', () => {
    const wrapper = mount(
      <DataContext.Provider value={getDataContext(series)}>
        <svg>
          <BarSeries dataKey={series.key} {...series} />
        </svg>
      </DataContext.Provider>,
    );
    expect(wrapper.find('rect')).toHaveLength(2);
  });

  it('should invoke showTooltip/hideTooltip on mousemove/mouseout', () => {
    expect.assertions(2);

    const showTooltip = jest.fn();
    const hideTooltip = jest.fn();

    const ConditionalEventEmitter = () => {
      const { dataRegistry } = useContext(DataContext);
      // BarSeries won't render until its data is registered
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
        <BarSeries dataKey={series.key} {...series} />
        <ConditionalEventEmitter />
      </>,
      { showTooltip, hideTooltip },
    );
  });
});
