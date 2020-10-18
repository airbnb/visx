import React from 'react';
import Show from '../components/Show';
import Radar from '../sandboxes/visx-radar/Example';
import RadarSource from '!!raw-loader!../sandboxes/visx-radar/Example';
import packageJson from '../sandboxes/visx-radar/package.json';

const RadarPage = () => (
  <Show
    margin={{ top: 0, right: 0, bottom: 50, left: 0 }}
    component={Radar}
    title="Radar"
    codeSandboxDirectoryName="visx-radar"
    packageJson={packageJson}
  >
    {RadarSource}
  </Show>
);
export default RadarPage;
