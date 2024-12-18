import React from 'react';
import { render } from '@testing-library/react';

import { PatternHexagons } from '../src';

describe('<PatternHexagons />', () => {
  test('it should be defined', () => {
    expect(PatternHexagons).toBeDefined();
  });

  test('it should require an id prop', () => {
    // @ts-expect-error allow invalid props
    expect(() => render(<PatternHexagons width={4} height={4} />)).toThrow();
  });

  test('it should require a height prop', () => {
    // @ts-expect-error allow invalid props
    expect(() => render(<PatternHexagons id="test" width={4} />)).toThrow();
  });
});
