import React from 'react';
import { shallow, mount } from 'enzyme';

import { Area } from '../src';
import { AreaProps } from '../src/shapes/Area';

interface Datum {
  x: Date;
  y: number;
}

const fakeData: Datum[] = [
  { x: new Date('2017-01-01'), y: 5 },
  { x: new Date('2017-01-02'), y: 5 },
  { x: new Date('2017-01-03'), y: 5 },
];

const AreaChildren = ({ children, ...restProps }: Partial<AreaProps<Datum>>) =>
  shallow(
    <Area data={fakeData} {...restProps}>
      {children}
    </Area>,
  );

const xScale = () => 50;
const yScale = () => 50;
yScale.range = () => [100, 0];

const x = () => xScale();
const y = () => yScale();

describe('<Area />', () => {
  test('it should be defined', () => {
    expect(Area).toBeDefined();
  });

  test('it should have the .visx-area class', () => {
    const wrapper = shallow(<Area data={fakeData} x={x} y={y} />);
    expect(wrapper.find('path').prop('className')).toBe('visx-area');
  });

  test('it should expose its ref via an innerRef prop', () => {
    // eslint-disable-next-line jest/no-test-return-statement
    return new Promise((done) => {
      const refCallback = (ref: SVGPathElement) => {
        expect(ref.tagName).toMatch('path');
        done();
      };
      mount(
        <svg>
          <Area data={fakeData} x={x} y={y} innerRef={refCallback} />
        </svg>,
      );
    });
  });

  test('it should take a children as function prop', () => {
    const fn = jest.fn();
    AreaChildren({ children: fn });
    expect(fn).toHaveBeenCalled();
  });

  test('it should call children function with { path }', () => {
    const fn = jest.fn();
    AreaChildren({ children: fn });
    const args = fn.mock.calls[0][0];
    const keys = Object.keys(args);
    expect(keys).toContain('path');
  });

  test('it should take an x number prop', () => {
    const fn = jest.fn();
    AreaChildren({ children: fn, x: 42 });
    const args = fn.mock.calls[0][0];
    expect(args.path.x()()).toBe(42);
  });

  test('it should take an x fn prop', () => {
    const fn = jest.fn();
    AreaChildren({ children: fn, x: () => 42 });
    const args = fn.mock.calls[0][0];
    expect(args.path.x()()).toBe(42);
    expect(args.path.x0()()).toBe(42);
    expect(args.path.x1()).toBeNull();
  });

  test('it should take an y number prop', () => {
    const fn = jest.fn();
    AreaChildren({ children: fn, y: 42 });
    const args = fn.mock.calls[0][0];
    expect(args.path.y()()).toBe(42);
  });

  test('it should take an y fn prop', () => {
    const fn = jest.fn();
    AreaChildren({ children: fn, y: () => 42 });
    const args = fn.mock.calls[0][0];
    expect(args.path.y()()).toBe(42);
    expect(args.path.y0()()).toBe(42);
    expect(args.path.y1()).toBeNull();
  });

  test('it should default defined prop to true', () => {
    const fn = jest.fn();
    AreaChildren({ children: fn });
    const args = fn.mock.calls[0][0];
    expect(args.path.defined()()).toBe(true);
  });

  test('calling path with data returns a string', () => {
    const fn = jest.fn();
    AreaChildren({ children: fn });
    const args = fn.mock.calls[0][0];
    expect(typeof args.path(fakeData)).toBe('string');
  });
});
