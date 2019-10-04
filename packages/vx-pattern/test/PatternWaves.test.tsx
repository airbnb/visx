import React from 'react';
import { shallow } from 'enzyme';

import { PatternWaves } from '../src';

describe('<PatternWaves />', () => {
  test('it should be defined', () => {
    expect(PatternWaves).toBeDefined();
  });

  test('it should require an id prop', () => {
    // @ts-ignore allow invalid props
    expect(() => shallow(<PatternWaves width={4} height={4} />)).toThrow();
  });

  test('it should require a width prop', () => {
    // @ts-ignore allow invalid props
    expect(() => shallow(<PatternWaves id="test" height={4} />)).toThrow();
  });

  test('it should require a height prop', () => {
    // @ts-ignore allow invalid props
    expect(() => shallow(<PatternWaves id="test" width={4} />)).toThrow();
  });
});
