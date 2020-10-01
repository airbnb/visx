import React from 'react';
import { mount } from 'enzyme';
import { DataContext, BarSeries } from '../src';
import getDataContext from './mocks/getDataContext';

describe('<BarSeries />', () => {
  it('should be defined', () => {
    expect(BarSeries).toBeDefined();
  });

  it('should render a LinePath', () => {
    const series = { key: 'bar', data: [{}, {}], xAccessor: () => 0, yAccessor: () => 10 };
    const wrapper = mount(
      <DataContext.Provider value={getDataContext(series)}>
        <svg>
          <BarSeries dataKey={series.key} {...series} />
        </svg>
      </DataContext.Provider>,
    );
    expect(wrapper.find('rect')).toHaveLength(2);
  });
});
