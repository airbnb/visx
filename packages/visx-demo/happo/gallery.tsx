import React from 'react';
import { tiles as examples } from '../src/components/Gallery';
import AxisTile from '../src/components/Gallery/AxisTile';
import XYChartTile from '../src/components/Gallery/XYChartTile';
import { asyncTimeout } from '../.happo-variables.js';

type HappoSnapshot = {
  component: string;
  variants: {
    [key: string]: (
      renderInDom: (component: React.ReactElement) => void,
    ) => React.ReactNode | Promise<unknown>;
  };
};

const specialCases = new Set(['@visx/demo-axis', '@visx/demo-xychart']);

// renders an example with a timeout
const renderWithTimeout: (
  Example: React.ReactElement,
) => HappoSnapshot['variants'][string] = Example => renderInDom => {
  return new Promise(resolve => {
    renderInDom(Example);
    setTimeout(resolve, asyncTimeout);
  });
};

const getComponentName = (Example: typeof examples[0]) =>
  Example.packageJson.name || 'missing-name';

const snapshots: HappoSnapshot[] = examples
  .filter(Example => !specialCases.has(getComponentName(Example)))
  .map(Example => ({
    // note: this (reasonably) asserts Examples have unique names
    component: getComponentName(Example),
    variants: { default: () => <Example.default /> },
  }));

export default snapshots.concat([
  // needs timeout for animated axes
  {
    component: '@visx/demo-axis',
    variants: {
      default: renderWithTimeout(<AxisTile />),
    },
  },
  // needs timeout for animated axes
  {
    component: '@visx/demo-xychart',
    variants: {
      default: renderWithTimeout(<XYChartTile />),
    },
  },
]);
