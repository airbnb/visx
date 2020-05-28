import React from 'react';
import GradientReadme from '!!raw-loader!../../../../vx-gradient/Readme.md';
import * as Gradients from '../../../../vx-gradient/src';
import DocPage from '../../components/DocPage';
import { DocGenInfo } from '../../types';
import GradientsTile from '../../components/Gallery/GradientsTile';
import AreaTile from '../../components/Gallery/AreaTile';
import BarsTile from '../../components/Gallery/BarsTile';
import ChordTile from '../../components/Gallery/ChordTile';
import DragIITile from '../../components/Gallery/DragIITile';
import PiesTile from '../../components/Gallery/PiesTile';

const components = (Object.values(Gradients).map(
  component =>
    // @ts-ignore
    component.__docgenInfo,
) as DocGenInfo[]).sort(
  (a, b) =>
    (a.displayName === 'LinearGradient' && -2) ||
    (b.displayName === 'LinearGradient' && 2) ||
    (a.displayName === 'RadialGradient' && -1) ||
    (b.displayName === 'RadialGradient' && 1) ||
    (a.displayName ?? '').localeCompare(b.displayName ?? ''),
);

const examples = [GradientsTile, PiesTile, ChordTile, AreaTile, BarsTile, DragIITile];

export default () => (
  <DocPage
    components={components}
    examples={examples}
    readme={GradientReadme}
    vxPackage="gradient"
  />
);
