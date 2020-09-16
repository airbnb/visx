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
