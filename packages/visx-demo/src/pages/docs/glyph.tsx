import React from 'react';
import GlyphReadme from '!!raw-loader!../../../../visx-glyph/Readme.md';
import * as Glyph from '../../../../visx-glyph/src';
import DocPage from '../../components/DocPage';
import { attachDocGenInfo } from '../../utils/getDocGenInfo';
import GlyphsTile from '../../components/Gallery/GlyphsTile';
import LegendsTile from '../../components/Gallery/LegendsTile';

// Attach documentation to components
const componentsWithDocs = attachDocGenInfo('glyph', Glyph);

const components = Object.values(componentsWithDocs).sort((a, b) =>
  // @ts-expect-errorTS doesn't know about docgenInfo
  (a?.__docgenInfo?.displayName ?? '').localeCompare(
    // @ts-expect-errorTS doesn't know about docgenInfo
    b?.__docgenInfo?.displayName ?? '',
  ),
);

const examples = [GlyphsTile, LegendsTile];

function GlyphDocs() {
  return (
    <DocPage components={components} examples={examples} readme={GlyphReadme} visxPackage="glyph" />
  );
}
export default GlyphDocs;
