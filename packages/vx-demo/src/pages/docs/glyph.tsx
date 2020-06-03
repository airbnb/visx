import React from 'react';
import GlyphReadme from '!!raw-loader!../../../../vx-glyph/Readme.md';
import * as Glyph from '../../../../vx-glyph/src';
import DocPage from '../../components/DocPage';
import GlyphsTile from '../../components/Gallery/GlyphsTile';
import LegendsTile from '../../components/Gallery/LegendsTile';

const components = Object.values(Glyph).sort((a, b) =>
  // @ts-ignore TS doesn't know about docgenInfo
  (a?.__docgenInfo?.displayName ?? '').localeCompare(
    // @ts-ignore TS doesn't know about docgenInfo
    b?.__docgenInfo?.displayName ?? '',
  ),
);

const examples = [GlyphsTile, LegendsTile];

export default () => (
  <DocPage components={components} examples={examples} readme={GlyphReadme} vxPackage="glyph" />
);
