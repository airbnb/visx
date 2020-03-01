import React from 'react';
import Show from '../components/Show';
import Responsive from '../components/tiles/Responsive';
import ResponsiveSource from '!!raw-loader!../components/tiles/Responsive';

export default () => {
  return (
    <Show component={Responsive} title="Responsive">
      {ResponsiveSource}
    </Show>
  );
};
