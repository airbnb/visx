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

import { Polygon } from '../src';

describe('<Polygon />', () => {
  const polygon: [number, number][] = new Array(3).fill(null).map((_, i) => [i, i]);

  const props = { polygon };

  test('it should be defined', () => {
    expect(Polygon).toBeDefined();
  });

  test('it should not render without a polygon', () => {
    const wrapper = shallow(<Polygon />);
    expect(wrapper.type()).toBeNull();
  });

  test('it should render a path', () => {
    const wrapper = shallow(<Polygon {...props} />);
    expect(wrapper.find('path')).toHaveLength(1);
  });

  test('it should set a d attribute based on the polygon prop', () => {
    const wrapper = shallow(<Polygon {...props} />);
    const d = 'M0,0L1,1L2,2Z';
    expect(wrapper.find('path').props().d).toEqual(d);
  });

  test('it should add extra (non-func) props to the path element', () => {
    const wrapper = shallow(<Polygon {...props} fill="orange" />);
    expect(wrapper.find('path').props().fill).toBe('orange');
  });
});
// MIGRATION STATUS: {"eslint":"pending","jest":{"passed":0,"failed":0,"total":0,"skipped":0,"successRate":0},"tsc":"pending","enyzme":"pending"}
