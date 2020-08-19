import React, { useState } from 'react';
import { XYChart, ThemeProvider, lightTheme, darkTheme } from '@vx/xychart';
import Controls from './Controls';

type Props = {
  width: number;
  height: number;
};

export default function Example(_: Props) {
  const [theme, setTheme] = useState<typeof lightTheme | typeof darkTheme | null>(lightTheme);

  return (
    <>
      <ThemeProvider theme={theme || {}}>
        <XYChart />
      </ThemeProvider>
      <Controls theme={theme} setTheme={setTheme} />
    </>
  );
}
