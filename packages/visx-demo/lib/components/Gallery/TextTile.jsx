import React from 'react';
import GalleryTile from '../GalleryTile';
export var packageJson = {
    name: '@visx/demo-text',
    dependencies: { '@visx/text': 'current' },
};
var tileStyles = { background: 'white', border: '1px solid lightgray', borderRadius: '14px' };
var detailsStyles = { color: '#232323', zIndex: 1 };
function Text() {
    return (<>
      <div className="text-demo">Flexible SVG Text</div>
      <style jsx>{"\n        .text-demo {\n          height: 100%;\n          font-size: 64px;\n          font-weight: bold;\n          display: flex;\n          justify-content: center;\n          align-items: center;\n          flex: 1;\n          line-height: 1em;\n          padding: 1rem;\n        }\n      "}</style>
    </>);
}
export default function TextTile() {
    return (<GalleryTile title="Text" description="<Text.Text />" exampleRenderer={Text} exampleUrl="/text" tileStyles={tileStyles} detailsStyles={detailsStyles}/>);
}
