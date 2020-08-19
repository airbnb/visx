import React from 'react';
import { shallow } from 'enzyme';
import { MarkerCross, Marker } from '../src';

const Wrapper = (restProps = {}) => shallow(<MarkerCross id="marker-cross-test" {...restProps} />);

describe('<MarkerCross />', () => {
  test('it should be defined', () => {
    expect(MarkerCross).toBeDefined();
  });

  test('it should render a <Marker> containing a <polyline>', () => {
    const marker = Wrapper().find(Marker);
    const polyline = marker.dive().find('polyline');
    expect(marker).toHaveLength(1);
    expect(polyline).toHaveLength(1);
  });

  test('it should size correctly', () => {
    const size = 8;
    const strokeWidth = 1;
    const marker = Wrapper({ size, strokeWidth }).find(Marker);
    const polyline = marker.dive().find('polyline');
    const bounds = size + strokeWidth;
    const mid = size / 2;
    const points = `0 ${mid}, ${mid} ${mid}, ${mid} 0, ${mid} ${size}, ${mid} ${mid}, ${size} ${mid}`;
    expect(marker.prop('markerWidth')).toEqual(bounds);
    expect(marker.prop('markerHeight')).toEqual(bounds);
    expect(marker.prop('refX')).toEqual(mid);
    expect(marker.prop('refY')).toEqual(mid);
    expect(polyline.prop('points')).toEqual(points);
  });
});
