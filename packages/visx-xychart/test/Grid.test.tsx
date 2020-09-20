import * as React from 'react';
import { mount } from 'enzyme';
import VxAnimatedGridRows from '@visx/react-spring/lib/grid/AnimatedGridRows';
import VxAnimatedGridColumns from '@visx/react-spring/lib/grid/AnimatedGridColumns';
import VxGridRows from '@visx/grid/lib/grids/GridRows';
import VxGridColumns from '@visx/grid/lib/grids/GridColumns';
import { scaleLinear } from '@visx/scale';
import { Grid, AnimatedGrid, DataContext } from '../src';

const mockContext = {
  xScale: scaleLinear({ domain: [0, 10], range: [0, 10] }),
  yScale: scaleLinear({ domain: [0, 10], range: [0, 10] }),
  innerWidth: 10,
  innerHeight: 10,
};

describe('<Grid />', () => {
  it('should be defined', () => {
    expect(Grid).toBeDefined();
  });
  it('should render VxGridRows if rows=true', () => {
    const wrapper = mount(
      // @ts-ignore partial context value
      <DataContext.Provider value={mockContext}>
        <svg>
          <Grid rows columns={false} />
        </svg>
      </DataContext.Provider>,
    );
    expect(wrapper.find(VxGridRows)).toHaveLength(1);
    expect(wrapper.find(VxGridColumns)).toHaveLength(0);
  });
  it('should render VxGridColumns if columns=true', () => {
    const wrapper = mount(
      // @ts-ignore partial context value
      <DataContext.Provider value={mockContext}>
        <svg>
          <Grid rows={false} columns />
        </svg>
      </DataContext.Provider>,
    );
    expect(wrapper.find(VxGridRows)).toHaveLength(0);
    expect(wrapper.find(VxGridColumns)).toHaveLength(1);
  });
});

describe('<AnimatedGrid />', () => {
  it('should be defined', () => {
    expect(AnimatedGrid).toBeDefined();
  });
  it('should render VxAnimatedGridRows if rows=true', () => {
    const wrapper = mount(
      // @ts-ignore partial context value
      <DataContext.Provider value={mockContext}>
        <svg>
          <AnimatedGrid rows columns={false} />
        </svg>
      </DataContext.Provider>,
    );
    expect(wrapper.find(VxAnimatedGridRows)).toHaveLength(1);
    expect(wrapper.find(VxAnimatedGridColumns)).toHaveLength(0);
  });
  it('should render VxAnimatedGridColumns if columns=true', () => {
    const wrapper = mount(
      // @ts-ignore partial context value
      <DataContext.Provider value={mockContext}>
        <svg>
          <AnimatedGrid rows={false} columns />
        </svg>
      </DataContext.Provider>,
    );
    expect(wrapper.find(VxAnimatedGridRows)).toHaveLength(0);
    expect(wrapper.find(VxAnimatedGridColumns)).toHaveLength(1);
  });
});
