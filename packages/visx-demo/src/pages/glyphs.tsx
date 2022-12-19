import React from 'react';
import Glyphs from '../sandboxes/visx-glyph/Example';
import packageJson from '../sandboxes/visx-glyph/package.json';
import Show from '../components/Show';
import GlyphsSource from '!!raw-loader!../sandboxes/visx-glyph/Example';

function GlyphsPage() {
  return (
    <Show
      component={Glyphs}
      title="Glyphs"
      codeSandboxDirectoryName="visx-glyph"
      packageJson={packageJson}
    >
      {GlyphsSource}
    </Show>
  );
}
export default GlyphsPage;
