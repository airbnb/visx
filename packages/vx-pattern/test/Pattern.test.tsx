import React from 'react';
import { shallow } from 'enzyme';

import { Pattern } from '../src';

describe('<Pattern />', () => {
  test('it should be defined', () => {
    expect(Pattern).toBeDefined();
  });

  test('it should require an id prop', () => {
    expect(() =>
      shallow(
        // @ts-ignore allow invalid props
        <Pattern width={4} height={4}>
          <rect />
        </Pattern>,
      ),
    ).toThrow();
  });

  test('it should require a width prop', () => {
    expect(() =>
      shallow(
        // @ts-ignore allow invalid props
        <Pattern id="test" height={4}>
          <rect />
        </Pattern>,
      ),
    ).toThrow();
  });

  test('it should require a height prop', () => {
    expect(() =>
      shallow(
        // @ts-ignore allow invalid props
        <Pattern id="test" width={4}>
          <rect />
        </Pattern>,
      ),
    ).toThrow();
  });

  test('it should require children', () => {
    // @ts-ignore allow invalid prop
    expect(() => shallow(<Pattern id="test" width={4} />)).toThrow();
  });
});
