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
import { render } from 'enzyme';
import { scaleLinear } from '@visx/scale';
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
    expect(wrapper.find('.visx-line')).toHaveLength(11);
  });
});
// MIGRATION STATUS: {"eslint":"pending","jest":{"passed":0,"failed":0,"total":0,"skipped":0,"successRate":0},"tsc":"pending","enyzme":"pending"}
