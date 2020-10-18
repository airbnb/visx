import React from 'react';
import GradientReadme from '!!raw-loader!../../../../visx-gradient/Readme.md';
import * as Gradients from '../../../../visx-gradient/src';
import DocPage from '../../components/DocPage';
import GradientsTile from '../../components/Gallery/GradientsTile';
import AreaTile from '../../components/Gallery/AreaTile';
import BarsTile from '../../components/Gallery/BarsTile';
import ChordTile from '../../components/Gallery/ChordTile';
import DragIITile from '../../components/Gallery/DragIITile';
import PiesTile from '../../components/Gallery/PiesTile';

const components = Object.values(Gradients).sort((a, b) => {
  // @ts-ignore TS doesn't know about docgenInfo
  const aName = a?.__docgenInfo?.displayName ?? '';
  // @ts-ignore TS doesn't know about docgenInfo
  const bName = b?.__docgenInfo?.displayName ?? '';
  return (
    (aName === 'LinearGradient' && -2) ||
    (bName === 'LinearGradient' && 2) ||
    (aName === 'RadialGradient' && -1) ||
    (bName === 'RadialGradient' && 1) ||
    aName.localeCompare(bName)
  );
});

const examples = [GradientsTile, PiesTile, ChordTile, AreaTile, BarsTile, DragIITile];

const GradientDocs = () => (
  <DocPage
    components={components}
    examples={examples}
    readme={GradientReadme}
    visxPackage="gradient"
  />
);
export default GradientDocs;
