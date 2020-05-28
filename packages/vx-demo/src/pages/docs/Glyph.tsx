import React from 'react';
import GlyphReadme from '!!raw-loader!../../../../vx-glyph/Readme.md';
import * as Glyph from '../../../../vx-glyph/src';
import DocPage from '../../components/DocPage';

const components = Object.values(Glyph).sort((a, b) =>
  // @ts-ignore TS doesn't know about docgenInfo
  (a?.__docgenInfo?.displayName ?? '').localeCompare(
    // @ts-ignore TS doesn't know about docgenInfo
    b?.__docgenInfo?.displayName ?? '',
  ),
);

export default () => <DocPage components={components} readme={GlyphReadme} vxPackage="glyph" />;
