import React from 'react';
import { shallow, mount } from 'enzyme';

import { Arc } from '../src';

const browserUsage = [
  {
    date: '2015 Jun 15',
    'Google Chrome': '48.09',
    'Internet Explorer': '24.14',
    Firefox: '18.82',
    Safari: '7.46',
    'Microsoft Edge': '0.03',
    Opera: '1.32',
    Mozilla: '0.12',
    'Other/Unknown': '0.01',
  },
  {
    date: '2015 Jun 16',
    'Google Chrome': '48',
    'Internet Explorer': '24.19',
    Firefox: '18.96',
    Safari: '7.36',
    'Microsoft Edge': '0.03',
    Opera: '1.32',
    Mozilla: '0.12',
    'Other/Unknown': '0.01',
  },
];

const ArcWrapper = overrideProps => shallow(<Arc data={browserUsage} {...overrideProps} />);

const ArcChildren = ({ children, ...restProps }) =>
  shallow(
    <Arc data={browserUsage} {...restProps}>
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
    expect(typeof args.path(browserUsage)).toBe('string');
  });

  test('it should expose its ref via an innerRef prop', () => {
    return new Promise(done => {
      const refCallback = n => {
        expect(n.tagName).toMatch('path');
        done();
      };
      mount(<svg><Arc data={browserUsage} innerRef={refCallback} /></svg>);
    });
  });
});
