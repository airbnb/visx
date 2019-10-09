import React from 'react';
import { shallow, mount } from 'enzyme';

import { Arc } from '../src';
import { ArcProps } from '../src/shapes/Arc';

interface Datum {
  data: number;
  value: number;
  index: number;
  startAngle: number;
  endAngle: number;
  padAngle: number;
}

const data: Datum = {
  data: 1,
  value: 1,
  index: 6,
  startAngle: 6.050474740247008,
  endAngle: 6.166830023713296,
  padAngle: 0,
};

const ArcWrapper = (overrideProps = {}) => shallow(<Arc data={data} {...overrideProps} />);

const ArcChildren = ({ children, ...restProps }: Partial<ArcProps<Datum>>) =>
  shallow(
    <Arc data={data} {...restProps}>
      {children}
    </Arc>,
  );

describe('<Arc />', () => {
  test('it should be defined', () => {
    expect(Arc).toBeDefined();
  });

  test('it should have the .vx-arcs-group class', () => {
    expect(ArcWrapper().prop('className')).toBe('vx-arc');
  });

  test('it should contain paths', () => {
    expect(ArcWrapper().find('path').length).toBeGreaterThan(0);
  });

  test('it should take a children as function prop', () => {
    const fn = jest.fn();
    ArcChildren({ children: fn });
    expect(fn).toHaveBeenCalled();
  });

  test('it should call children function with { path }', () => {
    const fn = jest.fn();
    ArcChildren({ children: fn });
    const args = fn.mock.calls[0][0];
    const keys = Object.keys(args);
    expect(keys.includes('path')).toEqual(true);
  });

  test('it should take an innerRadius number prop', () => {
    const fn = jest.fn();
    ArcChildren({ children: fn, innerRadius: 42 });
    const args = fn.mock.calls[0][0];
    expect(args.path.innerRadius()()).toBe(42);
  });

  test('it should take an innerRadius fn prop', () => {
    const fn = jest.fn();
    ArcChildren({ children: fn, innerRadius: () => 42 });
    const args = fn.mock.calls[0][0];
    expect(args.path.innerRadius()()).toBe(42);
  });

  test('it should take an outerRadius number prop', () => {
    const fn = jest.fn();
    ArcChildren({ children: fn, outerRadius: 42 });
    const args = fn.mock.calls[0][0];
    expect(args.path.outerRadius()()).toBe(42);
  });

  test('it should take an outerRadius fn prop', () => {
    const fn = jest.fn();
    ArcChildren({ children: fn, outerRadius: () => 42 });
    const args = fn.mock.calls[0][0];
    expect(args.path.outerRadius()()).toBe(42);
  });

  test('it should take a cornerRadius number prop', () => {
    const fn = jest.fn();
    ArcChildren({ children: fn, cornerRadius: 42 });
    const args = fn.mock.calls[0][0];
    expect(args.path.cornerRadius()()).toBe(42);
  });

  test('it should take a cornerRadius fn prop', () => {
    const fn = jest.fn();
    ArcChildren({ children: fn, cornerRadius: () => 42 });
    const args = fn.mock.calls[0][0];
    expect(args.path.cornerRadius()()).toBe(42);
  });

  test('it should take a startAngle number prop', () => {
    const fn = jest.fn();
    ArcChildren({ children: fn, startAngle: 42 });
    const args = fn.mock.calls[0][0];
    expect(args.path.startAngle()()).toBe(42);
  });

  test('it should take a startAngle 0 prop', () => {
    const fn = jest.fn();
    ArcChildren({ children: fn, startAngle: 0 });
    const args = fn.mock.calls[0][0];
    expect(args.path.startAngle()()).toBe(0);
  });

  test('it should take a startAngle fn prop', () => {
    const fn = jest.fn();
    ArcChildren({ children: fn, startAngle: () => 42 });
    const args = fn.mock.calls[0][0];
    expect(args.path.startAngle()()).toBe(42);
  });

  test('it should take a endAngle number prop', () => {
    const fn = jest.fn();
    ArcChildren({ children: fn, endAngle: 42 });
    const args = fn.mock.calls[0][0];
    expect(args.path.endAngle()()).toBe(42);
  });

  test('it should take a endAngle 0 prop', () => {
    const fn = jest.fn();
    ArcChildren({ children: fn, endAngle: 0 });
    const args = fn.mock.calls[0][0];
    expect(args.path.endAngle()()).toBe(0);
  });

  test('it should take a endAngle fn prop', () => {
    const fn = jest.fn();
    ArcChildren({ children: fn, endAngle: () => 42 });
    const args = fn.mock.calls[0][0];
    expect(args.path.endAngle()()).toBe(42);
  });

  test('it should take a padAngle number prop', () => {
    const fn = jest.fn();
    ArcChildren({ children: fn, padAngle: 42 });
    const args = fn.mock.calls[0][0];
    expect(args.path.padAngle()()).toBe(42);
  });

  test('it should take a padAngle 0 prop', () => {
    const fn = jest.fn();
    ArcChildren({ children: fn, padAngle: 0 });
    const args = fn.mock.calls[0][0];
    expect(args.path.padAngle()()).toBe(0);
  });

  test('it should take a padAngle fn prop', () => {
    const fn = jest.fn();
    ArcChildren({ children: fn, padAngle: () => 42 });
    const args = fn.mock.calls[0][0];
    expect(args.path.padAngle()()).toBe(42);
  });

  test('it should take a padRadius number prop', () => {
    const fn = jest.fn();
    ArcChildren({ children: fn, padRadius: 42 });
    const args = fn.mock.calls[0][0];
    expect(args.path.padRadius()()).toBe(42);
  });

  test('it should take a padRadius 0 prop', () => {
    const fn = jest.fn();
    ArcChildren({ children: fn, padRadius: 0 });
    const args = fn.mock.calls[0][0];
    expect(args.path.padRadius()()).toBe(0);
  });

  test('it should take a padRadius fn prop', () => {
    const fn = jest.fn();
    ArcChildren({ children: fn, padRadius: () => 42 });
    const args = fn.mock.calls[0][0];
    expect(args.path.padRadius()()).toBe(42);
  });

  test('calling path with data returns a string', () => {
    const fn = jest.fn();
    ArcChildren({ children: fn });
    const args = fn.mock.calls[0][0];
    expect(typeof args.path(data)).toBe('string');
  });

  test('it should expose its ref via an innerRef prop', () => {
    return new Promise(done => {
      const refCallback = (ref: SVGPathElement) => {
        expect(ref.tagName).toMatch('path');
        done();
      };
      mount(
        <svg>
          <Arc data={data} innerRef={refCallback} />
        </svg>,
      );
    });
  });
});
