import { vi } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import { chord as d3Chord } from 'd3-chord';
import { Ribbon } from '../src';

const matrix = [
  [11975, 5871, 8916, 2868],
  [1951, 10048, 2060, 6171],
  [8010, 16145, 8090, 8045],
  [1013, 990, 940, 6907],
];

const chords = d3Chord()(matrix);

describe('<Ribbon />', () => {
  test('it should be defined', () => {
    expect(Ribbon).toBeDefined();
  });

  test('it should call children as a function with required args', () => {
    const children = vi.fn(() => 'test');
    render(<Ribbon chord={chords[0]} children={children} />);
    const args = (children.mock.calls[0] as { path?: unknown }[])[0];
    expect(children.mock.calls).toHaveLength(1);
    expect(args.path).toBeDefined();
  });
});
