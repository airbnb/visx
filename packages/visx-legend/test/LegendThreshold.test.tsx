import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { scaleThreshold } from '@visx/scale';
import { LegendThreshold } from '../src';
import { addMock, removeMock } from './svgMock';

describe('<LegendThreshold />', () => {
  beforeEach(addMock);
  afterEach(removeMock);

  test('it should be defined', () => {
    expect(LegendThreshold).toBeDefined();
  });

  it('should render LegendShape with the correct color', () => {
    const domain = [1, 2, 9];
    const range = ['green', 'purple', 'blue', 'pink'];
    const thresholdScale = scaleThreshold({
      domain,
      range,
    });

    const { getAllByTestId } = render(
      <svg>
        <LegendThreshold scale={thresholdScale} data-testid="thresholdLegend" />
      </svg>,
    );

    const thresholdLegend = getAllByTestId('thresholdLegend');

    range.forEach((color, index) => {
      const legendItem = thresholdLegend[index];
      const legendShape = legendItem?.querySelector('.visx-legend-shape');
      expect(legendShape?.querySelector('div')).toHaveStyle(`background: ${color}`);
    });
  });

  it('should render LegendShape with the correct color with a negitive domain', () => {
    const domain = [-3, -1];
    const range = ['green', 'purple', 'blue'];
    const thresholdScale1 = scaleThreshold({
      domain,
      range,
    });

    const { getAllByTestId } = render(
      <svg>
        <LegendThreshold scale={thresholdScale1} data-testid="thresholdLegend" />
      </svg>,
    );

    const thresholdLegend = getAllByTestId('thresholdLegend');

    range.forEach((color, index) => {
      const legendItem = thresholdLegend[index];
      const legendShape = legendItem?.querySelector('.visx-legend-shape');
      expect(legendShape?.querySelector('div')).toHaveStyle(`background: ${color}`);
    });
  });

  it('should render LegendShape with the correct color with 0', () => {
    const domain = [0, 1, 4];
    const range = ['green', 'purple', 'blue', 'pink'];
    const thresholdScale1 = scaleThreshold({
      domain,
      range,
    });

    const { getAllByTestId } = render(
      <svg>
        <LegendThreshold scale={thresholdScale1} data-testid="thresholdLegend" />
      </svg>,
    );

    const thresholdLegend = getAllByTestId('thresholdLegend');

    range.forEach((color, index) => {
      const legendItem = thresholdLegend[index];
      const legendShape = legendItem?.querySelector('.visx-legend-shape');
      expect(legendShape?.querySelector('div')).toHaveStyle(`background: ${color}`);
    });
  });
});
