import React from 'react';
import { shallow } from 'enzyme';

import { Chord } from '../src';

const matrix = [
  [11975, 5871, 8916, 2868],
  [1951, 10048, 2060, 6171],
  [8010, 16145, 8090, 8045],
  [1013, 990, 940, 6907],
];

type WrapperProps = {
  matrix: number[][];
  children: () => React.ReactNode;
};
const ChordWrapper = ({ ...restProps }: WrapperProps) => shallow(<Chord {...restProps} />);

describe('<Chord />', () => {
  test('it should be defined', () => {
    expect(Chord).toBeDefined();
  });

  test('it should call children as a function with required args', () => {
    const children = jest.fn();
    ChordWrapper({ children, matrix });
    const args = children.mock.calls[0][0];
    expect(children.mock.calls).toHaveLength(1);
    expect(args.chords).toBeDefined();
  });
});
