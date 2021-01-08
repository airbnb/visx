import React from 'react';
import { shallow } from 'enzyme';

import { Line } from '@visx/shape';
import { scaleLinear } from '@visx/scale';
import { GridAngle } from '../src';
import * as polarToCartesian from '../src/utils/polarToCartesian';

const gridProps = {
  innerRadius: 0,
  outerRadius: 10,
  scale: scaleLinear({
    range: [0, 2 * Math.PI],
    domain: [1, 10],
  }),
};

describe('<GridAngle />', () => {
  it('should render with class .vx-grid-angle', () => {
    const wrapper = shallow(<GridAngle {...gridProps} />);
    expect(wrapper.find('.visx-grid-angle')).toHaveLength(1);
  });

  it('should set user-specified lineClassName', () => {
    const wrapper = shallow(<GridAngle {...gridProps} lineClassName="test-class" />);
    expect(wrapper.find('.test-class').length).toBeGreaterThan(0);
  });

  it('should render `numTicks` grid lines', () => {
    const fiveTickWrapper = shallow(<GridAngle {...gridProps} numTicks={5} />);
    const tenTickWrapper = shallow(<GridAngle {...gridProps} numTicks={10} />);

    expect(fiveTickWrapper.find(Line)).toHaveLength(5);
    expect(tenTickWrapper.find(Line)).toHaveLength(10);
  });

  it('should render grid lines according to tickValues', () => {
    const wrapper = shallow(<GridAngle {...gridProps} tickValues={[1, 2, 3]} />);

    expect(wrapper.find(Line)).toHaveLength(3);
  });

  it('should compute radial lines using innerRadius and outerRadius', () => {
    const polarToCartesianSpy = jest.spyOn(polarToCartesian, 'default');
    const innerRadius = 4;
    const outerRadius = 7;
    shallow(<GridAngle {...gridProps} innerRadius={innerRadius} outerRadius={outerRadius} />);

    expect(polarToCartesianSpy.mock.calls.length).toBeGreaterThanOrEqual(2);

    const fromPointCall = polarToCartesianSpy.mock.calls[0][0];
    const toPointCall = polarToCartesianSpy.mock.calls[1][0];

    expect(fromPointCall.radius).toBe(innerRadius);
    expect(toPointCall.radius).toBe(outerRadius);

    polarToCartesianSpy.mockRestore();
  });
});
