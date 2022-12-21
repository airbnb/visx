import React from 'react';
import Threshold from '../sandboxes/visx-threshold/Example';
import packageJson from '../sandboxes/visx-threshold/package.json';
import Show from '../components/Show';
import ThresholdSource from '!!raw-loader!../sandboxes/visx-threshold/Example';

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

function ThresholdPage() {
  return (
    <Show
      component={Threshold}
      title="Threshold"
      description={Description}
      codeSandboxDirectoryName="visx-threshold"
      packageJson={packageJson}
    >
      {ThresholdSource}
    </Show>
  );
}
export default ThresholdPage;
