import React from 'react';
import Show from '../components/Show';
import Annotation from '../sandboxes/visx-annotation/Example';
import AnnotationSource from '!!raw-loader!../sandboxes/visx-annotation/Example';
import packageJson from '../sandboxes/visx-annotation/package.json';

export default () => (
  <Show
    component={Annotation}
    title="Annotation"
    codeSandboxDirectoryName="visx-annotation"
    packageJson={packageJson}
  >
    {AnnotationSource}
  </Show>
);
