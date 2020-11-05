import React from 'react';
import DragReadme from '!!raw-loader!../../../../visx-drag/Readme.md';
import Drag from '../../../../visx-drag/src/Drag';
import useDrag from '../../../../visx-drag/src/useDrag';
import DocPage from '../../components/DocPage';
import DragITile from '../../components/Gallery/DragITile';
import DragIITile from '../../components/Gallery/DragIITile';

const components = [useDrag, Drag];

const examples = [DragITile, DragIITile];

const DragDocs = () => (
  <DocPage components={components} examples={examples} readme={DragReadme} visxPackage="drag" />
);
export default DragDocs;
