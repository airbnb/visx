import React from 'react';
import { shallow, mount } from 'enzyme';
import { extent } from 'd3-array';
import { Area } from '../src';
import { scaleTime, scaleLinear } from '../../vx-scale';

const fakeData = [
  { x: new Date('2017-01-01'), y: 5 },
  { x: new Date('2017-01-02'), y: 5 },
  { x: new Date('2017-01-03'), y: 5 }
];

const x = d => d.x;
const y = d => d.y;

const fakeXScale = scaleTime({
  range: [0, 100],
  domain: extent(fakeData, x)
});

const fakeYScale = scaleLinear({
  range: [100, 0],
  domain: extent(fakeData, y)
});

describe('<Area />', () => {
  test('it should be defined', () => {
    expect(Area).toBeDefined();
  });

  test('it should have the .vx-area class', () => {
    const wrapper = shallow(
      <Area data={fakeData} xScale={fakeXScale} yScale={fakeYScale} x={x} y={y} />
    );
    expect(wrapper.find('path').prop('className')).toBe('vx-area');
  });

  test('it should expose its ref via an innerRef prop', done => {
    const refCallback = n => {
      expect(n.tagName).toEqual('PATH');
      done();
    };
    mount(
      <Area
        data={fakeData}
        xScale={fakeXScale}
        yScale={fakeYScale}
        x={x}
        y={y}
        innerRef={refCallback}
      />
    );
  });
});
