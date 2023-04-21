var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
/* eslint react/jsx-handler-names: "off" */
import React, { useState } from 'react';
import { interpolateRainbow } from 'd3-scale-chromatic';
import { Zoom } from '@visx/zoom';
import { localPoint } from '@visx/event';
import { RectClipPath } from '@visx/clip-path';
import genPhyllotaxis from '@visx/mock-data/lib/generators/genPhyllotaxis';
import { scaleLinear } from '@visx/scale';
var bg = '#0a0a0a';
var points = __spreadArrays(new Array(1000));
var colorScale = scaleLinear({ range: [0, 1], domain: [0, 1000] });
var sizeScale = scaleLinear({ domain: [0, 600], range: [0.5, 8] });
var initialTransform = {
    scaleX: 1.27,
    scaleY: 1.27,
    translateX: -211.62,
    translateY: 162.59,
    skewX: 0,
    skewY: 0,
};
export default function ZoomI(_a) {
    var width = _a.width, height = _a.height;
    var _b = useState(true), showMiniMap = _b[0], setShowMiniMap = _b[1];
    var generator = genPhyllotaxis({ radius: 10, width: width, height: height });
    var phyllotaxis = points.map(function (d, i) { return generator(i); });
    return (<>
      <Zoom width={width} height={height} scaleXMin={1 / 2} scaleXMax={4} scaleYMin={1 / 2} scaleYMax={4} initialTransformMatrix={initialTransform}>
        {function (zoom) { return (<div className="relative">
            <svg width={width} height={height} style={{ cursor: zoom.isDragging ? 'grabbing' : 'grab', touchAction: 'none' }} ref={zoom.containerRef}>
              <RectClipPath id="zoom-clip" width={width} height={height}/>
              <rect width={width} height={height} rx={14} fill={bg}/>
              <g transform={zoom.toString()}>
                {phyllotaxis.map(function (_a, i) {
        var _b;
        var x = _a.x, y = _a.y;
        return (<React.Fragment key={"dot-" + i}>
                    <circle cx={x} cy={y} r={i > 500 ? sizeScale(1000 - i) : sizeScale(i)} fill={interpolateRainbow((_b = colorScale(i)) !== null && _b !== void 0 ? _b : 0)}/>
                  </React.Fragment>);
    })}
              </g>
              <rect width={width} height={height} rx={14} fill="transparent" onTouchStart={zoom.dragStart} onTouchMove={zoom.dragMove} onTouchEnd={zoom.dragEnd} onMouseDown={zoom.dragStart} onMouseMove={zoom.dragMove} onMouseUp={zoom.dragEnd} onMouseLeave={function () {
        if (zoom.isDragging)
            zoom.dragEnd();
    }} onDoubleClick={function (event) {
        var point = localPoint(event) || { x: 0, y: 0 };
        zoom.scale({ scaleX: 1.1, scaleY: 1.1, point: point });
    }}/>
              {showMiniMap && (<g clipPath="url(#zoom-clip)" transform={"\n                    scale(0.25)\n                    translate(" + (width * 4 - width - 60) + ", " + (height * 4 - height - 60) + ")\n                  "}>
                  <rect width={width} height={height} fill="#1a1a1a"/>
                  {phyllotaxis.map(function (_a, i) {
        var _b;
        var x = _a.x, y = _a.y;
        return (<React.Fragment key={"dot-sm-" + i}>
                      <circle cx={x} cy={y} r={i > 500 ? sizeScale(1000 - i) : sizeScale(i)} fill={interpolateRainbow((_b = colorScale(i)) !== null && _b !== void 0 ? _b : 0)}/>
                    </React.Fragment>);
    })}
                  <rect width={width} height={height} fill="white" fillOpacity={0.2} stroke="white" strokeWidth={4} transform={zoom.toStringInvert()}/>
                </g>)}
            </svg>
            <div className="controls">
              <button type="button" className="btn btn-zoom" onClick={function () { return zoom.scale({ scaleX: 1.2, scaleY: 1.2 }); }}>
                +
              </button>
              <button type="button" className="btn btn-zoom btn-bottom" onClick={function () { return zoom.scale({ scaleX: 0.8, scaleY: 0.8 }); }}>
                -
              </button>
              <button type="button" className="btn btn-lg" onClick={zoom.center}>
                Center
              </button>
              <button type="button" className="btn btn-lg" onClick={zoom.reset}>
                Reset
              </button>
              <button type="button" className="btn btn-lg" onClick={zoom.clear}>
                Clear
              </button>
            </div>
            <div className="mini-map">
              <button type="button" className="btn btn-lg" onClick={function () { return setShowMiniMap(!showMiniMap); }}>
                {showMiniMap ? 'Hide' : 'Show'} Mini Map
              </button>
            </div>
          </div>); }}
      </Zoom>
      <div className="description">
        Based on Mike Bostock&apos;s{' '}
        <a href="https://bl.ocks.org/mbostock/4e3925cdc804db257a86fdef3a032a45">Pan & Zoom III</a>
      </div>
      <style jsx>{"\n        .btn {\n          margin: 0;\n          text-align: center;\n          border: none;\n          background: #2f2f2f;\n          color: #888;\n          padding: 0 4px;\n          border-top: 1px solid #0a0a0a;\n        }\n        .btn-lg {\n          font-size: 12px;\n          line-height: 1;\n          padding: 4px;\n        }\n        .btn-zoom {\n          width: 26px;\n          font-size: 22px;\n        }\n        .btn-bottom {\n          margin-bottom: 1rem;\n        }\n        .description {\n          font-size: 12px;\n          margin-right: 0.25rem;\n        }\n        .controls {\n          position: absolute;\n          top: 15px;\n          right: 15px;\n          display: flex;\n          flex-direction: column;\n          align-items: flex-end;\n        }\n        .mini-map {\n          position: absolute;\n          bottom: 25px;\n          right: 15px;\n          display: flex;\n          flex-direction: column;\n          align-items: flex-end;\n        }\n        .relative {\n          position: relative;\n        }\n      "}</style>
    </>);
}
