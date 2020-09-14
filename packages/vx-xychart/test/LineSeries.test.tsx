import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
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
    // @ts-ignore produces a union type that is too complex to represent.ts(2590)
    expect(wrapper.find(LinePath) as ShallowWrapper).toHaveLength(1);
  });
});
