import React from 'react';
import { shallow, mount } from 'enzyme';

import { AreaClosed } from '../src';
import { AreaClosedProps } from '../src/shapes/AreaClosed';

interface Datum {
  x: Date;
  y: number;
}

const data: Datum[] = [
  { x: new Date('2017-01-01'), y: 5 },
  { x: new Date('2017-01-02'), y: 5 },
  { x: new Date('2017-01-03'), y: 5 },
];

const xScale = () => 50;
xScale.range = () => [0, 100];
xScale.domain = () => [0, 100];
xScale.copy = () => xScale;

const yScale = () => 50;
yScale.range = () => [100, 0] as [number, number];
yScale.domain = () => [0, 100] as [number, number];
yScale.copy = () => yScale;

const x = () => xScale();
const y = () => yScale();

const AreaClosedWrapper = (restProps = {}) =>
  shallow(<AreaClosed data={data} yScale={yScale} x={x} y1={y} {...restProps} />);

const AreaClosedChildren = ({ children, ...restProps }: Partial<AreaClosedProps<Datum>>) =>
  shallow(
    <AreaClosed data={data} yScale={yScale} x={x} y1={y} {...restProps}>
      {children}
    </AreaClosed>,
  );

describe('<AreaClosed />', () => {
  test('it should be defined', () => {
    expect(AreaClosed).toBeDefined();
  });

  test('it should have the .vx-area-closed class', () => {
    expect(AreaClosedWrapper().prop('className')).toBe('vx-area-closed');
  });

  test('it should expose its ref via an innerRef prop', () => {
    return new Promise(done => {
      const refCallback = (ref: SVGPathElement) => {
        expect(ref.tagName).toMatch('path');
        done();
      };
      mount(
        <svg>
          <AreaClosed data={data} yScale={yScale} x={x} y1={y} innerRef={refCallback} />
        </svg>,
      );
    });
  });

  test('it should take a children as function prop', () => {
    const fn = jest.fn();
    AreaClosedChildren({ children: fn });
    expect(fn).toHaveBeenCalled();
  });

  test('it should call children function with { path }', () => {
    const fn = jest.fn();
    AreaClosedChildren({ children: fn });
    const args = fn.mock.calls[0][0];
    const keys = Object.keys(args);
    expect(keys.includes('path')).toEqual(true);
  });

  test('it should take an x number prop', () => {
    const fn = jest.fn();
    AreaClosedChildren({ children: fn, x: 42 });
    const args = fn.mock.calls[0][0];
    expect(args.path.x()()).toBe(42);
  });

  test('it should take an x fn prop', () => {
    const fn = jest.fn();
    AreaClosedChildren({ children: fn, x: () => 42 });
    const args = fn.mock.calls[0][0];
    expect(args.path.x()()).toBe(42);
    expect(args.path.x0()()).toBe(42);
    expect(args.path.x1()).toBeNull();
  });

  test('it should take an y number prop', () => {
    const fn = jest.fn();
    AreaClosedChildren({ children: fn, y1: 42 });
    const args = fn.mock.calls[0][0];
    expect(args.path.y0()()).toBe(yScale.range()[0]);
    expect(args.path.y1()()).toBe(42);
  });

  test('it should take an y fn prop', () => {
    const fn = jest.fn();
    AreaClosedChildren({ children: fn, y1: () => 42 });
    const args = fn.mock.calls[0][0];
    expect(args.path.y()()).toBe(yScale.range()[0]);
    expect(args.path.y0()()).toBe(yScale.range()[0]);
    expect(args.path.y1()()).toBe(42);
  });

  test('it should default defined prop to true', () => {
    const fn = jest.fn();
    AreaClosedChildren({ children: fn });
    const args = fn.mock.calls[0][0];
    expect(args.path.defined()()).toBe(true);
  });

  test('calling path with data returns a string', () => {
    const fn = jest.fn();
    AreaClosedChildren({ children: fn });
    const args = fn.mock.calls[0][0];
    expect(typeof args.path(data)).toBe('string');
  });
});
