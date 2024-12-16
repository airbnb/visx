/**
 * LLM-GENERATED REFACTOR
 *
 * This file was migrated from Enzyme to RTL using generative AI.
 * To make the migration as clean as possible, the LLM was instructed to
 * use testing patterns similar to Enzyme.
 *
 * If you are making changes to this file, please consider refactoring
 * to more idiomatic RTL (and then removing this banner!).
 */
import React from 'react';
import { shallow } from 'enzyme';

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
  test('it should be defined', () => {
    expect(BoxPlot).toBeDefined();
  });

  test('it should have className .visx-boxplot', () => {
    const wrapper = shallow(
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
      />,
    );
    expect(wrapper.prop('className')).toBe('visx-boxplot');
  });

  test('it should render 5 lines and one rectangle', () => {
    const wrapper = shallow(
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
      />,
    );
    expect(wrapper.find('line')).toHaveLength(5);
    expect(wrapper.find('rect')).toHaveLength(1);
  });
});
// MIGRATION STATUS: {"eslint":"pending","jest":{"passed":3,"failed":0,"total":3,"skipped":0,"successRate":100},"tsc":"pending","enyzme":"pending"}
