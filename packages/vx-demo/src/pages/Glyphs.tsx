import React from 'react';
import Show from '../components/Show';
import Glyphs from '../sandboxes/vx-glyph/Example';
import GlyphsSource from '!!raw-loader!../sandboxes/vx-glyph/Example';
import packageJson from '../sandboxes/vx-glyph/package.json';

export default () => {
  return (
    <Show
      component={Glyphs}
      title="Glyphs"
      codeSandboxDirectoryName="vx-glyph"
      packageJson={packageJson}
    >
      {GlyphsSource}
    </Show>
  );
};
