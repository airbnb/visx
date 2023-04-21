import React, { useState } from 'react';
import { geoCentroid } from 'd3-geo';
import { AlbersUsa } from '@visx/geo';
import * as topojson from 'topojson-client';
import topology from './usa-topo.json';
import stateAbbrs from './us-abbr.json';
export var background = '#EBF4F3';
// @ts-expect-error
var unitedStates = topojson.feature(topology, topology.objects.states).features;
export var colors = ['#744DCA', '#3D009C', '#9020FF', '#C630FD'];
// X and Y adjustments to individual states
var coordOffsets = {
    FL: [11, 3],
    AK: [0, -4],
    CA: [-7, 0],
    NY: [5, 0],
    MI: [13, 20],
    LA: [-10, -3],
    HI: [-10, 10],
    ID: [0, 10],
    WV: [-2, 4],
    KY: [10, 0],
    TN: [0, 4],
};
/**
 * These states are too small to have text labels
 * inside of them and are usually displayed with pointers.
 * For simplicity they are omitted from this demo.
 */
var ignoredStates = ['VT', 'NH', 'MA', 'RI', 'CT', 'NJ', 'DE', 'MD'];
export default function GeoAlbersUsa(_a) {
    var width = _a.width, height = _a.height, _b = _a.fullSize, fullSize = _b === void 0 ? true : _b;
    var _c = useState(fullSize), displayLabels = _c[0], setDisplayLabels = _c[1];
    var centerX = width / 2;
    var centerY = height / 2;
    var scale = (width + height) / 1.55;
    return width < 10 ? null : (<>
      <svg width={width} height={height} style={{ background: background, borderRadius: '14px' }}>
        <AlbersUsa data={unitedStates} scale={scale} translate={[centerX, centerY - 25]}>
          {function (_a) {
        var features = _a.features;
        return features.map(function (_a, i) {
            var feature = _a.feature, path = _a.path, projection = _a.projection;
            var coords = projection(geoCentroid(feature));
            var abbr = stateAbbrs[feature.id];
            if (coordOffsets[abbr] && coords) {
                coords[0] += coordOffsets[abbr][0];
                coords[1] += coordOffsets[abbr][1];
            }
            var stylesObj = {
                fill: '#FFF',
                fontFamily: 'sans-serif',
                cursor: 'default',
            };
            if (abbr === 'HI') {
                stylesObj.fill = '#3C019C';
            }
            if (ignoredStates.includes(abbr)) {
                return (<path key={"map-feature-" + i} d={path || ''} fill={colors[i % 4]} stroke={background} strokeWidth={0.5}/>);
            }
            return (<React.Fragment key={"map-feature-" + i}>
                  <path key={"map-feature-" + i} d={path || ''} fill={colors[i % 4]} stroke={background} strokeWidth={0.5}/>
                  {displayLabels && (<text transform={"translate(" + coords + ")"} fontSize={Math.max(width / 75, 9)} style={stylesObj} textAnchor="middle">
                      {abbr}
                    </text>)}
                </React.Fragment>);
        });
    }}
        </AlbersUsa>
      </svg>
      {fullSize && (<label style={{
        position: 'relative',
        left: '20px',
        top: '-60px',
        fontSize: '14px',
        display: 'flex',
        alignItems: 'center',
    }}>
          <input type="checkbox" checked={displayLabels} onChange={function () {
        setDisplayLabels(!displayLabels);
    }}/>
          &nbsp;Display labels
        </label>)}
    </>);
}
