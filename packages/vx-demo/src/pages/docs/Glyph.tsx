import React from 'react';
import GlyphReadme from '!!raw-loader!../../../../vx-glyph/Readme.md';
import * as Glyph from '../../../../vx-glyph/src';
import DocPage from '../../components/DocPage';
import { DocGenInfo } from '../../types';

const components = Object.values(Glyph).map(
  component =>
    // @ts-ignore
    component.__docgenInfo,
) as DocGenInfo[];

export default () => <DocPage components={components} readme={GlyphReadme} vxPackage="glyph" />;
