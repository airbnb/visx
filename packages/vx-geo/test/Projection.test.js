import React from 'react';
import { shallow } from 'enzyme';
import Projection from '../src/projections/Projection';
import topology from './topo.json';
import { feature } from 'topojson-client';

describe('<Projection />', () => {
  // TopoJSON with two polygons
  const data = feature(topology, topology.objects.collection).features;
  const props = { data };

  test('it should be defined', () => {
    expect(Projection).toBeDefined();
  });

  test('it should pass className', () => {
    const wrapper = shallow(<Projection className="vx-new" {...props} />);
    expect(wrapper.find('path').get(0).props.className).toBe('vx-geo-mercator vx-new');
  });

  test('it should create two paths', () => {
    const wrapper = shallow(<Projection {...props} />);
    expect(wrapper.find('path').length).toBe(2);
  });

  test('it should pass prop to path', () => {
    const wrapper = shallow(<Projection stroke={'red'} {...props} />);
    expect(wrapper.find('path').get(0).props.stroke).toBe('red');
    expect(wrapper.find('path').get(1).props.stroke).toBe('red');
  });

  test('it should call projectionFunc prop function', () => {
    const projectionFunc = jest.fn();
    const wrapper = shallow(<Projection projectionFunc={projectionFunc} {...props} />);
    expect(projectionFunc).toHaveBeenCalledTimes(1);
  });

  test('it should call centroid prop function', () => {
    const centroid = jest.fn();
    const wrapper = shallow(<Projection centroid={centroid} {...props} />);
    expect(centroid).toHaveBeenCalledTimes(2);
  });
});
