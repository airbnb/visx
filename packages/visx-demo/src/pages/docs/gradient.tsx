import React from 'react';
import GradientReadme from '!!raw-loader!../../../../visx-gradient/Readme.md';
import * as Gradients from '../../../../visx-gradient/src';
import DocPage from '../../components/DocPage';
import { attachDocGenInfo } from '../../utils/getDocGenInfo';
import GradientsTile from '../../components/Gallery/GradientsTile';
import AreaTile from '../../components/Gallery/AreaTile';
import BarsTile from '../../components/Gallery/BarsTile';
import ChordTile from '../../components/Gallery/ChordTile';
import DragIITile from '../../components/Gallery/DragIITile';
import PiesTile from '../../components/Gallery/PiesTile';

// Attach documentation to components
const componentsWithDocs = attachDocGenInfo('gradient', Gradients);

const components = Object.values(componentsWithDocs).sort((a, b) => {
  // @ts-expect-errorTS doesn't know about docgenInfo
  const aName = a?.__docgenInfo?.displayName ?? '';
  // @ts-expect-errorTS doesn't know about docgenInfo
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

function GradientDocs() {
  return (
    <DocPage
      components={components}
      examples={examples}
      readme={GradientReadme}
      visxPackage="gradient"
    />
  );
}
export default GradientDocs;
