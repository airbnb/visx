/* eslint-disable react/jsx-handler-names */
import React, { useState } from 'react';
import * as topojson from 'topojson-client';
import { scaleQuantize } from '@visx/scale';
import { CustomProjection, Graticule } from '@visx/geo';
import { Zoom } from '@visx/zoom';
import { geoConicConformal, geoTransverseMercator, geoNaturalEarth1, geoConicEquidistant, geoOrthographic, geoStereographic, } from 'd3-geo';
import topology from './world-topo.json';
export var background = '#252b7e';
var purple = '#201c4e';
var PROJECTIONS = {
    geoConicConformal: geoConicConformal,
    geoTransverseMercator: geoTransverseMercator,
    geoNaturalEarth1: geoNaturalEarth1,
    geoConicEquidistant: geoConicEquidistant,
    geoOrthographic: geoOrthographic,
    geoStereographic: geoStereographic,
};
// @ts-expect-error
var world = topojson.feature(topology, topology.objects.units);
var color = scaleQuantize({
    domain: [
        Math.min.apply(Math, world.features.map(function (f) { return f.geometry.coordinates.length; })),
        Math.max.apply(Math, world.features.map(function (f) { return f.geometry.coordinates.length; })),
    ],
    range: [
        '#019ece',
        '#f4448b',
        '#fccf35',
        '#82b75d',
        '#b33c88',
        '#fc5e2f',
        '#f94b3a',
        '#f63a48',
        '#dde1fe',
        '#8993f9',
        '#b6c8fb',
        '#65fe8d',
    ],
});
export default function GeoCustom(_a) {
    var width = _a.width, height = _a.height, _b = _a.events, events = _b === void 0 ? true : _b;
    var _c = useState('geoConicConformal'), projection = _c[0], setProjection = _c[1];
    var centerX = width / 2;
    var centerY = height / 2;
    var initialScale = (width / 630) * 100;
    return width < 10 ? null : (<>
      <Zoom width={width} height={height} scaleXMin={100} scaleXMax={1000} scaleYMin={100} scaleYMax={1000} initialTransformMatrix={{
        scaleX: initialScale,
        scaleY: initialScale,
        translateX: centerX,
        translateY: centerY,
        skewX: 0,
        skewY: 0,
    }}>
        {function (zoom) { return (<div className="container">
            <svg width={width} height={height} className={zoom.isDragging ? 'dragging' : undefined} ref={zoom.containerRef} style={{ touchAction: 'none' }}>
              <rect x={0} y={0} width={width} height={height} fill={background} rx={14}/>
              <CustomProjection projection={PROJECTIONS[projection]} data={world.features} scale={zoom.transformMatrix.scaleX} translate={[zoom.transformMatrix.translateX, zoom.transformMatrix.translateY]}>
                {function (customProjection) { return (<g>
                    <Graticule graticule={function (g) { return customProjection.path(g) || ''; }} stroke={purple}/>
                    {customProjection.features.map(function (_a, i) {
        var feature = _a.feature, path = _a.path;
        return (<path key={"map-feature-" + i} d={path || ''} fill={color(feature.geometry.coordinates.length)} stroke={background} strokeWidth={0.5} onClick={function () {
            if (events)
                alert("Clicked: " + feature.properties.name + " (" + feature.id + ")");
        }}/>);
    })}
                  </g>); }}
              </CustomProjection>

              
              <rect x={0} y={0} width={width} height={height} rx={14} fill="transparent" onTouchStart={zoom.dragStart} onTouchMove={zoom.dragMove} onTouchEnd={zoom.dragEnd} onMouseDown={zoom.dragStart} onMouseMove={zoom.dragMove} onMouseUp={zoom.dragEnd} onMouseLeave={function () {
        if (zoom.isDragging)
            zoom.dragEnd();
    }}/>
            </svg>
            {events && (<div className="controls">
                <button className="btn btn-zoom" onClick={function () { return zoom.scale({ scaleX: 1.2, scaleY: 1.2 }); }}>
                  +
                </button>
                <button className="btn btn-zoom btn-bottom" onClick={function () { return zoom.scale({ scaleX: 0.8, scaleY: 0.8 }); }}>
                  -
                </button>
                <button className="btn btn-lg" onClick={zoom.reset}>
                  Reset
                </button>
              </div>)}
          </div>); }}
      </Zoom>
      <label>
        projection:{' '}
        <select onChange={function (event) { return setProjection(event.target.value); }}>
          {Object.keys(PROJECTIONS).map(function (projectionName) { return (<option key={projectionName} value={projectionName}>
              {projectionName}
            </option>); })}
        </select>
      </label>
      <style jsx>{"\n        .container {\n          position: relative;\n        }\n        svg {\n          cursor: grab;\n        }\n        svg.dragging {\n          cursor: grabbing;\n        }\n        .btn {\n          margin: 0;\n          text-align: center;\n          border: none;\n          background: #dde1fe;\n          color: #222;\n          padding: 0 4px;\n          border-top: 1px solid #8993f9;\n        }\n        .btn-lg {\n          font-size: 12px;\n          line-height: 1;\n          padding: 4px;\n        }\n        .btn-zoom {\n          width: 26px;\n          font-size: 22px;\n        }\n        .btn-bottom {\n          margin-bottom: 1rem;\n        }\n        .controls {\n          position: absolute;\n          bottom: 20px;\n          right: 15px;\n          display: flex;\n          flex-direction: column;\n          align-items: flex-end;\n        }\n        label {\n          font-size: 12px;\n        }\n      "}</style>
    </>);
}
