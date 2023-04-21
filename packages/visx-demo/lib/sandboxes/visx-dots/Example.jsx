import React, { useMemo, useState, useCallback, useRef } from 'react';
import { Group } from '@visx/group';
import { Circle } from '@visx/shape';
import { GradientPinkRed } from '@visx/gradient';
import { scaleLinear } from '@visx/scale';
import genRandomNormalPoints from '@visx/mock-data/lib/generators/genRandomNormalPoints';
import { withTooltip, Tooltip } from '@visx/tooltip';
import { voronoi, VoronoiPolygon } from '@visx/voronoi';
import { localPoint } from '@visx/event';
var points = genRandomNormalPoints(600, /* seed= */ 0.5).filter(function (_, i) { return i < 600; });
var x = function (d) { return d[0]; };
var y = function (d) { return d[1]; };
var tooltipTimeout;
export default withTooltip(function (_a) {
    var width = _a.width, height = _a.height, _b = _a.showControls, showControls = _b === void 0 ? true : _b, hideTooltip = _a.hideTooltip, showTooltip = _a.showTooltip, tooltipOpen = _a.tooltipOpen, tooltipData = _a.tooltipData, tooltipLeft = _a.tooltipLeft, tooltipTop = _a.tooltipTop;
    if (width < 10)
        return null;
    var _c = useState(showControls), showVoronoi = _c[0], setShowVoronoi = _c[1];
    var svgRef = useRef(null);
    var xScale = useMemo(function () {
        return scaleLinear({
            domain: [1.3, 2.2],
            range: [0, width],
            clamp: true,
        });
    }, [width]);
    var yScale = useMemo(function () {
        return scaleLinear({
            domain: [0.75, 1.6],
            range: [height, 0],
            clamp: true,
        });
    }, [height]);
    var voronoiLayout = useMemo(function () {
        return voronoi({
            x: function (d) { var _a; return (_a = xScale(x(d))) !== null && _a !== void 0 ? _a : 0; },
            y: function (d) { var _a; return (_a = yScale(y(d))) !== null && _a !== void 0 ? _a : 0; },
            width: width,
            height: height,
        })(points);
    }, [width, height, xScale, yScale]);
    // event handlers
    var handleMouseMove = useCallback(function (event) {
        if (tooltipTimeout)
            clearTimeout(tooltipTimeout);
        if (!svgRef.current)
            return;
        // find the nearest polygon to the current mouse position
        var point = localPoint(svgRef.current, event);
        if (!point)
            return;
        var neighborRadius = 100;
        var closest = voronoiLayout.find(point.x, point.y, neighborRadius);
        if (closest) {
            showTooltip({
                tooltipLeft: xScale(x(closest.data)),
                tooltipTop: yScale(y(closest.data)),
                tooltipData: closest.data,
            });
        }
    }, [xScale, yScale, showTooltip, voronoiLayout]);
    var handleMouseLeave = useCallback(function () {
        tooltipTimeout = window.setTimeout(function () {
            hideTooltip();
        }, 300);
    }, [hideTooltip]);
    return (<div>
        <svg width={width} height={height} ref={svgRef}>
          <GradientPinkRed id="dots-pink"/>
          
          <rect width={width} height={height} rx={14} fill="url(#dots-pink)" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} onTouchMove={handleMouseMove} onTouchEnd={handleMouseLeave}/>
          <Group pointerEvents="none">
            {points.map(function (point, i) { return (<Circle key={"point-" + point[0] + "-" + i} className="dot" cx={xScale(x(point))} cy={yScale(y(point))} r={i % 3 === 0 ? 2 : 3} fill={tooltipData === point ? 'white' : '#f6c431'}/>); })}
            {showVoronoi &&
        voronoiLayout
            .polygons()
            .map(function (polygon, i) { return (<VoronoiPolygon key={"polygon-" + i} polygon={polygon} fill="white" stroke="white" strokeWidth={1} strokeOpacity={0.2} fillOpacity={tooltipData === polygon.data ? 0.5 : 0}/>); })}
          </Group>
        </svg>
        {tooltipOpen && tooltipData && tooltipLeft != null && tooltipTop != null && (<Tooltip left={tooltipLeft + 10} top={tooltipTop + 10}>
            <div>
              <strong>x:</strong> {x(tooltipData)}
            </div>
            <div>
              <strong>y:</strong> {y(tooltipData)}
            </div>
          </Tooltip>)}
        {showControls && (<div>
            <label style={{ fontSize: 12 }}>
              <input type="checkbox" checked={showVoronoi} onChange={function () { return setShowVoronoi(!showVoronoi); }}/>
              &nbsp;Show voronoi point map
            </label>
          </div>)}
      </div>);
});
