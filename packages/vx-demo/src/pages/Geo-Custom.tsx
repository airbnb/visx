import React from 'react';
import Show from '../components/Show';
import GeoCustom from '../docs-v2/examples/vx-geo-custom/Example';
import GeoCustomSource from '!!raw-loader!../docs-v2/examples/vx-geo-custom/Example';

export default () => {
  return (
    <Show events component={GeoCustom} title="Geo Custom" codeSandboxDirectoryName="vx-geo-custom">
      {GeoCustomSource}
    </Show>
  );
};
