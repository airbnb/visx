import React from 'react';
import { shallow } from 'enzyme';
import { extent, max } from 'd3-array';
import { AreaClosed } from '../src';
import { appleStock } from '../../vx-mock-data';
import { scaleTime, scaleLinear } from '../../vx-scale';

const xStock = d => new Date(d.date);
const yStock = d => d.close;

const fakeXScale = scaleTime({
  range: [0, 100],
  domain: extent(appleStock, xStock),
});

const fakeYScale = scaleLinear({
  range: [100, 0],
  domain: [0, max(appleStock, yStock)],
  nice: true,
});

const AreaClosedWrapper = ({ ...restProps }) =>
  shallow(
    <AreaClosed
      data={appleStock}
      xScale={fakeXScale}
      yScale={fakeYScale}
      x={xStock}
      y={yStock}
      {...restProps}
    />,
  );

describe('<AreaClosed />', () => {
  test('it should be defined', () => {
    expect(AreaClosed).toBeDefined();
  });

  test('it should have the .vx-area-closed class', () => {
    expect(AreaClosedWrapper().find('path').prop('className')).toBe('vx-area-closed');
  });
});
