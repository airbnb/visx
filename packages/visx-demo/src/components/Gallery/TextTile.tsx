import React from 'react';
import GalleryTile from '../GalleryTile';

export const packageJson = { name: '@visx/demo-text', dependencies: { '@visx/text': 'current' } };

const tileStyles = { background: 'white', border: '1px solid lightgray', borderRadius: '14px' };
const detailsStyles = { color: '#232323', zIndex: 1 };
const Text = () => (
  <>
    <div className="text-demo">Flexible SVG Text</div>
    <style jsx>{`
      .text-demo {
        height: 100%;
        font-size: 64px;
        font-weight: bold;
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 1;
        line-height: 1em;
        padding: 1rem;
      }
    `}</style>
  </>
);

export default function TextTile() {
  return (
    <GalleryTile<any>
      title="Text"
      description="<Text.Text />"
      exampleRenderer={Text}
      exampleUrl="/text"
      tileStyles={tileStyles}
      detailsStyles={detailsStyles}
    />
  );
}
