import React from 'react';
import { Bar } from '@visx/shape';
import { Group } from '@visx/group';
import { Pattern as CustomPattern, PatternLines, PatternCircles, PatternWaves, } from '@visx/pattern';
var defaultMargin = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 80,
};
var Patterns = [
    function (_a) {
        var id = _a.id;
        return <PatternLines id={id} height={6} width={6} stroke="black" strokeWidth={1}/>;
    },
    function (_a) {
        var id = _a.id, prefersReducedMotion = _a.prefersReducedMotion;
        return (<CustomPattern id={id} width={10} height={10}>
      {!prefersReducedMotion && (<animateTransform attributeType="xml" attributeName="patternTransform" type="translate" from="0 0" to="0 30" dur="10s" repeatCount="indefinite"/>)}

      
      
      <circle cx={5} cy={5} r="3" stroke="none" fill="black" transform-origin="center"/>
    </CustomPattern>);
    },
    function (_a) {
        var id = _a.id;
        return (<PatternLines id={id} height={6} width={6} stroke="black" strokeWidth={1} orientation={['horizontal']}/>);
    },
    function (_a) {
        var id = _a.id;
        return (<PatternLines id={id} height={6} width={6} stroke="black" strokeWidth={1} orientation={['diagonal']}/>);
    },
    function (_a) {
        var id = _a.id;
        return (<PatternLines id={id} height={6} width={6} stroke="black" strokeWidth={1} orientation={['diagonalRightToLeft']}/>);
    },
    function (_a) {
        var id = _a.id;
        return (<PatternLines id={id} height={6} width={6} stroke="black" strokeWidth={1} orientation={['vertical', 'horizontal']}/>);
    },
    function (_a) {
        var id = _a.id;
        return <PatternCircles id={id} height={10} width={10} fill="black" complement/>;
    },
    function (_a) {
        var id = _a.id, prefersReducedMotion = _a.prefersReducedMotion;
        var width = 10;
        var height = 10;
        return (<CustomPattern id={id} width={width} height={height}>
        {!prefersReducedMotion && (<animateTransform attributeType="xml" attributeName="patternTransform" type="translate" from="0 0" to="50 0" dur="10s" repeatCount="indefinite"/>)}
        <path d={"M 0 " + height / 2 + " c " + height / 8 + " " + -height / 4 + " , " + (height * 3) / 8 + " " + -height / 4 + " , " + height / 2 + " 0\n               c " + height / 8 + " " + height / 4 + " , " + (height * 3) / 8 + " " + height / 4 + " , " + height / 2 + " 0 M " + -height / 2 + " " + height / 2 + "\n               c " + height / 8 + " " + height / 4 + " , " + (height * 3) / 8 + " " + height / 4 + " , " + height / 2 + " 0 M " + height + " " + height / 2 + "\n               c " + height / 8 + " " + -height / 4 + " , " + (height * 3) / 8 + " " + -height / 4 + " , " + height / 2 + " 0"} fill="none" stroke="black" strokeWidth={1}/>
      </CustomPattern>);
    },
    function (_a) {
        var id = _a.id;
        return (<PatternWaves id={id} height={6} width={6} fill="transparent" stroke="black" strokeWidth={1}/>);
    },
];
export default function Example(_a) {
    var width = _a.width, height = _a.height, _b = _a.margin, margin = _b === void 0 ? defaultMargin : _b;
    // use non-animated components if prefers-reduced-motion is set
    var prefersReducedMotionQuery = typeof window === 'undefined' ? false : window.matchMedia('(prefers-reduced-motion: reduce)');
    var prefersReducedMotion = !prefersReducedMotionQuery || !!prefersReducedMotionQuery.matches;
    var numColumns = 3;
    var numRows = Patterns.length / numColumns;
    var columnWidth = Math.max((width - margin.left - margin.right) / numColumns, 0);
    var rowHeight = Math.max((height - margin.bottom - margin.top) / numRows, 0);
    return width >= 10 ? (<svg width={width} height={height}>
      <rect x={0} y={0} width={width} height={height} fill="#f5f2e3" rx={14}/>
      <Group top={margin.top} left={margin.left}>
        {Patterns.map(function (Pattern, index) {
        var columnIndex = index % numColumns;
        var rowIndex = Math.floor(index / numColumns);
        var id = "visx-pattern-demo-" + index + "-" + rowIndex + "-" + columnIndex;
        return (<React.Fragment key={id}>
              
              <Pattern id={id} prefersReducedMotion={prefersReducedMotion}/>

              
              <Bar fill={"url(#" + id + ")"} x={columnIndex * columnWidth} y={rowIndex * rowHeight} width={columnWidth} height={rowHeight} rx={14}/>
            </React.Fragment>);
    })}
      </Group>
    </svg>) : null;
}
