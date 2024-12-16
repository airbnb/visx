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

import { Arc } from '@visx/shape';
import { scaleLinear } from '@visx/scale';
import { GridRadial } from '../src';

const gridProps = {
  innerRadius: 0,
  outerRadius: 10,
  scale: scaleLinear({ range: [1, 100], domain: [1, 10] }),
};

describe('<GridRadial />', () => {
  it('should be defined', () => {
    expect(GridRadial).toBeDefined();
  });

  it('should render with class .visx-grid-radial', () => {
    const wrapper = shallow(<GridRadial {...gridProps} />);
    expect(wrapper.find('.visx-grid-radial')).toHaveLength(1);
  });

  it('should set user-specified lineClassName', () => {
    const wrapper = shallow(<GridRadial {...gridProps} lineClassName="test-class" />);
    expect(wrapper.find('.test-class').length).toBeGreaterThan(0);
  });

  it('should render `numTicks` grid line arcs', () => {
    const fiveTickWrapper = shallow(<GridRadial {...gridProps} numTicks={5} />);
    const tenTickWrapper = shallow(<GridRadial {...gridProps} numTicks={10} />);

    expect(fiveTickWrapper.find(Arc)).toHaveLength(5);
    expect(tenTickWrapper.find(Arc)).toHaveLength(10);
  });

  it('should render grid line arcs according to tickValues', () => {
    const wrapper = shallow(<GridRadial {...gridProps} tickValues={[1, 2, 3]} />);

    expect(wrapper.find(Arc)).toHaveLength(3);
  });
});
// MIGRATION STATUS: {"eslint":"pending","jest":{"passed":5,"failed":0,"total":5,"skipped":0,"successRate":100},"tsc":"pending","enyzme":"pending"}
