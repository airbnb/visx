import React from 'react';
import { createRoot } from 'react-dom/client';
import ParentSize from '@visx/responsive/lib/components/ParentSize';
import Example from './Example';
import './sandbox-styles.css';
var root = createRoot(document.getElementById('root'));
root.render(<ParentSize>{function (_a) {
    var width = _a.width, height = _a.height;
    return <Example width={width} height={height}/>;
}}</ParentSize>);
