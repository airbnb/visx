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
import { GridPolar, GridAngle, GridRadial } from '../src';

const gridProps = {
  innerRadius: 0,
  outerRadius: 10,
  scaleAngle: scaleLinear({ range: [1, 100], domain: [1, 10] }),
  scaleRadial: scaleLinear({ range: [1, 100], domain: [1, 10] }),
};

describe('<GridPolar />', () => {
  it('should be defined', () => {
    expect(GridPolar).toBeDefined();
  });

  it('should render with class .visx-grid-polar', () => {
    const wrapper = shallow(<GridPolar {...gridProps} />);
    expect(wrapper.find('.visx-grid-polar')).toHaveLength(1);
  });

  it('should render both GridAngle & GridRadial', () => {
    const wrapper = shallow(<GridPolar {...gridProps} />);
    expect(wrapper.find(GridAngle)).toHaveLength(1);
    expect(wrapper.find(GridRadial)).toHaveLength(1);
  });
});
// MIGRATION STATUS: {"eslint":"pending","jest":{"passed":3,"failed":0,"total":3,"skipped":0,"successRate":100},"tsc":"pending","enyzme":"pending"}
