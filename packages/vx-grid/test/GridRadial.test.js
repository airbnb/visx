import React from 'react';
import { shallow } from 'enzyme';

import { LineRadial } from '@vx/shape';
import { GridRadial } from '../src';
import { scaleLinear } from '../../vx-scale';
import * as polarToCartesian from '../src/utils/polarToCartesian';

const gridProps = {
  innerRadius: 0,
  outerRadius: 10,
  arcScale: scaleLinear({
    range: [0, 2 * Math.PI],
    domain: [1, 10]
  }),
  radialScale: scaleLinear({ range: [1, 100], domain: [1, 10] })
};

describe('<GridRadial />', () => {
  it('should be defined', () => {
    expect(GridRadial).toBeDefined();
  });

  it('should render with class .vx-grid-radial', () => {
    const wrapper = shallow(<GridRadial {...gridProps} />);
    expect(wrapper.find('.vx-grid-radial').length).toBe(1);
  });

  it('should set user-specified lineClassName', () => {
    const wrapper = shallow(<GridRadial {...gridProps} lineClassName="test-class" />);
    expect(wrapper.find('.test-class').length).toBeGreaterThan(0);
  });

  it('should render `numTicks` grid lines', () => {
    const fiveTickWrapper = shallow(<GridRadial {...gridProps} numTicks={5} />);
    const tenTickWrapper = shallow(<GridRadial {...gridProps} numTicks={10} />);

    expect(fiveTickWrapper.find(LineRadial).length).toBe(5);
    expect(tenTickWrapper.find(LineRadial).length).toBe(10);
  });

  it('should render grid lines according to tickValues', () => {
    const wrapper = shallow(<GridRadial {...gridProps} tickValues={[1, 2, 3]} />);

    expect(wrapper.find(LineRadial).length).toBe(3);
  });
});
