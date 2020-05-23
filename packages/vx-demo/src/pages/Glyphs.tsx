import React from 'react';
import Show from '../components/Show';
import Glyphs from '../sandboxes/vx-glyph/Example';
import GlyphsSource from '!!raw-loader!../sandboxes/vx-glyph/Example';

export default () => {
  return (
    <Show component={Glyphs} title="Glyphs" codeSandboxDirectoryName="vx-glyph">
      {GlyphsSource}
    </Show>
  );
};
