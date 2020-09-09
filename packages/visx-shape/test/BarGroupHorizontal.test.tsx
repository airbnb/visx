import React from 'react';
import { shallow } from 'enzyme';

import { scaleBand, scaleLinear } from '@visx/scale';
import { BarGroupHorizontal } from '../src';
import { BarGroupHorizontalProps } from '../lib/shapes/BarGroupHorizontal';

interface Datum {
  date: Date;
  'New York': string;
  'San Francisco': string;
  Austin: string;
}

const data: Datum[] = [
  {
    date: new Date(),
    'New York': '63.4',
    'San Francisco': '62.7',
    Austin: '72.2',
  },
  {
    date: new Date(),
    'New York': '58.0',
    'San Francisco': '59.9',
    Austin: '67.7',
  },
];

const y0 = () => 5;
const y0Scale = scaleBand({ domain: [0, 100], range: [0, 100] });
const y1Scale = scaleBand({ domain: [0, 100], range: [0, 100] });
const xScale = scaleLinear({ domain: [0, 100], range: [0, 100] });
const color = () => 'violet';
const keys = ['New York', 'San Francisco', 'Austin'];
const width = 1;

const BarGroupWrapper = (restProps = {}) =>
  shallow(
    <BarGroupHorizontal
      data={data}
      y0={y0}
      y0Scale={y0Scale}
      y1Scale={y1Scale}
      xScale={xScale}
      color={color}
      keys={keys}
      width={width}
      {...restProps}
    />,
  );

const BarGroupChildren = ({ children, ...restProps }: Partial<BarGroupHorizontalProps<Datum>>) =>
  shallow(
    <BarGroupHorizontal
      data={data}
      y0={y0}
      y0Scale={y0Scale}
      y1Scale={y1Scale}
      xScale={xScale}
      color={color}
      keys={keys}
      width={width}
      {...restProps}
    >
      {children}
    </BarGroupHorizontal>,
  );

describe('<BarGroupHorizontal />', () => {
  test('it should be defined', () => {
    expect(BarGroupHorizontal).toBeDefined();
  });

  test('it should have className .visx-bar-group', () => {
    const wrapper = BarGroupWrapper();
    expect(wrapper.prop('className')).toEqual('visx-bar-group-horizontal');
  });

  test('it should set className prop', () => {
    const wrapper = BarGroupWrapper({ className: 'test' });
    expect(wrapper.prop('className')).toEqual('visx-bar-group-horizontal test');
  });

  test('it should set top & left props', () => {
    const wrapper = BarGroupWrapper({ top: 2, left: 3 });
    expect(wrapper.prop('top')).toEqual(2);
    expect(wrapper.prop('left')).toEqual(3);
  });

  test('it should take a children as function prop', () => {
    const fn = jest.fn();
    BarGroupChildren({ children: fn });
    expect(fn).toHaveBeenCalled();
  });

  test('it should call children function with [barGroups]', () => {
    const fn = jest.fn();
    BarGroupChildren({ children: fn });
    const args = fn.mock.calls[0][0];
    expect(!!args.length).toEqual(true);
  });

  test('it should create barGroup with shape { index, x0, bars }', () => {
    const fn = jest.fn();
    BarGroupChildren({ children: fn });
    const args = fn.mock.calls[0][0];
    const barGroups = args;
    const group = barGroups[0];
    expect(Object.keys(group)).toEqual(['index', 'y0', 'bars']);
    expect(group.index).toBe(0);
    expect(typeof group.index).toBe('number');
    expect(typeof group.y0).toBe('number');
    expect(group.bars).toHaveLength(keys.length);
    expect(Object.keys(group.bars[0])).toEqual([
      'index',
      'key',
      'value',
      'height',
      'x',
      'y',
      'color',
      'width',
    ]);
  });
});
