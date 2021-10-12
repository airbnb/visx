import React, { useContext } from 'react';
import { mount } from 'enzyme';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { XYChart, DataProvider, DataContext } from '../../src';

const chartProps = {
  xScale: { type: 'linear' },
  yScale: { type: 'linear' },
  width: 100,
  height: 100,
} as const;

describe('<XYChart />', () => {
  it('should be defined', () => {
    expect(XYChart).toBeDefined();
  });

  it('should render with parent size if width or height is not provided', () => {
    const { getByTestId } = render(
      <div style={{ width: '200px', height: '200px' }} data-testid="wrapper">
        <XYChart {...chartProps} width={undefined} data-testid="rect">
          <rect />
        </XYChart>
      </div>,
    );

    // the XYChart should auto-resize to it's parent size
    const Wrapper = getByTestId('wrapper');
    expect(Wrapper.firstChild).toHaveStyle('width: 100%; height: 100%');
  });

  it('should warn if DataProvider is not available and no x- or yScale config is passed', () => {
    expect(() =>
      mount(
        <XYChart>
          <rect />
        </XYChart>,
      ),
    ).toThrow();
  });

  it('should render an svg', () => {
    const { container } = render(
      <XYChart {...chartProps}>
        <rect />
      </XYChart>,
    );
    const SVGElement = container.querySelector('svg');
    expect(SVGElement).toBeDefined();
  });

  it('should render children', () => {
    const { container } = render(
      <XYChart {...chartProps}>
        <rect id="xychart-child" />
      </XYChart>,
    );
    const XYChartChild = container.querySelector('#xychart-child');
    expect(XYChartChild).toBeDefined();
  });

  it('should update the registry dimensions', () => {
    expect.assertions(2);
    const width = 123;
    const height = 456;

    const DataConsumer = () => {
      const data = useContext(DataContext);
      // eslint-disable-next-line jest/no-if
      if (data.width && data.height) {
        expect(data.width).toBe(width);
        expect(data.height).toBe(height);
      }
      return null;
    };

    render(
      <DataProvider xScale={{ type: 'linear' }} yScale={{ type: 'linear' }}>
        <XYChart width={width} height={height}>
          <DataConsumer />
        </XYChart>
      </DataProvider>,
    );
  });
});
