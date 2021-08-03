import React from 'react';
import { shallow, mount } from 'enzyme';

import { LineRadial } from '../src';
import { LineRadialProps } from '../src/shapes/LineRadial';

interface Datum {
  x: number;
  y: number;
}

const mockProps = {
  data: [
    { x: 0, y: 0 },
    { x: 1, y: 1 },
  ],
  angle: (d: Datum) => d.x,
  radius: (d: Datum) => d.y,
};

const LineRadialWrapper = (restProps = {}) => shallow(<LineRadial {...restProps} />);
const LineRadialChildren = ({ children, ...restProps }: Partial<LineRadialProps<Datum>>) =>
  shallow(<LineRadial {...restProps}>{children}</LineRadial>);

describe('<LineRadial />', () => {
  test('it should be defined', () => {
    expect(LineRadial).toBeDefined();
  });

  test('it should have the .visx-line-radial class', () => {
    expect(LineRadialWrapper(mockProps).prop('className')).toBe('visx-line-radial');
  });

  test('it should contain paths', () => {
    expect(LineRadialWrapper(mockProps).find('path').length).toBeGreaterThan(0);
  });

  test('it should take a children as function prop', () => {
    const fn = jest.fn();
    LineRadialChildren({ children: fn, ...mockProps });
    expect(fn).toHaveBeenCalled();
  });

  test('it should call children function with { path }', () => {
    const fn = jest.fn();
    LineRadialChildren({ children: fn, ...mockProps });
    const args = fn.mock.calls[0][0];
    const keys = Object.keys(args);
    expect(keys).toContain('path');
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
          <LineRadial innerRef={refCallback} {...mockProps} />
        </svg>,
      );
    });
  });
});
