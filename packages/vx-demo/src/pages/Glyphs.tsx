import React from 'react';
import Show from '../components/Show';
import Glyphs from '../components/tiles/Glyphs';
import GlyphsSource from '!!raw-loader!../components/tiles/Glyphs';

export default () => {
  return (
    <Show
      component={Glyphs}
      title="Glyphs"
      margin={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      {GlyphsSource}
    </Show>
  );
};
