import React from 'react';
import { render } from 'enzyme';
import { scaleLinear } from '@vx/scale';
import { GridRows } from '../src';

describe('<GridRows />', () => {
  it('should be defined', () => {
    expect(GridRows).toBeDefined();
  });
  it('should create grid lines', () => {
    const wrapper = render(
      <GridRows
        scale={scaleLinear({ range: [0, 100] })}
        width={400}
        strokeDasharray="3,3"
        strokeOpacity={0.3}
        pointerEvents="none"
      />,
    );
    expect(wrapper.find('.vx-line')).toHaveLength(11);
  });
});
