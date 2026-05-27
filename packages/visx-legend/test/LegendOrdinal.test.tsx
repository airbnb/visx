import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { scaleOrdinal } from '@visx/scale';
import { LegendOrdinal } from '../src';

describe('<LegendLOrdinal />', () => {
  test('it should be defined', () => {
    expect(LegendOrdinal).toBeDefined();
  });

  test('it renders rectangle shapes as SVG rects with fill attributes', () => {
    const scale = scaleOrdinal({
      domain: ['one'],
      range: ['#ff0000'],
    });

    const { container } = render(<LegendOrdinal scale={scale} shape="rect" />);
    const rect = container.querySelector('svg rect');

    expect(rect).toBeInTheDocument();
    expect(rect).toHaveAttribute('fill', '#ff0000');
  });
});
