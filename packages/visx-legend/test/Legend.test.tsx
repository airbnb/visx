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

import { Legend, LegendLabel } from '../src';

const defaultProps = {
  scale: scaleLinear<number>({
    range: [10, 0],
    round: true,
    domain: [0, 10],
  }),
};

describe('<Legend />', () => {
  test('it should be defined', () => {
    expect(Legend).toBeDefined();
  });

  test('it should default style to display: flex, flex-direction: column', () => {
    const wrapper = shallow(<Legend {...defaultProps} />);
    expect(wrapper.prop('style')).toEqual({
      display: 'flex',
      flexDirection: 'column',
    });
  });

  test('it should extend style prop', () => {
    const wrapper = shallow(<Legend {...defaultProps} style={{ display: 'block' }} />);
    expect(wrapper.prop('style')).toEqual({
      display: 'block',
      flexDirection: 'column',
    });
  });

  test('it should pass through direction prop to style prop', () => {
    const wrapper = shallow(<Legend {...defaultProps} direction="row" />);
    expect(wrapper.prop('style')).toEqual({
      display: 'flex',
      flexDirection: 'row',
    });
  });

  test('it should pass through legendLabelProps to legend labels', () => {
    const style = { fontFamily: 'Comic Sans' };
    const wrapper = shallow(<Legend {...defaultProps} legendLabelProps={{ style }} />);
    const label = wrapper.find(LegendLabel).first();
    expect(label.prop('style')).toEqual(style);
  });
});
// MIGRATION STATUS: {"eslint":"pending","jest":{"passed":5,"failed":0,"total":5,"skipped":0,"successRate":100},"tsc":"pending","enyzme":"pending"}
