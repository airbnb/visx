import React, { useContext, useEffect } from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  AreaStack,
  AreaSeries,
  DataProvider,
  DataContext,
  useEventEmitter,
  AnimatedAreaStack,
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
  key: 'area1',
  data: [
    { x: 10, y: 5 },
    { x: 7, y: 5 },
  ],
  ...accessors,
};

const series2 = {
  key: 'area2',
  data: [
    { x: 10, y: 5 },
    { x: 7, y: 20 },
  ],
  ...accessors,
};

describe('<AreaStack />', () => {
  it('should be defined', () => {
    expect(AreaSeries).toBeDefined();
  });

  it('should render Areas', () => {
    const { container } = render(
      <DataProvider {...providerProps}>
        <svg>
          <AreaStack>
            <AreaSeries dataKey={series1.key} {...series1} />
            <AreaSeries dataKey={series2.key} {...series2} />
          </AreaStack>
        </svg>
      </DataProvider>,
    );
    const Areas = container.querySelectorAll('.visx-area');
    expect(Areas).toHaveLength(2);
  });

  it('should render LinePaths if renderLine=true', () => {
    const { container } = render(
      <DataProvider {...providerProps}>
        <svg>
          <AreaStack renderLine>
            <AreaSeries dataKey={series1.key} {...series1} />
            <AreaSeries dataKey={series2.key} {...series2} />
          </AreaStack>
        </svg>
      </DataProvider>,
    );
    const LinePaths = container.querySelectorAll('.visx-line');
    expect(LinePaths).toHaveLength(2);
  });

  it('should render Glyphs if focus/blur handlers are set', () => {
    const { container } = render(
      <DataProvider {...providerProps}>
        <svg>
          <AreaStack onFocus={() => {}}>
            <AreaSeries dataKey={series1.key} {...series1} />
          </AreaStack>
        </svg>
      </DataProvider>,
    );
    const Circles = container.querySelectorAll('circle');
    expect(Circles).toHaveLength(series1.data.length);
  });

  it('should update scale domain to include stack sums including negative values', () => {
    expect.hasAssertions();

    function Assertion() {
      const { yScale } = useContext(DataContext);
      // eslint-disable-next-line jest/no-if
      if (yScale) {
        expect(yScale.domain()).toEqual([-20, 10]);
      }
      return null;
    }

    render(
      <DataProvider {...providerProps}>
        <svg>
          <AreaStack>
            <AreaSeries dataKey={series1.key} {...series1} />
            <AreaSeries
              dataKey={series2.key}
              {...series2}
              data={[
                { x: 10, y: 5 },
                { x: 7, y: -20 },
              ]}
            />
          </AreaStack>
        </svg>
        <Assertion />
      </DataProvider>,
    );
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
        <AreaStack>
          <AreaSeries dataKey={series1.key} {...series1} />
          <AreaSeries dataKey={series2.key} {...series2} />
        </AreaStack>
        <EventEmitter />
      </>,
      { showTooltip, hideTooltip },
    );
  });
});

describe('<AnimatedAreaStack />', () => {
  it('should be defined', () => {
    expect(AnimatedAreaStack).toBeDefined();
  });
  it('should render an animated.path', () => {
    const { container } = render(
      <DataProvider {...providerProps}>
        <svg>
          <AnimatedAreaStack renderLine={false}>
            <AreaSeries dataKey={series1.key} {...series1} />
            <AreaSeries dataKey={series2.key} {...series2} />
          </AnimatedAreaStack>
        </svg>
      </DataProvider>,
    );
    const Circles = container.querySelectorAll('path');
    expect(Circles).toHaveLength(2);
  });
});
