import React from 'react';
import mockConsole from 'jest-mock-console';
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

const ArcWrapper = (overrideProps: Partial<ArcProps<Datum>> = { data }) =>
  shallow(<Arc {...overrideProps} />);

const ArcChildren = ({ children, ...restProps }: Partial<ArcProps<Datum>>) =>
  shallow(
    <Arc data={data} {...restProps}>
      {children}
    </Arc>,
  );

describe('<Arc />', () => {
  it('should be defined', () => {
    expect(Arc).toBeDefined();
  });

  it('should have the .visx-arcs-group class', () => {
    expect(ArcWrapper().prop('className')).toBe('visx-arc');
  });

  it('should render a path', () => {
    expect(ArcWrapper().find('path')).toHaveLength(1);
  });

  it('should warn and render null when none of data, radii, and angles are passed', () => {
    const restoreConsole = mockConsole();
    expect(ArcWrapper({}).find('path')).toHaveLength(0);
    expect(console.warn).toHaveBeenCalledTimes(1);
    restoreConsole();
  });

  it('should render a path without data when radii + angles are defined', () => {
    expect(
      ArcWrapper({ startAngle: 0, endAngle: 6, innerRadius: 5, outerRadius: 10 }).find('path'),
    ).toHaveLength(1);
  });

  it('should take a children as function prop', () => {
    const fn = jest.fn();
    ArcChildren({ children: fn });
    expect(fn).toHaveBeenCalled();
  });

  it('should call children function with { path }', () => {
    const fn = jest.fn();
    ArcChildren({ children: fn });
    const args = fn.mock.calls[0][0];
    const keys = Object.keys(args);
    expect(keys).toContain('path');
  });

  it('should take an innerRadius number prop', () => {
    const fn = jest.fn();
    ArcChildren({ children: fn, innerRadius: 42 });
    const args = fn.mock.calls[0][0];
    expect(args.path.innerRadius()()).toBe(42);
  });

  it('should take an innerRadius fn prop', () => {
    const fn = jest.fn();
    ArcChildren({ children: fn, innerRadius: () => 42 });
    const args = fn.mock.calls[0][0];
    expect(args.path.innerRadius()()).toBe(42);
  });

  it('should take an outerRadius number prop', () => {
    const fn = jest.fn();
    ArcChildren({ children: fn, outerRadius: 42 });
    const args = fn.mock.calls[0][0];
    expect(args.path.outerRadius()()).toBe(42);
  });

  it('should take an outerRadius fn prop', () => {
    const fn = jest.fn();
    ArcChildren({ children: fn, outerRadius: () => 42 });
    const args = fn.mock.calls[0][0];
    expect(args.path.outerRadius()()).toBe(42);
  });

  it('should take a cornerRadius number prop', () => {
    const fn = jest.fn();
    ArcChildren({ children: fn, cornerRadius: 42 });
    const args = fn.mock.calls[0][0];
    expect(args.path.cornerRadius()()).toBe(42);
  });

  it('should take a cornerRadius fn prop', () => {
    const fn = jest.fn();
    ArcChildren({ children: fn, cornerRadius: () => 42 });
    const args = fn.mock.calls[0][0];
    expect(args.path.cornerRadius()()).toBe(42);
  });

  it('should take a startAngle number prop', () => {
    const fn = jest.fn();
    ArcChildren({ children: fn, startAngle: 42 });
    const args = fn.mock.calls[0][0];
    expect(args.path.startAngle()()).toBe(42);
  });

  it('should take a startAngle 0 prop', () => {
    const fn = jest.fn();
    ArcChildren({ children: fn, startAngle: 0 });
    const args = fn.mock.calls[0][0];
    expect(args.path.startAngle()()).toBe(0);
  });

  it('should take a startAngle fn prop', () => {
    const fn = jest.fn();
    ArcChildren({ children: fn, startAngle: () => 42 });
    const args = fn.mock.calls[0][0];
    expect(args.path.startAngle()()).toBe(42);
  });

  it('should take a endAngle number prop', () => {
    const fn = jest.fn();
    ArcChildren({ children: fn, endAngle: 42 });
    const args = fn.mock.calls[0][0];
    expect(args.path.endAngle()()).toBe(42);
  });

  it('should take a endAngle 0 prop', () => {
    const fn = jest.fn();
    ArcChildren({ children: fn, endAngle: 0 });
    const args = fn.mock.calls[0][0];
    expect(args.path.endAngle()()).toBe(0);
  });

  it('should take a endAngle fn prop', () => {
    const fn = jest.fn();
    ArcChildren({ children: fn, endAngle: () => 42 });
    const args = fn.mock.calls[0][0];
    expect(args.path.endAngle()()).toBe(42);
  });

  it('should take a padAngle number prop', () => {
    const fn = jest.fn();
    ArcChildren({ children: fn, padAngle: 42 });
    const args = fn.mock.calls[0][0];
    expect(args.path.padAngle()()).toBe(42);
  });

  it('should take a padAngle 0 prop', () => {
    const fn = jest.fn();
    ArcChildren({ children: fn, padAngle: 0 });
    const args = fn.mock.calls[0][0];
    expect(args.path.padAngle()()).toBe(0);
  });

  it('should take a padAngle fn prop', () => {
    const fn = jest.fn();
    ArcChildren({ children: fn, padAngle: () => 42 });
    const args = fn.mock.calls[0][0];
    expect(args.path.padAngle()()).toBe(42);
  });

  it('should take a padRadius number prop', () => {
    const fn = jest.fn();
    ArcChildren({ children: fn, padRadius: 42 });
    const args = fn.mock.calls[0][0];
    expect(args.path.padRadius()()).toBe(42);
  });

  it('should take a padRadius 0 prop', () => {
    const fn = jest.fn();
    ArcChildren({ children: fn, padRadius: 0 });
    const args = fn.mock.calls[0][0];
    expect(args.path.padRadius()()).toBe(0);
  });

  it('should take a padRadius fn prop', () => {
    const fn = jest.fn();
    ArcChildren({ children: fn, padRadius: () => 42 });
    const args = fn.mock.calls[0][0];
    expect(args.path.padRadius()()).toBe(42);
  });

  it('calling path with data returns a string', () => {
    const fn = jest.fn();
    ArcChildren({ children: fn });
    const args = fn.mock.calls[0][0];
    expect(typeof args.path(data)).toBe('string');
  });

  it('should expose its ref via an innerRef prop', () => {
    // eslint-disable-next-line jest/no-test-return-statement
    return new Promise((done) => {
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
