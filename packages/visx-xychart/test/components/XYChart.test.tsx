/**
 * LLM-GENERATED REFACTOR
 *
 * This file was migrated from Enzyme to RTL using generative AI.
 * To make the migration as clean as possible, the LLM was instructed to
 * use testing patterns similar to Enzyme.
 *
 * If you are making changes to this file, please consider refactoring
 * to more idiomatic RTL (and then removing this banner!).
 */
import React, { useContext } from 'react';
import { mount } from 'enzyme';
import { ResizeObserver } from '@juggle/resize-observer';
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
  let initialResizeObserver: typeof ResizeObserver;
  beforeAll(() => {
    // don't worry about passing it via context
    initialResizeObserver = window.ResizeObserver;
    window.ResizeObserver = ResizeObserver;
  });

  afterAll(() => {
    window.ResizeObserver = initialResizeObserver;
  });

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
// MIGRATION STATUS: {"eslint":"pending","jest":{"passed":6,"failed":0,"total":6,"skipped":0,"successRate":100},"tsc":"pending","enyzme":"pending"}
