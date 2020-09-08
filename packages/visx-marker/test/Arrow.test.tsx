import React from 'react';
import { shallow } from 'enzyme';
import { MarkerArrow, Marker } from '../src';

const Wrapper = (restProps = {}) => shallow(<MarkerArrow id="marker-circle-test" {...restProps} />);

describe('<MarkerArrow />', () => {
  test('it should be defined', () => {
    expect(MarkerArrow).toBeDefined();
  });

  test('it should render a <Marker> containing a <g>, <polyline>', () => {
    const marker = Wrapper().find(Marker);
    const g = marker.dive().find('g');
    const polyline = marker.dive().find('polyline');
    expect(marker).toHaveLength(1);
    expect(g).toHaveLength(1);
    expect(polyline).toHaveLength(1);
  });

  test('it should size correctly', () => {
    const size = 8;
    const strokeWidth = 1;
    const marker = Wrapper({ size, strokeWidth }).find(Marker);
    const g = marker.dive().find('g');
    const polyline = marker.dive().find('polyline');
    const max = size + strokeWidth * 2;
    const midX = size;
    const midY = max / 2;
    const points = `0 0, ${size} ${size / 2}, 0 ${size}`;
    expect(marker.prop('markerWidth')).toEqual(max);
    expect(marker.prop('markerHeight')).toEqual(max);
    expect(marker.prop('refX')).toEqual(midX);
    expect(marker.prop('refY')).toEqual(midY);
    expect(g.prop('transform')).toEqual(`translate(${strokeWidth}, ${strokeWidth})`);
    expect(polyline.prop('points')).toEqual(points);
  });
});
