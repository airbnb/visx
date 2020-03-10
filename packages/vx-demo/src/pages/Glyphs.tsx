import React from 'react';
import Show from '../components/Show';
import Glyphs from '../docs-v2/examples/vx-glyph/Example';
import GlyphsSource from '!!raw-loader!../docs-v2/examples/vx-glyph/Example';

export default () => {
  return (
    <Show component={Glyphs} title="Glyphs" codeSandboxDirectoryName="vx-glyph">
      {GlyphsSource}
    </Show>
  );
};
