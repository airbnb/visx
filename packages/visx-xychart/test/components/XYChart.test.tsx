import React, { useContext } from 'react';
import { mount } from 'enzyme';
import ParentSize from '@visx/responsive/lib/components/ParentSize';
import {
  XYChart,
  DataContext,
  DataProvider,
  EventEmitterProvider,
  TooltipProvider,
} from '../../src';

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

  it('should render a ParentSize if width or height is not provided', () => {
    const wrapper = mount(
      <XYChart {...chartProps} width={undefined}>
        <rect />
      </XYChart>,
    );
    expect(wrapper.find(ParentSize)).toHaveLength(1);
  });

  it('should render DataProvider, EventEmitterProvider, and TooltipProvider if not available in context', () => {
    const wrapper = mount(
      <XYChart {...chartProps}>
        <rect />
      </XYChart>,
    );
    expect(wrapper.find(DataProvider)).toHaveLength(1);
    expect(wrapper.find(EventEmitterProvider)).toHaveLength(1);
    expect(wrapper.find(TooltipProvider)).toHaveLength(1);
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
    const wrapper = mount(
      <XYChart {...chartProps}>
        <rect />
      </XYChart>,
    );
    expect(wrapper.find('svg')).toHaveLength(1);
  });

  it('should render children', () => {
    const wrapper = mount(
      <XYChart {...chartProps}>
        <rect id="xychart-child" />
      </XYChart>,
    );
    expect(wrapper.find('#xychart-child')).toHaveLength(1);
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

    mount(
      <DataProvider xScale={{ type: 'linear' }} yScale={{ type: 'linear' }}>
        <XYChart width={width} height={height}>
          <DataConsumer />
        </XYChart>
      </DataProvider>,
    );
  });
});
