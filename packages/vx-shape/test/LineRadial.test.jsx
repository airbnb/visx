import React from 'react';
import { shallow, mount } from 'enzyme';

import { LineRadial } from '../src';

const LineRadialProps = {
  data: [{ x: 0, y: 0 }, { x: 1, y: 1 }],
  angle: d => d.x,
  radius: d => d.y,
};

const LineRadialWrapper = ({ ...restProps }) => shallow(<LineRadial {...restProps} />);
const LineRadialChildren = ({ children, ...restProps }) =>
  shallow(<LineRadial {...restProps}>{children}</LineRadial>);

describe('<LineRadial />', () => {
  test('it should be defined', () => {
    expect(LineRadial).toBeDefined();
  });

  test('it should have the .vx-line-radial class', () => {
    expect(LineRadialWrapper(LineRadialProps).prop('className')).toBe('vx-line-radial');
  });

  test('it should contain paths', () => {
    expect(LineRadialWrapper(LineRadialProps).find('path').length).toBeGreaterThan(0);
  });

  test('it should take a children as function prop', () => {
    const fn = jest.fn();
    LineRadialChildren({ children: fn, ...LineRadialProps });
    expect(fn).toHaveBeenCalled();
  });

  test('it should call children function with { path }', () => {
    const fn = jest.fn();
    LineRadialChildren({ children: fn, ...LineRadialProps });
    const args = fn.mock.calls[0][0];
    const keys = Object.keys(args);
    expect(keys.includes('path')).toEqual(true);
  });

  test('it should expose its ref via an innerRef prop', () => {
    return new Promise(done => {
      const refCallback = n => {
        expect(n.tagName).toEqual('PATH');
        done();
      };
      mount(<LineRadial innerRef={refCallback} {...LineRadialProps} />);
    });
  });
});
