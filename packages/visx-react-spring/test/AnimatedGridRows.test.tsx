import React from 'react';
import { shallow } from 'enzyme';
import { scaleLinear } from '@visx/scale';
import { AnimatedGridRows } from '../src';

describe('AnimatedGridRows', () => {
  it('should be defined', () => {
    expect(AnimatedGridRows).toBeDefined();
  });
  it('should not throw', () => {
    expect(() =>
      shallow(
        <AnimatedGridRows width={10} scale={scaleLinear({ domain: [0, 10], range: [0, 10] })} />,
      ),
    ).not.toThrow();
  });
});
