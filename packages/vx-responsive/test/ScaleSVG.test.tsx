// @ts-ignore ts-migrate(1259) FIXME: Module '"/Users/sergii_rudenko/Projects/vx/node_mo... Remove this comment to see the full error message
import React from 'react';
import { mount } from 'enzyme';

import { ScaleSVG } from '../src';

// @ts-ignore ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('<ScaleSVG />', () => {
  // @ts-ignore ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test('it should be defined', () => {
    // @ts-ignore ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(ScaleSVG).toBeDefined();
  });

  // @ts-ignore ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test('it should expose its ref via an innerRef prop', () => {
    return new Promise(done => {
      const refCallback = n => {
        // @ts-ignore ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(n.tagName).toEqual('svg');
        done();
      };

      // @ts-ignore ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      mount(<ScaleSVG innerRef={refCallback} />);
    });
  });
});
