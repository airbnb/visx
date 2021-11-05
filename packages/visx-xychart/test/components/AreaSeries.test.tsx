import React, { useContext, useEffect } from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
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
    const { container } = render(
      <DataContext.Provider value={getDataContext(series)}>
        <svg>
          <AreaSeries dataKey={series.key} {...series} />
        </svg>
      </DataContext.Provider>,
    );
    const Path = container.querySelector('path');
    expect(Path).toBeInTheDocument();
  });

  it('should set strokeLinecap="round" to make datum surrounded by nulls visible', () => {
    const { container } = render(
      <DataContext.Provider value={getDataContext(series)}>
        <svg>
          <AreaSeries dataKey={series.key} renderLine={false} {...series} />
        </svg>
      </DataContext.Provider>,
    );
    const Path = container.querySelector('path');
    expect(Path).toBeInTheDocument();
    expect(Path).toHaveAttribute('stroke-linecap', 'round');
  });

  it('should use x/y0Accessors in an Area', () => {
    const y0Accessor = jest.fn(() => 3);
    const { container } = render(
      <DataContext.Provider value={getDataContext(series)}>
        <svg>
          <AreaSeries dataKey={series.key} {...series} y0Accessor={y0Accessor} />
        </svg>
      </DataContext.Provider>,
    );

    const Path = container.querySelector('path');
    expect(Path).toBeInTheDocument();
    expect(y0Accessor).toHaveBeenCalled();
  });

  it('should render a LinePath is renderLine=true', () => {
    const { container } = render(
      <DataContext.Provider value={getDataContext(series)}>
        <svg>
          <AreaSeries renderLine dataKey={series.key} {...series} />
        </svg>
      </DataContext.Provider>,
    );

    const LinePath = container.querySelector('.visx-line');
    expect(LinePath).toBeInTheDocument();
  });

  it('should render Glyphs if focus/blur handlers are set', () => {
    const { container } = render(
      <DataContext.Provider value={getDataContext(series)}>
        <svg>
          <AreaSeries dataKey={series.key} {...series} onFocus={() => {}} />
        </svg>
      </DataContext.Provider>,
    );

    const Circles = container.querySelectorAll('circle');
    expect(Circles).toHaveLength(series.data.length);
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
    const { container } = render(
      <DataContext.Provider value={getDataContext(series)}>
        <svg>
          <AnimatedAreaSeries renderLine={false} dataKey={series.key} {...series} />
        </svg>
      </DataContext.Provider>,
    );
    const Path = container.querySelectorAll('path');
    expect(Path).toHaveLength(1);
  });
});
