import React from 'react';
import { render } from '@testing-library/react';
import { scaleQuantile } from '@visx/scale';
import { LegendQuantile } from '../src';

describe('<LegendQuantile />', () => {
  test('it should be defined', () => {
    expect(LegendQuantile).toBeDefined();
  });
});

test.each([
  [0, 0, 0, 1],
  [1, 1, 1, 1],
])('keeps every quantile color with tied samples %j', (...domain) => {
  const range = ['red', 'green', 'blue'];
  const scale = scaleQuantile({ domain, range });
  const { container } = render(<LegendQuantile scale={scale} />);
  const swatches = Array.from(container.querySelectorAll('.visx-legend-shape > div'));
  expect(swatches.map((swatch) => (swatch as HTMLElement).style.background)).toEqual(range);
});

test('preserves the requested order of a custom quantile domain', () => {
  const scale = scaleQuantile({ domain: [0, 1, 2, 3], range: ['red', 'green', 'blue'] });
  const { container } = render(<LegendQuantile scale={scale} domain={[3, 0]} />);
  const swatches = Array.from(container.querySelectorAll('.visx-legend-shape > div'));
  expect(swatches.map((swatch) => (swatch as HTMLElement).style.background)).toEqual([
    'blue',
    'red',
  ]);
});

test('keeps the first extent when its lower endpoint equals the next quantile', () => {
  const scale = scaleQuantile({ domain: [0, 0, 1, 2], range: ['red', 'green', 'blue'] });
  const { container } = render(
    <LegendQuantile scale={scale} labelFormat={(value) => value.toFixed(2)} />,
  );
  const labels = Array.from(container.querySelectorAll('.visx-legend-label'));
  expect(labels.map((label) => label.textContent)).toEqual([
    '0.00 - 0.00',
    '0.00 - 1.00',
    '1.00 - 2.00',
  ]);
});
