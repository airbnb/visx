import React from 'react';
import { shallow, mount } from 'enzyme';

import { Circle } from '../src';

const CircleWrapper = ({ ...restProps }) => shallow(<Circle {...restProps} />);

describe('<Circle />', () => {
  test('it should be defined', () => {
    expect(Circle).toBeDefined();
  });

  test('it should have the .vx-circle class', () => {
    expect(
      CircleWrapper({
        className: 'test',
      }).prop('className'),
    ).toBe('vx-circle test');
  });

  test('it should expose its ref via an innerRef prop', () => {
    return new Promise(done => {
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
