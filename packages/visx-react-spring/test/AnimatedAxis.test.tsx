import React from 'react';
import { shallow } from 'enzyme';
import { scaleLinear } from '@visx/scale';
import { AnimatedAxis } from '../src';

describe('AnimatedAxis', () => {
  it('should be defined', () => {
    expect(AnimatedAxis).toBeDefined();
  });

  it('should not throw', () => {
    expect(() =>
      shallow(<AnimatedAxis scale={scaleLinear({ domain: [0, 10], range: [0, 10] })} />),
    ).not.toThrow();
  });
});
