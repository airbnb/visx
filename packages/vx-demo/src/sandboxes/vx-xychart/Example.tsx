import React, { useState } from 'react';
import { XYChart, DataProvider, darkTheme, XYChartTheme } from '@vx/xychart';

import Controls from './Controls';
import CustomChartBackground from './CustomChartBackground';

type Props = {
  width: number;
  height: number;
};

const xScaleConfig = { type: 'linear' } as const;
const yScaleConfig = xScaleConfig;

export default function Example(_: Props) {
  const [theme, setTheme] = useState<XYChartTheme>(darkTheme);

  return (
    <>
      <DataProvider theme={theme} xScale={xScaleConfig} yScale={yScaleConfig}>
        <XYChart height={400}>
          <CustomChartBackground />
        </XYChart>
      </DataProvider>
      <Controls theme={theme} setTheme={setTheme} />
    </>
  );
}
