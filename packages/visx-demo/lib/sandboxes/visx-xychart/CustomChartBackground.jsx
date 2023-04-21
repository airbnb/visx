import React, { useContext } from 'react';
import { PatternLines } from '@visx/pattern';
import { DataContext } from '@visx/xychart';
var patternId = 'xy-chart-pattern';
export default function CustomChartBackground() {
    var _a, _b;
    var _c = useContext(DataContext), theme = _c.theme, margin = _c.margin, width = _c.width, height = _c.height, innerWidth = _c.innerWidth, innerHeight = _c.innerHeight;
    // early return values not available in context
    if (width == null || height == null || margin == null || theme == null)
        return null;
    return (<>
      <PatternLines id={patternId} width={16} height={16} orientation={['diagonal']} stroke={(_a = theme === null || theme === void 0 ? void 0 : theme.gridStyles) === null || _a === void 0 ? void 0 : _a.stroke} strokeWidth={1}/>
      <rect x={0} y={0} width={width} height={height} fill={(_b = theme === null || theme === void 0 ? void 0 : theme.backgroundColor) !== null && _b !== void 0 ? _b : '#fff'}/>
      <rect x={margin.left} y={margin.top} width={innerWidth} height={innerHeight} fill={"url(#" + patternId + ")"} fillOpacity={0.3}/>
    </>);
}
