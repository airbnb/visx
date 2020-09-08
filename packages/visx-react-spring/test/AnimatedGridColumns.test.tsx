import React from 'react';
import { shallow } from 'enzyme';
import { scaleLinear } from '@visx/scale';
import { AnimatedGridColumns } from '../src';

describe('AnimatedGridColumns', () => {
  it('should be defined', () => {
    expect(AnimatedGridColumns).toBeDefined();
  });
  it('should not throw', () => {
    expect(() =>
      shallow(
        <AnimatedGridColumns
          height={10}
          scale={scaleLinear({ domain: [0, 10], range: [0, 10] })}
        />,
      ),
    ).not.toThrow();
  });
});
