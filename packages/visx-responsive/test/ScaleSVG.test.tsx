import React from 'react';
import { mount } from 'enzyme';

import { ScaleSVG } from '../src';

describe('<ScaleSVG />', () => {
  test('it should be defined', () => {
    expect(ScaleSVG).toBeDefined();
  });

  test('it should expose its ref via an innerRef prop', () => {
    // eslint-disable-next-line jest/no-test-return-statement
    return new Promise((done) => {
      const refCallback = (n: SVGSVGElement) => {
        expect(n.tagName).toEqual('svg');
        done();
      };

      mount(<ScaleSVG innerRef={refCallback} />);
    });
  });
});
