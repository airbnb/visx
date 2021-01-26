import React, { useContext, useEffect } from 'react';
import { animated } from 'react-spring';
import { mount } from 'enzyme';
import {
  AnimatedBarGroup,
  BarGroup,
  BarSeries,
  DataContext,
  DataProvider,
  useEventEmitter,
} from '../../src';
import setupTooltipTest from '../mocks/setupTooltipTest';
import { XYCHART_EVENT_SOURCE } from '../../src/constants';

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

  it('should use colorAccessor if passed', () => {
    const wrapper = mount(
      <DataProvider {...providerProps}>
        <svg>
          <BarGroup>
            <BarSeries dataKey={series1.key} {...series1} />
            <BarSeries
              dataKey={series2.key}
              {...series2}
              colorAccessor={(_, i) => (i === 0 ? 'banana' : null)}
            />
          </BarGroup>
        </svg>
      </DataProvider>,
    );
    const rects = wrapper.find('rect');
    expect(rects.at(0).prop('fill')).not.toBe('banana');
    expect(rects.at(1).prop('fill')).not.toBe('banana');
    expect(rects.at(2).prop('fill')).toBe('banana');
    expect(rects.at(3).prop('fill')).not.toBe('banana');
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

  it('should invoke showTooltip/hideTooltip on pointermove/pointerout', () => {
    expect.assertions(2);

    const showTooltip = jest.fn();
    const hideTooltip = jest.fn();

    const EventEmitter = () => {
      const emit = useEventEmitter();
      const { yScale } = useContext(DataContext);

      useEffect(() => {
        // checking for yScale ensures stack data is registered and stacks are rendered
        if (emit && yScale) {
          // @ts-ignore not a React.MouseEvent
          emit('pointermove', new MouseEvent('pointermove'), XYCHART_EVENT_SOURCE);
          expect(showTooltip).toHaveBeenCalledTimes(2); // one per key

          // @ts-ignore not a React.MouseEvent
          emit('pointerout', new MouseEvent('pointerout'), XYCHART_EVENT_SOURCE);
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
