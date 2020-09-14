import React, { useState } from 'react';
import cityTemperature, { CityTemperature } from '@vx/mock-data/lib/mocks/cityTemperature';
import { XYChart, LineSeries, DataProvider, darkTheme, XYChartTheme } from '@vx/xychart';

import Controls from './Controls';
import CustomChartBackground from './CustomChartBackground';

type Props = {
  width: number;
  height: number;
};

const xScaleConfig = { type: 'linear' } as const;
const yScaleConfig = xScaleConfig;
const data = cityTemperature.slice(50, 80);
const getDate = (d: CityTemperature) => new Date(d.date);
const getSfTemperature = (d: CityTemperature) => Number(d['San Francisco']);

export default function Example(_: Props) {
  const [theme, setTheme] = useState<XYChartTheme>(darkTheme);

  return (
    <>
      <DataProvider theme={theme} xScale={xScaleConfig} yScale={yScaleConfig}>
        <XYChart height={400}>
          <CustomChartBackground />
          <LineSeries dataKey="line" data={data} xAccessor={getDate} yAccessor={getSfTemperature} />
        </XYChart>
      </DataProvider>
      <Controls theme={theme} setTheme={setTheme} />
    </>
  );
}
