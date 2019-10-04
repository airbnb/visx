import React from 'react';
import { shallow } from 'enzyme';

import { PatternHexagons } from '../src';

describe('<PatternHexagons />', () => {
  test('it should be defined', () => {
    expect(PatternHexagons).toBeDefined();
  });

  test('it should require an id prop', () => {
    // @ts-ignore allow invalid props
    expect(() => shallow(<PatternHexagons width={4} height={4} />)).toThrow();
  });

  test('it should require a height prop', () => {
    // @ts-ignore allow invalid props
    expect(() => shallow(<PatternHexagons id="test" width={4} />)).toThrow();
  });
});
