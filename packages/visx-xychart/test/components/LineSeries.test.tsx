import React from 'react';
import { mount } from 'enzyme';
import { LinePath } from '@visx/shape';
import { DataContext, LineSeries } from '../../src';
import getDataContext from '../mocks/getDataContext';

describe('<LineSeries />', () => {
  it('should be defined', () => {
    expect(LineSeries).toBeDefined();
  });

  it('should render a LinePath', () => {
    const series = { key: 'line', data: [], xAccessor: () => 'x', yAccessor: () => '7' };
    const wrapper = mount(
      <DataContext.Provider value={getDataContext(series)}>
        <svg>
          <LineSeries dataKey={series.key} {...series} />
        </svg>
      </DataContext.Provider>,
    );
    // @ts-ignore produces a union type that is too complex to represent.ts(2590)
    expect(wrapper.find(LinePath)).toHaveLength(1);
  });
});
