import React from 'react';
import { shallow } from 'enzyme';
import { LinePath } from '@vx/shape';
import { LineSeries } from '../src';

describe('<LineSeries />', () => {
  it('should be defined', () => {
    expect(LineSeries).toBeDefined();
  });

  it('should render a LinePath', () => {
    const wrapper = shallow(
      <LineSeries dataKey="line" data={[]} xAccessor={() => 'x'} yAccessor={() => 'y'} />,
    );
    expect(wrapper.find(LinePath)).toHaveLength(1);
  });
});
