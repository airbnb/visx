import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { scaleLinear } from '@visx/scale';
import { ViolinPlot, computeStats } from '../src';

const data = [1, 2, 3, 4, 5, 6, 6, 7, 8, 9, 1];
const { binData } = computeStats(data);

const valueScale = scaleLinear({
  range: [10, 0],
  round: true,
  domain: [0, 10],
});

describe('<ViolinPlot />', () => {
  test('it should be defined', () => {
    expect(ViolinPlot).toBeDefined();
  });

  test('it should have className .visx-violin', () => {
    const { container } = render(
      <svg>
        <ViolinPlot data={binData} left={3} width={100} valueScale={valueScale} />
      </svg>,
    );
    expect(container.querySelector('.visx-violin')).toBeInTheDocument();
  });

  test('it should render one path element', () => {
    const { container } = render(
      <svg width={100} height={100}>
        <ViolinPlot data={binData} left={3} width={100} valueScale={valueScale} />
      </svg>,
    );
    const paths = container.getElementsByTagName('path');
    expect(paths).toHaveLength(1);
  });
});
