import React from 'react';
import { render } from '@testing-library/react';

import { Pattern } from '../src';

describe('<Pattern />', () => {
  test('it should be defined', () => {
    expect(Pattern).toBeDefined();
  });

  test('it should require an id prop', () => {
    expect(() =>
      render(
        // @ts-expect-error allow invalid props
        <Pattern width={4} height={4}>
          <rect />
        </Pattern>,
      ),
    ).toThrow();
  });

  test('it should require a width prop', () => {
    expect(() =>
      render(
        // @ts-expect-error allow invalid props
        <Pattern id="test" height={4}>
          <rect />
        </Pattern>,
      ),
    ).toThrow();
  });

  test('it should require a height prop', () => {
    expect(() =>
      render(
        // @ts-expect-error allow invalid props
        <Pattern id="test" width={4}>
          <rect />
        </Pattern>,
      ),
    ).toThrow();
  });

  test('it should require children', () => {
    expect(() =>
      render(
        // @ts-expect-error allow invalid prop
        <Pattern id="test" width={4} height={4} />,
      ),
    ).toThrow();
  });
});
