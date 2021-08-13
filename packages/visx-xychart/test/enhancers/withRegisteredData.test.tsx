/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import withRegisteredData from '../../src/enhancers/withRegisteredData';
import getDataContext from '../mocks/getDataContext';
import { DataContext } from '../../src';

const series = {
  key: 'visx',
  xAccessor: () => 'x',
  yAccessor: () => 'y',
  data: [{}],
};

describe('withRegisteredData', () => {
  it('should be defined', () => {
    expect(withRegisteredData).toBeDefined();
  });

  it('should return a component', () => {
    const BaseComponent = () => <div />;
    const WrappedComponent = withRegisteredData(BaseComponent);
    expect(() => <WrappedComponent dataKey={series.key} {...series} />).not.toThrow();
  });

  it('should not render base component if scales or key is not in context', () => {
    const mockContextWithSeries = getDataContext(series);
    const BaseComponent = () => <div />;
    const WrappedComponent = withRegisteredData(BaseComponent);

    const { container: containerNoContext } = render(
      <DataContext.Provider value={{}}>
        <WrappedComponent dataKey={series.key} {...series} />
      </DataContext.Provider>,
    );
    const { container: containerCompleteContext } = render(
      <DataContext.Provider value={mockContextWithSeries}>
        <WrappedComponent dataKey={series.key} {...series} />
      </DataContext.Provider>,
    );

    expect(containerNoContext.querySelectorAll('div')).toHaveLength(0);
    expect(containerCompleteContext.querySelectorAll('div')).toHaveLength(1);
  });

  it('should pass data and accessors to BaseComponent from context not props', () => {
    expect.assertions(3);
    const mockContext = getDataContext(series);
    const BaseComponent = ({ data, xAccessor, yAccessor }: any) => {
      expect(data).toBe(series.data);
      expect(xAccessor).toBe(series.xAccessor);
      expect(yAccessor).toBe(series.yAccessor);
      return null;
    };
    const WrappedComponent = withRegisteredData(BaseComponent);

    render(
      <DataContext.Provider value={mockContext}>
        <WrappedComponent
          dataKey={series.key}
          {...series}
          data={[]}
          xAccessor={() => 3}
          yAccessor={() => 4}
        />
      </DataContext.Provider>,
    );
  });
});
