import React from 'react';
import { VoronoiPolygon } from '../src';
import { shallow } from 'enzyme';

describe('<VoronoiPolygon />', () => {
  const data = [1, 2];
  const polygon = Array(3)
    .fill(null)
    .map((_, i) => [i, i]);
  polygon.data = data;

  const props = { polygon };

  test('it should be defined', () => {
    expect(VoronoiPolygon).toBeDefined();
  });

  test('it should not render without a polygon', () => {
    const wrapper = shallow(<VoronoiPolygon />);
    expect(wrapper.type()).toBeNull();
  });

  test('it should render a path', () => {
    const wrapper = shallow(<VoronoiPolygon {...props} />);
    expect(wrapper.find('path').length).toBe(1);
  });

  test('it should set a d attribute based on the polygon prop', () => {
    const wrapper = shallow(<VoronoiPolygon {...props} />);
    const d = 'M0,0L1,1L2,2Z';
    expect(wrapper.find('path').props().d).toEqual(d);
  });

  test('it should add extra (non-func) props to the path element', () => {
    const wrapper = shallow(<VoronoiPolygon {...props} fill="orange" />);
    expect(wrapper.find('path').props().fill).toEqual('orange');
  });
});
