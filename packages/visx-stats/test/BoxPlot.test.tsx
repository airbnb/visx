import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { scaleLinear } from '@visx/scale';
import { BoxPlot, computeStats } from '../src';

const data = [1, 2, 3, 4, 5, 6, 6, 7, 8, 9, 1];
const { boxPlot: boxPlotData } = computeStats(data);
const { min, firstQuartile, median, thirdQuartile, max, outliers } = boxPlotData;

const valueScale = scaleLinear<number>({
  range: [10, 0],
  round: true,
  domain: [0, 10],
});

describe('<BoxPlot />', () => {
  const renderBoxPlot = () =>
    render(
      <svg width={100} height={100}>
        <BoxPlot
          min={min}
          max={max}
          left={0}
          firstQuartile={firstQuartile}
          thirdQuartile={thirdQuartile}
          median={median}
          boxWidth={100}
          valueScale={valueScale}
          outliers={outliers}
        />
      </svg>,
    );

  it.each([
    [false, [0, 100]],
    [true, [100, 0]],
  ] as const)('keeps the box between quartiles (horizontal=%s)', (horizontal, range) => {
    const scale = scaleLinear<number>({ domain: [0, 10], range: [...range] });
    const { container } = render(
      <svg>
        <BoxPlot firstQuartile={2} thirdQuartile={8} horizontal={horizontal} valueScale={scale} />
      </svg>,
    );
    const box = container.querySelector('rect');
    expect(Number(box?.getAttribute(horizontal ? 'x' : 'y'))).toBeCloseTo(20);
    expect(Number(box?.getAttribute(horizontal ? 'width' : 'height'))).toBeCloseTo(60);
  });

  test('it should be defined', () => {
    expect(BoxPlot).toBeDefined();
  });

  test('it should have className .visx-boxplot', () => {
    const { container } = renderBoxPlot();
    const boxPlotGroup = container.querySelector('.visx-boxplot');
    expect(boxPlotGroup).toBeInTheDocument();
  });

  test('it should render 5 lines and one rectangle', () => {
    const { container } = renderBoxPlot();
    const boxPlotGroup = container.querySelector('.visx-boxplot');
    expect(boxPlotGroup?.querySelectorAll('line')).toHaveLength(5);
    expect(boxPlotGroup?.querySelectorAll('rect')).toHaveLength(1);
  });
});
