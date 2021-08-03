import React from 'react';
import { shallow, mount } from 'enzyme';

import { Bar } from '../src';

const BarWrapper = (restProps = {}) => shallow(<Bar {...restProps} />);

describe('<Bar />', () => {
  test('it should be defined', () => {
    expect(Bar).toBeDefined();
  });

  test('it should have the .visx-bar class', () => {
    expect(
      BarWrapper({
        className: 'test',
      }).prop('className'),
    ).toBe('visx-bar test');
  });

  test('it should expose its ref via an innerRef prop', () => {
    // eslint-disable-next-line jest/no-test-return-statement
    return new Promise((done) => {
      const refCallback = (ref: SVGRectElement) => {
        expect(ref.tagName).toMatch('rect');
        done();
      };
      mount(
        <svg>
          <Bar innerRef={refCallback} />
        </svg>,
      );
    });
  });
});
