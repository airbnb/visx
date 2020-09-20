import React from 'react';
import { render } from 'enzyme';
import { scaleLinear } from '@visx/scale';
import { GridColumns } from '../src';

describe('<GridColumns />', () => {
  it('should be defined', () => {
    expect(GridColumns).toBeDefined();
  });
  it('should create grid lines', () => {
    const wrapper = render(
      <GridColumns
        scale={scaleLinear({ range: [0, 100] })}
        height={400}
        strokeDasharray="3,3"
        strokeOpacity={0.3}
        pointerEvents="none"
      />,
    );
    expect(wrapper.find('.visx-line')).toHaveLength(11);
  });
});
