import React from 'react';
import Show from '../components/Show';
import GeoCustom from '../sandboxes/vx-geo-custom/Example';
import GeoCustomSource from '!!raw-loader!../sandboxes/vx-geo-custom/Example';

export default () => {
  return (
    <Show events component={GeoCustom} title="Geo Custom" codeSandboxDirectoryName="vx-geo-custom">
      {GeoCustomSource}
    </Show>
  );
};
