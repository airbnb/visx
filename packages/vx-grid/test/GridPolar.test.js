import React from 'react';
import { shallow } from 'enzyme';

import { Line } from '@vx/shape';
import { GridPolar } from '../src';
import { scaleLinear } from '../../vx-scale';
import * as polarToCartesian from '../src/utils/polarToCartesian';

const gridProps = {
  innerRadius: 0,
  outerRadius: 10,
  scale: scaleLinear({
    range: [0, 2 * Math.PI],
    domain: [1, 10]
  })
};

describe('<GridPolar />', () => {
  it('should be defined', () => {
    expect(GridPolar).toBeDefined();
  });

  it('should render with class .vx-grid-polar', () => {
    const wrapper = shallow(<GridPolar {...gridProps} />);
    expect(wrapper.find('.vx-grid-polar').length).toBe(1);
  });

  it('should set user-specified lineClassName', () => {
    const wrapper = shallow(<GridPolar {...gridProps} lineClassName="test-class" />);
    expect(wrapper.find('.test-class').length).toBeGreaterThan(0);
  });

  it('should render `numTicks` grid lines', () => {
    const fiveTickWrapper = shallow(<GridPolar {...gridProps} numTicks={5} />);
    const tenTickWrapper = shallow(<GridPolar {...gridProps} numTicks={10} />);

    expect(fiveTickWrapper.find(Line).length).toBe(5);
    expect(tenTickWrapper.find(Line).length).toBe(10);
  });

  it('should render grid lines according to tickValues', () => {
    const wrapper = shallow(<GridPolar {...gridProps} tickValues={[1, 2, 3]} />);

    expect(wrapper.find(Line).length).toBe(3);
  });

  it('should compute radial lines using innerRadius and outerRadius', () => {
    const polarToCartesianSpy = jest.spyOn(polarToCartesian, 'default');
    const innerRadius = 4;
    const outerRadius = 7;
    shallow(<GridPolar {...gridProps} innerRadius={innerRadius} outerRadius={outerRadius} />);

    expect(polarToCartesianSpy.mock.calls.length).toBeGreaterThanOrEqual(2);

    const fromPointCall = polarToCartesianSpy.mock.calls[0][0];
    const toPointCall = polarToCartesianSpy.mock.calls[1][0];

    expect(fromPointCall.radius).toBe(innerRadius);
    expect(toPointCall.radius).toBe(outerRadius);

    polarToCartesianSpy.mockRestore();
  });
});
