import React from 'react';
import { shallow } from 'enzyme';
import { scaleLinear } from '@visx/scale';
import { AnimatedTicks } from '../src';

describe('AnimatedTicks', () => {
  it('should be defined', () => {
    expect(AnimatedTicks).toBeDefined();
  });

  it('should render tickComponent defined', () => {
    const wrapper = shallow(
      <AnimatedTicks
        hideTicks={false}
        horizontal={false}
        orientation="bottom"
        tickComponent={() => <text>Test Component</text>}
        scale={scaleLinear({ domain: [0, 10], range: [0, 10] })}
        tickLabelProps={[]}
        ticks={[
          {
            from: { x: 0, y: 0 },
            to: { x: 0, y: 5 },
            value: 0,
            index: 0,
            formattedValue: '0',
          },
        ]}
      />,
    );

    expect(wrapper.text()).toEqual('Test Component');
  });

  it('should not throw', () => {
    expect(() =>
      shallow(
        <AnimatedTicks
          hideTicks={false}
          horizontal={false}
          orientation="bottom"
          scale={scaleLinear({ domain: [0, 10], range: [0, 10] })}
          tickLabelProps={[]}
          ticks={[
            { from: { x: 0, y: 0 }, to: { x: 0, y: 5 }, value: 0, index: 0, formattedValue: '0' },
          ]}
        />,
      ),
    ).not.toThrow();
  });
});
