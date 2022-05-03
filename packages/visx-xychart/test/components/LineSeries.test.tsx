import React, { useContext, useEffect } from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AnimatedLineSeries, DataContext, LineSeries, useEventEmitter } from '../../src';
import getDataContext from '../mocks/getDataContext';
import setupTooltipTest from '../mocks/setupTooltipTest';
import { XYCHART_EVENT_SOURCE } from '../../src/constants';

const series = { key: 'line', data: [{}], xAccessor: () => 4, yAccessor: () => 7 };

describe('<LineSeries />', () => {
  it('should be defined', () => {
    expect(LineSeries).toBeDefined();
  });

  it('should render a LinePath', () => {
    const { container } = render(
      <DataContext.Provider value={getDataContext(series)}>
        <svg>
          <LineSeries dataKey={series.key} {...series} />
        </svg>
      </DataContext.Provider>,
    );
    expect(container.querySelectorAll('path')).toHaveLength(1);
  });

  it('should set strokeLinecap="round" to make datum surrounded by nulls visible', () => {
    const { container } = render(
      <DataContext.Provider value={getDataContext(series)}>
        <svg>
          <LineSeries dataKey={series.key} {...series} />
        </svg>
      </DataContext.Provider>,
    );
    expect(container.querySelector('path')).toHaveAttribute('stroke-linecap', 'round');
  });

  it('should render Glyphs if focus/blur handlers are set', () => {
    const { container } = render(
      <DataContext.Provider value={getDataContext(series)}>
        <svg>
          <LineSeries dataKey={series.key} {...series} onFocus={() => {}} />
        </svg>
      </DataContext.Provider>,
    );
    expect(container.querySelectorAll('circle')).toHaveLength(series.data.length);
  });

  it('should invoke showTooltip/hideTooltip on pointermove/pointerout', () => {
    expect.assertions(2);

    const showTooltip = jest.fn();
    const hideTooltip = jest.fn();

    const ConditionalEventEmitter = () => {
      const { dataRegistry } = useContext(DataContext);
      // LineSeries won't render until its data is registered
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
        <LineSeries dataKey={series.key} {...series} />
        <ConditionalEventEmitter />
      </>,
      { showTooltip, hideTooltip },
    );
  });

  it('should use colorAccessor if passed', () => {
    const { container } = render(
      <DataContext.Provider value={getDataContext(series)}>
        <svg>
          <LineSeries dataKey={series.key} {...series} colorAccessor={(_) => 'banana'} />
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
      <DataContext.Provider value={getDataContext(series)}>
        <svg>
          <AnimatedLineSeries dataKey={series.key} {...series} />
        </svg>
      </DataContext.Provider>,
    );
    expect(container.querySelectorAll('path')).toHaveLength(1);
  });
});
