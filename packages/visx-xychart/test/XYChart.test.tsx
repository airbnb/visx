import React, { useContext } from 'react';
import { mount, shallow } from 'enzyme';
import ParentSize from '@visx/responsive/lib/components/ParentSize';
import { XYChart, DataContext, DataProvider, EventEmitterProvider, TooltipProvider } from '../src';

describe('<XYChart />', () => {
  it('should be defined', () => {
    expect(XYChart).toBeDefined();
  });

  it('should render an svg', () => {
    const wrapper = mount(
      <EventEmitterProvider>
        <TooltipProvider>
          <XYChart width={300} height={300}>
            <rect />
          </XYChart>
        </TooltipProvider>
      </EventEmitterProvider>,
    );
    expect(wrapper.find('svg')).toHaveLength(1);
  });

  it('should render children', () => {
    const wrapper = shallow(
      <XYChart width={300} height={300}>
        <rect id="xychart-child" />
      </XYChart>,
    );
    expect(wrapper.find('#xychart-child')).toHaveLength(1);
  });

  it('should render a ParentSize if width or height is not provided', () => {
    const wrapper = shallow(
      <XYChart height={300}>
        <rect />
      </XYChart>,
    );
    expect(wrapper.find(ParentSize)).toHaveLength(1);
  });

  it('should update the registry dimensions', () => {
    expect.assertions(2);
    const width = 123;
    const height = 456;

    const DataConsumer = () => {
      const data = useContext(DataContext);
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
