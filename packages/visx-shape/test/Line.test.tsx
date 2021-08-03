import React from 'react';
import { shallow, mount } from 'enzyme';

import { Line } from '../src';

const LineWrapper = (restProps = {}) => shallow(<Line {...restProps} />);

describe('<Line />', () => {
  test('it should be defined', () => {
    expect(Line).toBeDefined();
  });

  test('it should contain a <line />', () => {
    expect(LineWrapper().find('line')).toHaveLength(1);
  });

  test('it should have the .visx-line class', () => {
    expect(LineWrapper().prop('className')).toBe('visx-line');
  });

  test('it should expose its ref via an innerRef prop', () => {
    // eslint-disable-next-line jest/no-test-return-statement
    return new Promise((done) => {
      const refCallback = (ref: SVGLineElement) => {
        expect(ref.tagName).toMatch('line');
        done();
      };
      mount(
        <svg>
          <Line innerRef={refCallback} />
        </svg>,
      );
    });
  });

  test('it should set shapeRendering to auto if not rectilinear', () => {
    expect(
      LineWrapper({
        to: {
          x: 50,
          y: 100,
        },
      }).prop('shapeRendering'),
    ).toBe('auto');
  });

  test('it should set shapeRendering to crispEdges if rectilinear', () => {
    expect(
      LineWrapper({
        to: {
          x: 0,
          y: 100,
        },
      }).prop('shapeRendering'),
    ).toBe('crispEdges');

    expect(
      LineWrapper({
        to: {
          x: 100,
          y: 0,
        },
      }).prop('shapeRendering'),
    ).toBe('crispEdges');
  });
});
