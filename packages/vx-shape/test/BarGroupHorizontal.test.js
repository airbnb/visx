import React from 'react';
import { BarGroupHorizontal } from '../src';
import { shallow, mount } from 'enzyme';

const data = [
  {
    date: new Date(),
    'New York': '63.4',
    'San Francisco': '62.7',
    Austin: '72.2'
  },
  {
    date: new Date(),
    'New York': '58.0',
    'San Francisco': '59.9',
    Austin: '67.7'
  }
];
const y0 = d => d.date;
const y0Scale = d => 2;
y0Scale.bandwidth = () => 10;
const y1Scale = d => d;
y1Scale.bandwidth = () => 2;
const xScale = d => d;
const zScale = d => d;
const keys = ['New York', 'San Francisco', 'Austin'];
const width = 1;

const BarGroupWrapper = ({ ...restProps }) =>
  shallow(
    <BarGroupHorizontal
      data={data}
      y0={y0}
      y0Scale={y0Scale}
      y1Scale={y1Scale}
      xScale={xScale}
      zScale={zScale}
      keys={keys}
      width={width}
      {...restProps}
    />
  );

const BarGroupChildren = ({ children, ...restProps }) =>
  shallow(
    <BarGroupHorizontal
      data={data}
      y0={y0}
      y0Scale={y0Scale}
      y1Scale={y1Scale}
      xScale={xScale}
      zScale={zScale}
      keys={keys}
      width={width}
      {...restProps}
    >
      {children}
    </BarGroupHorizontal>
  );

describe('<BarGroupHorizontal />', () => {
  test('it should be defined', () => {
    expect(BarGroupHorizontal).toBeDefined();
  });

  test('it should have className .vx-bar-group', () => {
    const wrapper = BarGroupWrapper();
    expect(wrapper.prop('className')).toEqual('vx-bar-group-horizontal');
  });

  test('it should set className prop', () => {
    const wrapper = BarGroupWrapper({ className: 'test' });
    expect(wrapper.prop('className')).toEqual('vx-bar-group-horizontal test');
  });

  test('it should set top & left props', () => {
    const wrapper = BarGroupWrapper({ top: 2, left: 3 });
    expect(wrapper.prop('top')).toEqual(2);
    expect(wrapper.prop('left')).toEqual(3);
  });

  test('it should take a children as function prop', () => {
    const fn = jest.fn();
    const wrapper = BarGroupChildren({ children: fn });
    expect(fn).toHaveBeenCalled();
  });

  test('it should call children function with { barGroups }', () => {
    const fn = jest.fn();
    const wrapper = BarGroupChildren({ children: fn });
    const args = fn.mock.calls[0][0];
    const keys = Object.keys(args);
    expect(keys.includes('barGroups')).toEqual(true);
  });

  test('it should create barGroup with shape { index, x0, keys }', () => {
    const fn = jest.fn();
    const wrapper = BarGroupChildren({ children: fn });
    const args = fn.mock.calls[0][0];
    const { barGroups } = args;
    const group = barGroups[0];
    expect(Object.keys(group)).toEqual(['index', 'y0', 'keys']);
    expect(group.index).toBe(0);
    expect(typeof group.index).toBe('number');
    expect(typeof group.y0).toBe('number');
    expect(group.keys.length).toBe(keys.length);
    expect(Object.keys(group.keys[0])).toEqual([
      'index',
      'key',
      'value',
      'barHeight',
      'x',
      'y',
      'fill',
      'barWidth'
    ]);
  });
});
