import { vi } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import { Chord } from '../src';

const matrix = [
  [11975, 5871, 8916, 2868],
  [1951, 10048, 2060, 6171],
  [8010, 16145, 8090, 8045],
  [1013, 990, 940, 6907],
];

describe('<Chord />', () => {
  test('it should be defined', () => {
    expect(Chord).toBeDefined();
  });

  test('it should call children as a function with required args', () => {
    const children = vi.fn();
    render(<Chord matrix={matrix} children={children} />);
    expect(children.mock.calls).toHaveLength(1);
  });
});
