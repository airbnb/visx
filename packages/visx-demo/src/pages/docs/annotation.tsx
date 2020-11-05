import React from 'react';
import AnnotationReadme from '!!raw-loader!../../../../visx-annotation/Readme.md';
import LinePathAnnotation from '../../../../visx-annotation/src/deprecated/LinePathAnnotation';
import DocPage from '../../components/DocPage';

const components = [LinePathAnnotation];

const AnnotationDocs = () => (
  <DocPage components={components} readme={AnnotationReadme} visxPackage="annotation" />
);
export default AnnotationDocs;
