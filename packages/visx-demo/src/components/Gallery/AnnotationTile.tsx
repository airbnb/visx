import React from 'react';
import Annotation, { AnnotationProps, greens } from '../../sandboxes/visx-annotation/Example';
import GalleryTile from '../GalleryTile';

export { default as packageJson } from '../../sandboxes/visx-annotation/package.json';

const tileStyles = { background: greens[0] };
const detailsStyles: React.CSSProperties = {
  color: greens[2],
  borderBottomRightRadius: 16,
  borderBottomLeftRadius: 16,
};
const exampleProps = { compact: true };
const exampleRenderer: React.FC<AnnotationProps> = (props) =>
  props.width > 0 && props.height > 0 ? <Annotation {...props} /> : null;

export default function AnnotationTile() {
  return (
    <GalleryTile<AnnotationProps>
      title="Annotation"
      description="<Annotation />"
      exampleRenderer={exampleRenderer}
      exampleUrl="/annotation"
      detailsStyles={detailsStyles}
      tileStyles={tileStyles}
      exampleProps={exampleProps}
    />
  );
}
