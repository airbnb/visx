import React from 'react';
import { render } from 'enzyme';
import { scaleLinear } from '@visx/scale';
import { Grid } from '../src';

describe('<Grid />', () => {
  it('should be defined', () => {
    expect(Grid).toBeDefined();
  });
  it('should create grid lines', () => {
    const wrapper = render(
      <Grid
        xScale={scaleLinear({ range: [0, 100] })}
        yScale={scaleLinear({ range: [0, 100] })}
        width={400}
        height={400}
        strokeDasharray="3,3"
        strokeOpacity={0.3}
        pointerEvents="none"
      />,
    );
    expect(wrapper.find('.visx-rows')).toHaveLength(1);
    expect(wrapper.find('.visx-columns')).toHaveLength(1);
    expect(wrapper.find('.visx-line')).toHaveLength(22);
  });
});
