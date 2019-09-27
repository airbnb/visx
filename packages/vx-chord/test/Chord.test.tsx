// @ts-ignore ts-migrate(1259) FIXME: Module '"/Users/sergii_rudenko/Projects/vx/node_mo... Remove this comment to see the full error message
import React from 'react';
import { shallow } from 'enzyme';

import { Chord } from '../src';

const matrix = [
  [11975, 5871, 8916, 2868],
  [1951, 10048, 2060, 6171],
  [8010, 16145, 8090, 8045],
  [1013, 990, 940, 6907],
];

// @ts-ignore ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
const ChordWrapper = ({ ...restProps }) => shallow(<Chord {...restProps} />);

// @ts-ignore ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('<Chord />', () => {
  // @ts-ignore ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test('it should be defined', () => {
    // @ts-ignore ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(Chord).toBeDefined();
  });

  // @ts-ignore ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test('it should call children as a function with required args', () => {
    // @ts-ignore ts-migrate(2304) FIXME: Cannot find name 'jest'.
    const children = jest.fn();
    ChordWrapper({ children, matrix });
    const args = children.mock.calls[0][0];
    // @ts-ignore ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(children.mock.calls).toHaveLength(1);
    // @ts-ignore ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(args.chords).toBeDefined();
  });
});
