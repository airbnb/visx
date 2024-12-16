/**
 * LLM-GENERATED REFACTOR
 *
 * This file was migrated from Enzyme to RTL using generative AI.
 * To make the migration as clean as possible, the LLM was instructed to
 * use testing patterns similar to Enzyme.
 *
 * If you are making changes to this file, please consider refactoring
 * to more idiomatic RTL (and then removing this banner!).
 */
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

    expect(wrapper.text()).toBe('Test Component');
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
// MIGRATION STATUS: {"eslint":"pending","jest":{"passed":3,"failed":0,"total":3,"skipped":0,"successRate":100},"tsc":"pending","enyzme":"pending"}
