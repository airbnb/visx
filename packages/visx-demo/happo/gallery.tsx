import React from 'react';
import { tiles as examples } from '../src/components/Gallery';

type HappoSnapshot = {
  component: string;
  variants: {
    [key: string]: (
      renderInDom: (component: React.ReactElement) => void,
    ) => React.ReactNode | Promise<unknown>;
  };
};

const specialCases = new Set(['@visx/demo-xychart', '@visx/demo-axis']);

const getComponentName = (Example: typeof examples[0]) =>
  Example.packageJson.name || 'missing-name';

const snapshots: HappoSnapshot[] = examples
  .filter(Example => specialCases.has(getComponentName(Example)))
  .map(Example => ({
    // note: this (reasonably) asserts Examples have unique names
    component: getComponentName(Example),
    variants: { default: () => <Example.default /> },
  }));

export default snapshots;
