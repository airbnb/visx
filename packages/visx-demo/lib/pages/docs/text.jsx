import React from 'react';
import TextReadme from '!!raw-loader!../../../../visx-text/Readme.md';
import Text from '../../../../visx-text/src/Text';
import DocPage from '../../components/DocPage';
import TextTile from '../../components/Gallery/TextTile';
var components = [Text];
var examples = [TextTile];
function TextDocs() {
    return (<DocPage components={components} examples={examples} readme={TextReadme} visxPackage="text"/>);
}
export default TextDocs;
