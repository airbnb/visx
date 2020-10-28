import React, { useEffect } from 'react';
import { animated } from 'react-spring';
import { mount } from 'enzyme';
import { AnimatedBarGroup, BarGroup, BarSeries, DataProvider, useEventEmitter } from '../../src';
import setupTooltipTest from '../mocks/setupTooltipTest';

const providerProps = {
  initialDimensions: { width: 100, height: 100 },
  xScale: { type: 'linear' },
  yScale: { type: 'linear' },
} as const;

const accessors = {
  xAccessor: (d: { x?: number }) => d.x,
  yAccessor: (d: { y?: number }) => d.y,
};

const series1 = {
  key: 'bar1',
  data: [
    { x: 10, y: 5 },
    { x: 7, y: 5 },
  ],
  ...accessors,
};

const series2 = {
  key: 'bar2',
  data: [
    { x: 10, y: 5 },
    { x: 7, y: 20 },
  ],
  ...accessors,
};

const seriesMissingData = {
  key: 'seriesMissingData',
  data: [{ y: 5 }, { x: 7 }, { x: 7, y: 20 }],
  ...accessors,
};

describe('<BarGroup />', () => {
  it('should be defined', () => {
    expect(BarSeries).toBeDefined();
  });

  it('should render rects', () => {
    const wrapper = mount(
      <DataProvider {...providerProps}>
        <svg>
          <BarGroup>
            <BarSeries dataKey={series1.key} {...series1} />
            <BarSeries dataKey={series2.key} {...series2} />
          </BarGroup>
        </svg>
      </DataProvider>,
    );
    expect(wrapper.find('rect')).toHaveLength(4);
  });

  it('should not render rects with invalid x or y', () => {
    const wrapper = mount(
      <DataProvider {...providerProps}>
        <svg>
          <BarGroup>
            <BarSeries dataKey={series1.key} {...series1} />
            <BarSeries dataKey={seriesMissingData.key} {...seriesMissingData} />
          </BarGroup>
        </svg>
      </DataProvider>,
    );
    expect(wrapper.find('rect')).toHaveLength(3);
  });

  it('should invoke showTooltip/hideTooltip on mousemove/mouseout', () => {
    expect.assertions(2);

    const showTooltip = jest.fn();
    const hideTooltip = jest.fn();

    const EventEmitter = () => {
      const emit = useEventEmitter();

      useEffect(() => {
        if (emit) {
          // @ts-ignore not a React.MouseEvent
          emit('mousemove', new MouseEvent('mousemove'));
          expect(showTooltip).toHaveBeenCalledTimes(2); // one per key

          // @ts-ignore not a React.MouseEvent
          emit('mouseout', new MouseEvent('mouseout'));
          expect(showTooltip).toHaveBeenCalled();
        }
      });

      return null;
    };

    setupTooltipTest(
      <>
        <BarGroup>
          <BarSeries dataKey={series1.key} {...series1} />
          <BarSeries dataKey={series2.key} {...series2} />
        </BarGroup>
        <EventEmitter />
      </>,
      { showTooltip, hideTooltip },
    );
  });
});

describe('<AnimatedBarGroup />', () => {
  it('should be defined', () => {
    expect(AnimatedBarGroup).toBeDefined();
  });
  it('should render an animated.rect', () => {
    const wrapper = mount(
      <DataProvider {...providerProps}>
        <svg>
          <AnimatedBarGroup>
            <BarSeries dataKey={series1.key} {...series1} />
            <BarSeries dataKey={series2.key} {...series2} />
          </AnimatedBarGroup>
        </svg>
      </DataProvider>,
    );
    expect(wrapper.find(animated.rect)).toHaveLength(4);
  });
});
