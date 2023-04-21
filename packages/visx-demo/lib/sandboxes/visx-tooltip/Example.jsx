var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { useState, useCallback } from 'react';
import { Tooltip, TooltipWithBounds, useTooltip, useTooltipInPortal, defaultStyles, } from '@visx/tooltip';
var positionIndicatorSize = 8;
var tooltipStyles = __assign(__assign({}, defaultStyles), { backgroundColor: 'rgba(53,71,125,0.8)', color: 'white', width: 152, height: 72, padding: 12 });
export default function Example(_a) {
    var width = _a.width, height = _a.height, _b = _a.showControls, showControls = _b === void 0 ? true : _b;
    var _c = useState(true), tooltipShouldDetectBounds = _c[0], setTooltipShouldDetectBounds = _c[1];
    var _d = useState(false), renderTooltipInPortal = _d[0], setRenderTooltipInPortal = _d[1];
    var _e = useTooltipInPortal({
        scroll: true,
        detectBounds: tooltipShouldDetectBounds,
    }), containerRef = _e.containerRef, containerBounds = _e.containerBounds, TooltipInPortal = _e.TooltipInPortal;
    var _f = useTooltip({
        // initial tooltip state
        tooltipOpen: true,
        tooltipLeft: width / 3,
        tooltipTop: height / 3,
        tooltipData: 'Move me with your mouse or finger',
    }), showTooltip = _f.showTooltip, hideTooltip = _f.hideTooltip, tooltipOpen = _f.tooltipOpen, tooltipData = _f.tooltipData, _g = _f.tooltipLeft, tooltipLeft = _g === void 0 ? 0 : _g, _h = _f.tooltipTop, tooltipTop = _h === void 0 ? 0 : _h;
    // event handlers
    var handlePointerMove = useCallback(function (event) {
        // coordinates should be relative to the container in which Tooltip is rendered
        var containerX = ('clientX' in event ? event.clientX : 0) - containerBounds.left;
        var containerY = ('clientY' in event ? event.clientY : 0) - containerBounds.top;
        showTooltip({
            tooltipLeft: containerX,
            tooltipTop: containerY,
            tooltipData: tooltipShouldDetectBounds
                ? 'I detect my container boundary'
                : 'I will get clipped by my container',
        });
    }, [showTooltip, tooltipShouldDetectBounds, containerBounds]);
    var TooltipComponent = renderTooltipInPortal
        ? TooltipInPortal
        : tooltipShouldDetectBounds
            ? TooltipWithBounds
            : Tooltip;
    return (<>
      <div ref={containerRef} className="tooltip-example" style={{ width: width, height: height }} onPointerMove={handlePointerMove}>
        {tooltipOpen ? (<>
            <div className="position-indicator" style={{
        transform: "translate(" + (tooltipLeft - positionIndicatorSize / 2) + "px, " + (tooltipTop - positionIndicatorSize / 2) + "px)",
    }}/>
            <div className="crosshair horizontal" style={{ transform: "translateY(" + tooltipTop + "px)" }}/>
            <div className="crosshair vertical" style={{ transform: "translateX(" + tooltipLeft + "px)" }}/>
            <TooltipComponent key={Math.random()} // needed for bounds to update correctly
     left={tooltipLeft} top={tooltipTop} style={tooltipStyles}>
              {tooltipData}
              <br />
              <br />
              <strong>left</strong> {tooltipLeft === null || tooltipLeft === void 0 ? void 0 : tooltipLeft.toFixed(0)}px&nbsp;&nbsp;
              <strong>top</strong> {tooltipTop === null || tooltipTop === void 0 ? void 0 : tooltipTop.toFixed(0)}px
            </TooltipComponent>
          </>) : (<div className="no-tooltip">Move or touch the canvas to see the tooltip</div>)}
        <div className="z-index-bummer">
          I have an annoying z-index. Try&nbsp;
          <label>
            <input type="checkbox" defaultChecked={renderTooltipInPortal} onClick={function (e) {
        // if rendered in clickable container, don't trigger that event
        e.stopPropagation();
        setRenderTooltipInPortal(!renderTooltipInPortal);
    }}/>
            &nbsp;rendering in Portal
          </label>
          &nbsp;
          <span role="img" aria-label="yay">
            🥳
          </span>
        </div>
      </div>
      {showControls && (<div className="tooltip-controls">
          <label>
            <input type="checkbox" checked={tooltipShouldDetectBounds} onChange={function () { return setTooltipShouldDetectBounds(!tooltipShouldDetectBounds); }}/>
            &nbsp;Tooltip with boundary detection
          </label>

          <button onClick={function () { return hideTooltip(); }}>Hide tooltip</button>
        </div>)}
      <style>{"\n        .tooltip-example {\n          z-index: 0;\n          position: relative;\n          overflow: hidden;\n          border-radius: 16px;\n          background: linear-gradient(45deg, #6c5b7b, #c06c84, #f67280);\n          font-size: 14px;\n          color: white;\n          width: 100%;\n          height: 100%;\n        }\n        .tooltip-controls label {\n          font-size: 14px;\n          margin-right: 8px;\n        }\n        .position-indicator {\n          width: " + positionIndicatorSize + "px;\n          height: " + positionIndicatorSize + "px;\n          border-radius: 50%;\n          background: #35477d;\n          position: absolute;\n        }\n        .crosshair {\n          position: absolute;\n          top: 0;\n          left: 0;\n        }\n        .crosshair.horizontal {\n          width: 100%;\n          height: 1px;\n          border-top: 1px dashed #35477d;\n        }\n        .crosshair.vertical {\n          height: 100%;\n          width: 1px;\n          border-left: 1px dashed #35477d;\n        }\n        .no-tooltip {\n          position: absolute;\n          left: 50%;\n          top: 50%;\n          transform: translate(-50%, -50%);\n        }\n        .z-index-bummer {\n          position: absolute;\n          right: 12%;\n          bottom: 20%;\n          max-width: 190px;\n          z-index: 2000;\n          background: rgba(255, 255, 255, 0.8);\n          color: #35477d;\n          border-radius: 8px;\n          padding: 16px;\n          line-height: 1.2em;\n        }\n      "}</style>
    </>);
}
