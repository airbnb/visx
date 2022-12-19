import React from 'react';
import Glyphs from '@visx/demo-glyph/Example';
import packageJson from '@visx/demo-glyph/package.json';
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
