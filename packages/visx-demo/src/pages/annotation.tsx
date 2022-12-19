import React from 'react';
import Annotation from '@visx/demo-annotation/Example';
import packageJson from '@visx/demo-annotation/package.json';
import Show from '../components/Show';
import AnnotationSource from '!!raw-loader!../sandboxes/visx-annotation/Example';

function AnnotationPage() {
  return (
    <Show
      component={Annotation}
      title="Annotation"
      codeSandboxDirectoryName="visx-annotation"
      packageJson={packageJson}
    >
      {AnnotationSource}
    </Show>
  );
}

export default AnnotationPage;
