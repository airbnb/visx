import React from 'react';
import { shallow } from 'enzyme';
import { Polygon, getPoint, getPoints } from '../src';

const PolygonWrapper = ({ ...restProps }) => shallow(<Polygon {...restProps} />);

describe('<Polygon />', () => {
  it('should be defined', () => {
    expect(Polygon).toBeDefined();
  });

  it('should render an octagon', () => {
    const wrapper = PolygonWrapper({ sides: 8, size: 25 });

    const polygon = wrapper.find('polygon');

    const points = polygon.props().points.split(' ');

    expect(points).toHaveLength(8);
  });

  it('should add classname', () => {
    const wrapper = PolygonWrapper({ sides: 6, size: 25, className: 'a-polygon' });

    expect(wrapper.prop('className')).toBe('vx-polygon a-polygon');
  });

  it('should add onClick handler', () => {
    const fn = jest.fn();

    const wrapper = PolygonWrapper({
      sides: 6,
      size: 25,
      className: 'a-polygon',
      onClick: fn
    });

    wrapper.simulate('click');

    expect(fn).toHaveBeenCalled();
  });
});
