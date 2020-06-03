import React from 'react';
import Show from '../components/Show';
import Threshold from '../sandboxes/vx-threshold/Example';
import ThresholdSource from '!!raw-loader!../sandboxes/vx-threshold/Example';
import packageJson from '../sandboxes/vx-threshold/package.json';

function Description({ width }: { width: number }) {
  return (
    <div style={{ width, fontSize: 14, lineHeight: '1.5em' }}>
      The temperature in New York compared to San Francisco; days when New York was warmer are
      green, and colder days are violet. Based on Mike Bostock's{' '}
      <a href="https://bl.ocks.org/mbostock/3894205" target="_blank" rel="noopener noreferrer">
        Difference Chart
      </a>
      .
    </div>
  );
}

export default () => (
  <Show
    component={Threshold}
    title="Threshold"
    description={Description}
    codeSandboxDirectoryName="vx-threshold"
    packageJson={packageJson}
  >
    {ThresholdSource}
  </Show>
);
