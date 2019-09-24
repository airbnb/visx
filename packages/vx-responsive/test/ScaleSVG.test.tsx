// @ts-ignore ts-migrate(1259) FIXME: Module '"/Users/sergii_rudenko/Projects/vx/node_mo... Remove this comment to see the full error message
import React from 'react';
import { mount } from 'enzyme';

import { ScaleSVG } from '../src';

describe('<ScaleSVG />', () => {
  test('it should be defined', () => {
    expect(ScaleSVG).toBeDefined();
  });

  test('it should expose its ref via an innerRef prop', () => {
    return new Promise(done => {
      const refCallback = n => {
        expect(n.tagName).toEqual('svg');
        done();
      };

      mount(<ScaleSVG innerRef={refCallback} />);
    });
  });
});
