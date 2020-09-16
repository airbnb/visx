import React from 'react';
import { shallow, mount } from 'enzyme';

import { LinePath } from '../src';
import { LinePathProps } from '../src/shapes/LinePath';

interface Datum {
  x: number;
  y: number;
}

const linePathProps = {
  data: [
    { x: 0, y: 0 },
    { x: 1, y: 1 },
  ],
  x: (d: Datum) => d.x,
  y: (d: Datum) => d.y,
};

const LinePathWrapper = (restProps = {}) => shallow(<LinePath {...restProps} />);
const LinePathChildren = ({ children, ...restProps }: Partial<LinePathProps<Datum>>) =>
  shallow(<LinePath {...restProps}>{children}</LinePath>);

describe('<LinePath />', () => {
  test('it should be defined', () => {
    expect(LinePath).toBeDefined();
  });

  test('it should have the .vx-linepath class', () => {
    expect(LinePathWrapper(linePathProps).prop('className')).toBe('vx-linepath');
  });

  test('it should contain paths', () => {
    expect(LinePathWrapper(linePathProps).find('path').length).toBeGreaterThan(0);
  });

  test('it should take a children as function prop', () => {
    const fn = jest.fn();
    LinePathChildren({ children: fn });
    expect(fn).toHaveBeenCalled();
  });

  test('it should call children function with { path }', () => {
    const fn = jest.fn();
    LinePathChildren({ children: fn });
    const args = fn.mock.calls[0][0];
    const keys = Object.keys(args);
    expect(keys.includes('path')).toEqual(true);
  });

  test('it should expose its ref via an innerRef prop', () => {
    // eslint-disable-next-line jest/no-test-return-statement
    return new Promise(done => {
      const refCallback = (ref: SVGPathElement) => {
        expect(ref.tagName).toMatch('path');
        done();
      };
      mount(
        <svg>
          <LinePath innerRef={refCallback} {...linePathProps} />
        </svg>,
      );
    });
  });
});
