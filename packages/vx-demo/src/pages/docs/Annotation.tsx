import React from 'react';
import AnnotationReadme from '!!raw-loader!../../../../vx-annotation/Readme.md';
import LinePathAnnotation from '../../../../vx-annotation/src/annotations/LinePathAnnotation';
import DocPage from '../../components/DocPage';

const components = [LinePathAnnotation];

export default () => (
  <DocPage components={components} readme={AnnotationReadme} vxPackage="annotation" />
);
