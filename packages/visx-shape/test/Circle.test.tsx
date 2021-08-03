import React from 'react';
import { shallow, mount } from 'enzyme';

import { Circle } from '../src';

const CircleWrapper = ({ ...restProps }) => shallow(<Circle {...restProps} />);

describe('<Circle />', () => {
  test('it should be defined', () => {
    expect(Circle).toBeDefined();
  });

  test('it should have the .visx-circle class', () => {
    expect(
      CircleWrapper({
        className: 'test',
      }).prop('className'),
    ).toBe('visx-circle test');
  });

  test('it should expose its ref via an innerRef prop', () => {
    // eslint-disable-next-line jest/no-test-return-statement
    return new Promise((done) => {
      const refCallback = (ref: SVGCircleElement) => {
        expect(ref.tagName).toMatch('circle');
        done();
      };
      mount(
        <svg>
          <Circle innerRef={refCallback} />
        </svg>,
      );
    });
  });
});
