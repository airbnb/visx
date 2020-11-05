import React from 'react';
import Show from '../components/Show';
import Glyphs from '../sandboxes/visx-glyph/Example';
import GlyphsSource from '!!raw-loader!../sandboxes/visx-glyph/Example';
import packageJson from '../sandboxes/visx-glyph/package.json';

const GlyphsPage = () => {
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
};
export default GlyphsPage;
