import React from 'react';
import { shallow } from 'enzyme';

import { VoronoiPolygon } from '../src';

describe('<VoronoiPolygon />', () => {
  const polygon: [number, number][] = new Array(3).fill(null).map((_, i) => [i, i]);

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
    expect(wrapper.find('path')).toHaveLength(1);
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
