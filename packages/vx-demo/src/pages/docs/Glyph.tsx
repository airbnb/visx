import React from 'react';
import GlyphReadme from '!!raw-loader!../../../../vx-glyph/Readme.md';
import * as Glyph from '../../../../vx-glyph/src';
import DocPage from '../../components/DocPage';
import { DocGenInfo } from '../../types';
import GlyphsTile from '../../components/Gallery/GlyphsTile';
import LegendsTile from '../../components/Gallery/LegendsTile';

const components = (Object.values(Glyph).map(
  component =>
    // @ts-ignore
    component.__docgenInfo,
) as DocGenInfo[]).sort((a, b) => (a.displayName ?? '').localeCompare(b.displayName ?? ''));

const examples = [GlyphsTile, LegendsTile];

export default () => (
  <DocPage components={components} examples={examples} readme={GlyphReadme} vxPackage="glyph" />
);
