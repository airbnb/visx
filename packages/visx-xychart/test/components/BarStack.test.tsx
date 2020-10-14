import React, { useContext, useEffect } from 'react';
import { mount } from 'enzyme';
import { BarStack, BarSeries, DataProvider, DataContext, useEventEmitter } from '../../src';
import setupTooltipTest from '../mocks/setupTooltipTest.test';

const providerProps = {
  initialDimensions: { width: 100, height: 100 },
  xScale: { type: 'linear' },
  yScale: { type: 'linear' },
} as const;

const accessors = {
  xAccessor: (d: { x: number }) => d.x,
  yAccessor: (d: { y: number }) => d.y,
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

describe('<BarStack />', () => {
  it('should be defined', () => {
    expect(BarSeries).toBeDefined();
  });

  it('should render rects', () => {
    const wrapper = mount(
      <DataProvider {...providerProps}>
        <svg>
          <BarStack horizontal>
            <BarSeries dataKey={series1.key} {...series1} />
            <BarSeries dataKey={series2.key} {...series2} />
          </BarStack>
        </svg>
      </DataProvider>,
    );
    expect(wrapper.find('rect')).toHaveLength(4);
  });

  it('should update scale domain to include stack sums including negative values', () => {
    expect.hasAssertions();

    function Assertion() {
      const { yScale, dataRegistry } = useContext(DataContext);
      if (yScale && dataRegistry?.keys().length === 2) {
        expect(yScale.domain()).toEqual([-20, 10]);
      }
      return null;
    }

    mount(
      <DataProvider {...providerProps}>
        <svg>
          <BarStack>
            <BarSeries dataKey={series1.key} {...series1} />
            <BarSeries
              dataKey={series2.key}
              {...series2}
              data={[
                { x: 10, y: 5 },
                { x: 7, y: -20 },
              ]}
            />
          </BarStack>
        </svg>
        <Assertion />
      </DataProvider>,
    );
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
        <BarStack horizontal>
          <BarSeries dataKey={series1.key} {...series1} />
          <BarSeries dataKey={series2.key} {...series2} />
        </BarStack>
        <EventEmitter />
      </>,
      { showTooltip, hideTooltip },
    );
  });
});
