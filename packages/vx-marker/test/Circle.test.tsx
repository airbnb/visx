import React from 'react';
import { shallow } from 'enzyme';
import { MarkerCircle, Marker } from '../src';

const Wrapper = (restProps = {}) =>
  shallow(<MarkerCircle id="marker-circle-test" {...restProps} />);

describe('<MarkerCircle />', () => {
  test('it should be defined', () => {
    expect(MarkerCircle).toBeDefined();
  });

  test('it should render a <Marker> containing a <circle>', () => {
    const marker = Wrapper().find(Marker);
    const circle = marker.dive().find('circle');
    expect(marker).toHaveLength(1);
    expect(circle).toHaveLength(1);
  });

  test('it should size correctly', () => {
    const size = 8;
    const strokeWidth = 1;
    const marker = Wrapper({ size, strokeWidth }).find(Marker);
    const circle = marker.dive().find('circle');
    const diameter = size * 2;
    const bounds = diameter + strokeWidth;
    const mid = bounds / 2;
    expect(marker.prop('markerWidth')).toEqual(bounds);
    expect(marker.prop('markerHeight')).toEqual(bounds);
    expect(marker.prop('refX')).toEqual(0);
    expect(marker.prop('refY')).toEqual(mid);
    expect(circle.prop('r')).toEqual(size);
    expect(circle.prop('cx')).toEqual(mid);
    expect(circle.prop('cy')).toEqual(mid);
  });
});
