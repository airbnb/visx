import React, { useContext, useEffect } from 'react';
import { mount } from 'enzyme';
import { AreaSeries, DataContext, DataProvider } from '../../src';
import useStackedData from '../../src/hooks/useStackedData';

const seriesAProps = {
  dataKey: 'a',
  data: [
    { x: 'stack-a', y: 3 },
    { x: 'stack-b', y: 7 },
    { x: 'stack-c', y: -2 },
  ],
  xAccessor: (d: { x: string }) => d.x,
  yAccessor: (d: { y: number }) => d.y,
};

const seriesBProps = {
  ...seriesAProps,
  dataKey: 'b',
  data: [
    { x: 'stack-a', y: 0 },
    { x: 'stack-b', y: 7 },
    { x: 'stack-c', y: 10 },
  ],
};

function setup(children: React.ReactElement | React.ReactElement[]) {
  return mount(
    <DataProvider
      initialDimensions={{ width: 10, height: 10 }}
      xScale={{ type: 'band' }}
      yScale={{ type: 'linear' }}
    >
      {children}
    </DataProvider>,
  );
}

describe('useStackedData', () => {
  it('should be defined', () => {
    expect(useStackedData).toBeDefined();
  });

  it('should return a data stack', () => {
    expect.hasAssertions();

    const Consumer = ({ children }: { children: React.ReactElement | React.ReactElement[] }) => {
      const { stackedData } = useStackedData({ children });
      // stackedData has arrays with data properties set by d3 which jest doesn't like
      expect(stackedData.map((series) => series.map(([min, max]) => [min, max]))).toMatchObject([
        [
          // series a
          [0, 3],
          [0, 7],
          [-2, 0],
        ],
        [
          // series b
          [0, 0],
          [7, 14],
          [0, 10],
        ],
      ]);
      return null;
    };

    setup(
      <Consumer>
        <AreaSeries {...seriesAProps} />
        <AreaSeries {...seriesBProps} />
      </Consumer>,
    );
  });

  it('compute a comprehensive domain based on the total stack value', () => {
    expect.hasAssertions();

    const Consumer = ({ children }: { children: React.ReactElement | React.ReactElement[] }) => {
      useStackedData({ children });
      const { dataRegistry, yScale } = useContext(DataContext);

      useEffect(() => {
        if (dataRegistry?.get('a') && yScale) {
          expect(yScale.domain()).toEqual([-2, 14]);
        }
      }, [dataRegistry, yScale]);
      return null;
    };

    setup(
      <Consumer>
        <AreaSeries {...seriesAProps} />
        <AreaSeries {...seriesBProps} />
      </Consumer>,
    );
  });
});
