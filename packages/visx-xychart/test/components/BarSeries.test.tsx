import React, { useContext, useEffect } from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DataContext, AnimatedBarSeries, BarSeries, useEventEmitter } from '../../src';
import getDataContext from '../mocks/getDataContext';
import setupTooltipTest from '../mocks/setupTooltipTest';
import { XYCHART_EVENT_SOURCE } from '../../src/constants';

const series = { key: 'bar', data: [{}, {}], xAccessor: () => 0, yAccessor: () => 10 };
const seriesMissingData = {
  key: 'barMissingData',
  data: [{ x: 1 }, { x: 0, y: 3 }, { y: 2 }],
  xAccessor: (d: { x?: number }) => d.x,
  yAccessor: (d: { y?: number }) => d.y,
};

describe('<BarSeries />', () => {
  it('should be defined', () => {
    expect(BarSeries).toBeDefined();
  });

  it('should render rects', () => {
    const { container } = render(
      <DataContext.Provider value={getDataContext(series)}>
        <svg>
          <BarSeries dataKey={series.key} {...series} />
        </svg>
      </DataContext.Provider>,
    );
    expect(container.querySelectorAll('rect')).toHaveLength(2);
  });

  it('should render rounded rects if radius is set', () => {
    const { container } = render(
      <DataContext.Provider value={getDataContext(series)}>
        <svg>
          <BarSeries dataKey={series.key} radiusAll radius={4} {...series} />
        </svg>
      </DataContext.Provider>,
    );
    expect(container.querySelectorAll('path')).toHaveLength(2);
  });

  it('should use colorAccessor if passed', () => {
    const { container } = render(
      <DataContext.Provider value={getDataContext(series)}>
        <svg>
          <BarSeries
            dataKey={series.key}
            {...series}
            colorAccessor={(_, i) => (i === 0 ? 'banana' : null)}
          />
        </svg>
      </DataContext.Provider>,
    );
    const rects = container.querySelectorAll('rect');
    expect(rects[0]).toHaveAttribute('fill', 'banana');
    expect(rects[1]).not.toHaveAttribute('fill', 'banana');
  });

  it('should not render rects if x or y is invalid', () => {
    const { container } = render(
      <DataContext.Provider value={getDataContext(seriesMissingData)}>
        <svg>
          <BarSeries dataKey={seriesMissingData.key} {...seriesMissingData} />
        </svg>
      </DataContext.Provider>,
    );
    expect(container.querySelectorAll('rect')).toHaveLength(1);
  });

  it('should invoke showTooltip/hideTooltip on pointermove/pointerout', () => {
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
        <BarSeries dataKey={series.key} {...series} />
        <ConditionalEventEmitter />
      </>,
      { showTooltip, hideTooltip },
    );
  });
});

describe('<AnimatedBarSeries />', () => {
  it('should be defined', () => {
    expect(AnimatedBarSeries).toBeDefined();
  });
  it('should render an animated.rect', () => {
    const { container } = render(
      <DataContext.Provider value={getDataContext(series)}>
        <svg>
          <AnimatedBarSeries dataKey={series.key} {...series} />
        </svg>
      </DataContext.Provider>,
    );
    expect(container.querySelectorAll('rect')).toHaveLength(series.data.length);
  });
});
