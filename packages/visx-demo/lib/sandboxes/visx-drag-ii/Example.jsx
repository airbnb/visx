var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import React, { useCallback, useState } from 'react';
import { LinePath } from '@visx/shape';
import { useDrag } from '@visx/drag';
import { curveBasis } from '@visx/curve';
import { LinearGradient } from '@visx/gradient';
export default function DragII(_a) {
    var _b = _a.data, data = _b === void 0 ? [] : _b, width = _a.width, height = _a.height;
    var _c = useState(data), lines = _c[0], setLines = _c[1];
    var onDragStart = useCallback(function (currDrag) {
        // add the new line with the starting point
        setLines(function (currLines) { return __spreadArrays(currLines, [[{ x: currDrag.x, y: currDrag.y }]]); });
    }, [setLines]);
    var onDragMove = useCallback(function (currDrag) {
        // add the new point to the current line
        setLines(function (currLines) {
            var nextLines = __spreadArrays(currLines);
            var newPoint = { x: currDrag.x + currDrag.dx, y: currDrag.y + currDrag.dy };
            var lastIndex = nextLines.length - 1;
            nextLines[lastIndex] = __spreadArrays((nextLines[lastIndex] || []), [newPoint]);
            return nextLines;
        });
    }, [setLines]);
    var _d = useDrag({
        onDragStart: onDragStart,
        onDragMove: onDragMove,
        resetOnStart: true,
    }), _e = _d.x, x = _e === void 0 ? 0 : _e, _f = _d.y, y = _f === void 0 ? 0 : _f, dx = _d.dx, dy = _d.dy, isDragging = _d.isDragging, dragStart = _d.dragStart, dragEnd = _d.dragEnd, dragMove = _d.dragMove;
    return width < 10 ? null : (<div className="DragII" style={{ touchAction: 'none' }}>
      <svg width={width} height={height}>
        <LinearGradient id="stroke" from="#ff614e" to="#ffdc64"/>
        <rect fill="#04002b" width={width} height={height} rx={14}/>
        {lines.map(function (line, i) { return (<LinePath key={"line-" + i} fill="transparent" stroke="url(#stroke)" strokeWidth={3} data={line} curve={curveBasis} x={function (d) { return d.x; }} y={function (d) { return d.y; }}/>); })}

        <g>
          {isDragging && (
    /* capture mouse events (note: <Drag /> does this for you) */
    <rect width={width} height={height} onMouseMove={dragMove} onMouseUp={dragEnd} fill="transparent"/>)}
          
          {isDragging && (<g>
              <rect fill="white" width={8} height={8} x={x + dx - 4} y={y + dy - 4} pointerEvents="none"/>
              <circle cx={x} cy={y} r={4} fill="transparent" stroke="white" pointerEvents="none"/>
            </g>)}
          
          <rect fill="transparent" width={width} height={height} onMouseDown={dragStart} onMouseUp={isDragging ? dragEnd : undefined} onMouseMove={isDragging ? dragMove : undefined} onTouchStart={dragStart} onTouchEnd={isDragging ? dragEnd : undefined} onTouchMove={isDragging ? dragMove : undefined}/>
        </g>
      </svg>
      <div className="deets">
        <div>
          Based on Mike Bostock's{' '}
          <a href="https://bl.ocks.org/mbostock/f705fc55e6f26df29354">Line Drawing</a>
        </div>
      </div>

      <style jsx>{"\n        .DragII {\n          display: flex;\n          flex-direction: column;\n          user-select: none;\n        }\n\n        svg {\n          margin: 1rem 0;\n          cursor: crosshair;\n        }\n\n        .deets {\n          display: flex;\n          flex-direction: row;\n          font-size: 12px;\n        }\n        .deets > div {\n          margin: 0.25rem;\n        }\n      "}</style>
    </div>);
}
